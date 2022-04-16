const tbody = document.querySelector("tbody")
//Total elements & values
const total = document.getElementById("total")
total.innerText = 0
const withoutTax = document.getElementById("totalWithoutTax")
withoutTax.innerText = 0
const totalTax = document.getElementById("totalTax")
totalTax.innerText = 0
//Creating the td's in tbody
const createTd = function (isPayed, linkToInvoice, clientInfo, invoiceInfo, totalWithoutTax, totalTaxValue, totalValue) {
     const newRow = document.createElement("tr")
     const today = Date.now()
     const paymentDate = Date.parse(invoiceInfo)
     if (isPayed) {
          newRow.style.background = "#70B441"
     } else if (today > paymentDate && !isPayed) {
          newRow.style.background = "#d63f3e"
     } else {
          newRow.style.background = "#eed202"
     }
     tbody.append(newRow)

     //SeeInvoiceBtn
     const seeInvoice = document.createElement("td")
     const seeInvoiceBtn = document.createElement("button")
     seeInvoiceBtn.classList.add("seeInvoiceBtn")
     const seeInvoiceLink = document.createElement("a")
     seeInvoiceLink.href = `/invoice/${linkToInvoice}`
     seeInvoice.append(seeInvoiceLink)
     seeInvoiceLink.append(seeInvoiceBtn)

     ///
     const client = document.createElement("td")
     const invoiceDate = document.createElement("td")
     const priceWithoutTax = document.createElement("td")
     const tax = document.createElement("td")
     const invoiceTotalValue = document.createElement("td")
     const payed = document.createElement("td")
     const notPayed = document.createElement("td")




     // Adding payed & notPayed checkbox & API
     const payedBtn = document.createElement("button")
     payedBtn.classList.add("payedBtn")
     payed.append(payedBtn)
     const notPayedBtn = document.createElement("button")
     notPayedBtn.classList.add("notPayedBtn")
     notPayed.append(notPayedBtn)
     notPayed.setAttribute("id", "notPayedTd")

     const paymentStatusPaid = {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify(),
     }

     //Row change color if button clicked functions
     payedBtn.addEventListener("click", async (e) => {
          e.preventDefault()
          newRow.style.background = "#70B441"

          const isPayed = {
               payed: true
          }
          const paymentStatus = {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(isPayed)
          }
          await fetch(`/myinvoices/${linkToInvoice}/payed`, paymentStatus)
     })

     notPayed.addEventListener("click", async (e) => {
          if (today > paymentDate) {
               console.log("fuck you")
               newRow.style.background = "#d63f3e"
          } else {
               newRow.style.background = "#eed202"
          }
          const isPayed = {
               payed: false
          }
          const paymentStatus = {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(isPayed)
          }
          await fetch(`/myinvoices/${linkToInvoice}/notpayed`, paymentStatus)
     })




     //Client and invoice info populate
     client.innerText = clientInfo
     invoiceDate.innerText = new Date(invoiceInfo).toLocaleDateString("en-GB")
     //Calculation
     priceWithoutTax.innerText = totalWithoutTax;

     tax.innerText = totalTaxValue;

     invoiceTotalValue.innerText = totalValue;

     //Total values
     total.innerText = (
          parseFloat(totalValue) + parseFloat(total.innerText)
     ).toFixed(2);
     withoutTax.innerText = (parseFloat(withoutTax.innerText) + parseFloat(totalWithoutTax)).toFixed(2)
     totalTax.innerText = (parseFloat(totalTaxValue) + parseFloat(totalTax.innerText)).toFixed(2)
     console.log(totalTax)

     //Delete invoice btn
     // / myinvoices / delete /:id Route
     const dlt = document.createElement("td")
     const deleteBtn = document.createElement("button")
     deleteBtn.classList.add("deleteBtn")
     dlt.append(deleteBtn)

     deleteBtn.addEventListener("click", async (e) => {
          e.preventDefault()
          dlt.parentElement.remove()
          await fetch(`/myinvoices/${linkToInvoice}/delete`, {
               method: 'DELETE',
               headers: {
                    'Content-Type': 'application/json'
               }
          });

          total.innerText = (parseFloat(total.innerText) - parseFloat(totalValue)).toFixed(2);
          withoutTax.innerText = (parseFloat(withoutTax.innerText) - parseFloat(totalWithoutTax)).toFixed(2)
          totalTax.innerText = (parseFloat(totalTax.innerText) - parseFloat(totalTaxValue)).toFixed(2)

     })

     newRow.append(seeInvoice, client, invoiceDate, priceWithoutTax, tax, invoiceTotalValue, payed, notPayed, dlt)
}

