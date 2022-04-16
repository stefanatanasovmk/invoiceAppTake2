//Billing company input elements selections


const companyInputs = {
     name: document.getElementById("companyName"),
     address: document.getElementById("companyAddress"),
     tel: document.getElementById("companyPhone"),
     email: document.getElementById("companyEmail"),
     bankAccount: document.getElementById("bankAccount"),
     taxNumber: document.getElementById("companyTaxNumber")
}
// const getAllCompanyInfoData = function () {
//      companyInfoData = {
//           companyInfoData: {
//                name: companyInputs.name.value,
//                address: companyInputs.address.value,
//                tel: companyInputs.tel.value,
//                email: companyInputs.email.value,
//                bankAccount: companyInputs.bankAccount.value,
//                taxNumber: companyInputs.taxNumber.value
//           }
//      }
// }



//Client company
const clientCompanyInputs = {
     name: document.getElementById("clientCompanyName"),
     address: document.getElementById("clientCompanyAddress"),
     tel: document.getElementById("clientCompanyPhone"),
     email: document.getElementById("clientCompanyEmail"),

}
const invoicePaymentInputs = {
     invoiceNumber: document.getElementById("invoiceNumber"),
     executionDate: document.getElementById("dateOfExecution"),
     invoiceDate: document.getElementById("invoiceDate"),
     paymentDate: document.getElementById("paymentDate")
}

const getClientAndInvoiceData = function () {
     clientAndInvoiceData = {
          clientInfo: {
               name: clientCompanyInputs.name.value,
               address: clientCompanyInputs.address.value,
               tel: clientCompanyInputs.tel.value,
               email: clientCompanyInputs.email.value
          },
          invoiceInfo: {
               invoiceNumber: invoicePaymentInputs.invoiceNumber.value,
               executionDate: invoicePaymentInputs.executionDate.value,
               invoiceDate: invoicePaymentInputs.invoiceDate.value,
               paymentDate: invoicePaymentInputs.paymentDate.value
          }
     }
}


const companiesInfoBtn = document.getElementById("companyAndInvoiceInputBtn")

companiesInfoBtn.addEventListener("click", () => {
     const togg = companiesInfoBtn.toggleAttribute("checked")
     // getAllCompanyInfoData()
     getClientAndInvoiceData()
     if (togg) {
          for (const i in companyInputs) {
               companyInputs[i].readOnly = true
          }
          for (const i in clientCompanyInputs) {
               clientCompanyInputs[i].readOnly = true
          }
          for (const i in invoicePaymentInputs) {
               invoicePaymentInputs[i].readOnly = true
          }
          companiesInfoBtn.classList.remove("checkBtn")
          companiesInfoBtn.classList.add("editBtn")
     } else {
          for (const i in companyInputs) {
               companyInputs[i].readOnly = false
          }
          for (const i in clientCompanyInputs) {
               clientCompanyInputs[i].readOnly = false
          }
          for (const i in invoicePaymentInputs) {
               invoicePaymentInputs[i].readOnly = false
          }
          companiesInfoBtn.classList.remove("editBtn")
          companiesInfoBtn.classList.add("checkBtn")

     }
})