// const requestInvoicesData = 
// }
const getInvoices = async function () {
     const data = await fetch("/api/getInvoices", {
          method: "GET",
          credentials: 'same-origin',
          headers: {
               'Content-Type': 'application/json'
          }
     })
     const invoices = await data.json()
     const totalPayed = []
     const totalPayedWithoutTaxes = []
     const totalPayedTaxes = []

     const totalUnpayed = []
     const totalUnpayedWithoutTaxes = []
     const totalUnpayedTaxes = []
     for (let i of invoices) {
          console.log(i.invoiceInfo.paymentDate)
          // const date = new Date(i.invoiceInfo.paymentDate).toLocaleDateString("en-GB")
          createTd(i.payed, i._id, i.clientInfo.name, i.invoiceInfo.paymentDate, i.total.totalWithoutTaxes, i.total.totalTaxes, i.total.total)
          if (i.payed) {
               totalPayed.push(i.total.total)
               totalPayedWithoutTaxes.push(i.total.totalWithoutTaxes)
               totalPayedTaxes.push(i.total.totalTaxes)
          } else if (!i.payed) {
               totalUnpayed.push(i.total.total)
               totalUnpayedWithoutTaxes.push(i.total.totalWithoutTaxes)
               totalUnpayedTaxes.push(i.total.totalTaxes)
          }

     }

     let calculateTotalPayed = ""
     let calculateTotalPayedWithoutTaxes = ""
     if (totalPayed.length >= 1) {
          calculateTotalPayed = totalPayed.reduce((pre, curr) => {
               return (parseInt(pre) + parseInt(curr))
          })

          calculateTotalPayedWithoutTaxes = totalPayedWithoutTaxes.reduce((pre, curr) => {
               return (parseInt(pre) + parseInt(curr))
          })
     }
     let calculateTotalPayedTaxes = ""
     if (totalPayedTaxes.length >= 1) {
          calculateTotalPayedTaxes = totalPayedTaxes.reduce((pre, curr) => {
               return (parseInt(pre) + parseInt(curr))
          })
     }

     let calculateTotalUnpayed = ""
     let calculateTotalUnpayedWithoutTaxes = ""
     if (totalUnpayed.length >= 1) {
          calculateTotalUnpayed = totalUnpayed.reduce((pre, curr) => {
               return (parseInt(pre) + parseInt(curr))
          })
          calculateTotalUnpayedWithoutTaxes = totalUnpayedWithoutTaxes.reduce((pre, curr) => {
               return (parseInt(pre) + parseInt(curr))
          })
     }

     let calculateTotalUnpayedTaxes = ""
     if (totalUnpayedTaxes.length >= 1) {
          calculateTotalUnpayedTaxes = totalUnpayedTaxes.reduce((pre, curr) => {
               return (parseInt(pre) + parseInt(curr))
          })
     }


     createTotalRow(calculateTotalPayed, calculateTotalPayedWithoutTaxes, calculateTotalPayedTaxes, calculateTotalUnpayed, calculateTotalUnpayedWithoutTaxes, calculateTotalUnpayedTaxes)
}

getInvoices()
