const table = document.querySelector("table");
const tBody = document.querySelector("tbody");
const total = document.querySelector("#total");


total.innerText = 0;
let dataRow = 0;
let allRowsData = []

//Total amount for API
let allRowsTotalWithoutTaxes = 0
let allRowsTotalTaxes = 0

//Functions for populating & creating the elements in the row
const populateTableData = (rowRef, rowNumber, type, name, value) => {
     // Add td
     const tableData = document.createElement("td");
     rowRef.appendChild(tableData);

     // Append input element
     const tableDataInput = document.createElement("input");
     tableDataInput.classList.add("tableDataInput", name);
     tableDataInput.id = `input${name}-row-${rowNumber}`
     tableDataInput.setAttribute("type", type);
     tableDataInput.value = value
     if (type === "number") {
          tableDataInput.setAttribute("min", 0);
          tableDataInput.setAttribute("value", 0);
     }
     tableDataInput.setAttribute("name", name);
     tableData.appendChild(tableDataInput);

     // Append span
     const tableDataTxt = document.createElement("span");
     if (type === "number") {
          tableDataTxt.innerText = 0;
     }
     tableDataTxt.classList.add("tableDataTxt");
     tableDataTxt.id = `${name}-row-${rowNumber}`;
     tableData.appendChild(tableDataTxt);
     tableDataTxt.innerText = value

     tableDataInput.addEventListener("input", function () {
          tableDataTxt.innerText = this.value;
     });
};

const populateTextField = (rowRef, rowNumber, name) => {
     let tableData = document.createElement("td");
     rowRef.appendChild(tableData);

     let tableDataTxt = document.createElement("span");
     tableDataTxt.classList.add("tableDataTxt");
     tableDataTxt.id = `${name}-row-${rowNumber}`;
     tableData.appendChild(tableDataTxt);
};

const populateTaxListData = (rowRef, rowNumber, value) => {
     const id = `taxRate-row-${rowNumber}`;
     let tableData = document.createElement("td");
     rowRef.appendChild(tableData);

     let select = document.createElement("select");
     select.classList.add("tableDataInput", "taxRate");
     select.name = "taxRate";
     select.id = id;

     var option = document.createElement("option");
     option.value = "1.18";
     option.text = "18%";
     select.appendChild(option);

     var option = document.createElement("option");
     option.value = "1.05";
     option.text = "5%";
     option.setAttribute("selected", "")
     select.appendChild(option);

     var option = document.createElement("option");
     option.value = "1";
     option.text = "0%";
     select.appendChild(option);


     tableData.appendChild(select);

     let tableDataTxt = document.createElement("span");
     tableDataTxt.classList.add("tableDataTxt");
     tableDataTxt.id = id;
     tableData.appendChild(tableDataTxt);

     //Setting default values
     for (let i of select) {
          if (i.value === value) {
               i.setAttribute("selected", "")
               tableDataTxt.innerText = i.text;

          }
     }
     select.value = value


     select.addEventListener("change", function (event) {
          const { options, selectedIndex } = event.target;
          tableDataTxt.innerText = options[selectedIndex].text;
     });
};

//Functions for creating empty table data rows
const createTableData = (rowRef, rowNumber, type, name) => {
     // Add td
     const tableData = document.createElement("td");
     rowRef.appendChild(tableData);

     // Append input element
     const tableDataInput = document.createElement("input");
     tableDataInput.classList.add("tableDataInput", name);
     tableDataInput.setAttribute("type", type);
     if (type === "number") {
          tableDataInput.setAttribute("min", 0);
          tableDataInput.setAttribute("value", 0);
     }
     tableDataInput.setAttribute("name", name);
     tableData.appendChild(tableDataInput);

     // Append span
     const tableDataTxt = document.createElement("span");
     if (type === "number") {
          tableDataTxt.innerText = 0;
     }
     tableDataTxt.classList.add("tableDataTxt");
     tableDataTxt.id = `${name}-row-${rowNumber}`;
     tableData.appendChild(tableDataTxt);

     tableDataInput.addEventListener("input", function () {
          tableDataTxt.innerText = this.value;
     });
};

const createTextField = (rowRef, rowNumber, name) => {
     let tableData = document.createElement("td");
     rowRef.appendChild(tableData);

     let tableDataTxt = document.createElement("span");
     tableDataTxt.classList.add("tableDataTxt");
     tableDataTxt.id = `${name}-row-${rowNumber}`;
     tableData.appendChild(tableDataTxt);
};

const createTaxListData = (rowRef, rowNumber) => {
     const id = `taxRate-row-${rowNumber}`;
     let tableData = document.createElement("td");
     rowRef.appendChild(tableData);

     let select = document.createElement("select");
     select.classList.add("tableDataInput", "taxRate");
     select.name = "taxRate";
     select.id = id;

     var option = document.createElement("option");
     option.value = "1.18";
     option.text = "18%";
     select.appendChild(option);

     var option = document.createElement("option");
     option.value = "1.05";
     option.text = "5%";
     select.appendChild(option);

     var option = document.createElement("option");
     option.value = "1";
     option.text = "0%";
     select.appendChild(option);

     tableData.appendChild(select);

     let tableDataTxt = document.createElement("span");
     tableDataTxt.classList.add("tableDataTxt");
     tableDataTxt.innerText = "18%";
     tableDataTxt.id = id;
     tableData.appendChild(tableDataTxt);

     select.addEventListener("change", function (event) {
          const { options, selectedIndex } = event.target;
          tableDataTxt.innerText = options[selectedIndex].text;
     });
};


//Creating the rows with the fetched data
const invoiceDataRows = async function (descriptionText, unitMeasureValue, unitPriceValue, quantityValue, taxValue) {
     dataRow++;

     // Creating of table rows
     const newRow = document.createElement("tr");
     newRow.classList.add(`rowNum${dataRow}`, "rowClass", "notCalculated");
     tBody.appendChild(newRow);

     // Creating table data, elements within td and append td to tr
     let rowNumber = document.createElement("td");
     newRow.appendChild(rowNumber);
     const rows = tBody.getElementsByTagName("tr");
     rowNumber.append(rows.length);
     rowNumber.classList.add("rowNumber");

     populateTableData(newRow, dataRow, "text", "desc", descriptionText);
     populateTableData(newRow, dataRow, "text", "unitMeasure", unitMeasureValue);
     populateTableData(newRow, dataRow, "number", "unitPrice", unitPriceValue);
     populateTableData(newRow, dataRow, "number", "quantity", quantityValue);
     populateTextField(newRow, dataRow, "priceWithoutTax");
     populateTaxListData(newRow, dataRow, taxValue);
     populateTextField(newRow, dataRow, "ddv");


     const amount = document.createElement("td");
     newRow.appendChild(amount);
     const amountTxt = document.createElement("span");
     amountTxt.classList.add("amountSpan")
     amount.appendChild(amountTxt);
     const toggleBtnRow = document.createElement("td");
     toggleBtnRow.classList.add("hidden-print");
     newRow.appendChild(toggleBtnRow);

     // Creating toggle check and edit button in the table rows
     const toggleBtn = document.createElement("button");
     toggleBtn.classList.add("checkBtn", `calc-row-${dataRow}`);
     toggleBtn.id = `row-${dataRow}`;
     toggleBtnRow.appendChild(toggleBtn);

     toggleBtn.addEventListener("click", function (e) {
          // why disabled
          let calculated = amountTxt.toggleAttribute("disabled");

          if (calculated) {

               newRow.classList.add("isCalculated");
               newRow.classList.remove("notCalculated");

               amountTxt.style.display = "block";

               // Element objects
               const description = document.getElementById(`desc-${this.id}`)
               const unitMeasure = document.getElementById(`unitMeasure-${this.id}`)
               const unitPrice = document.getElementById(`unitPrice-${this.id}`);
               const quantity = document.getElementById(`quantity-${this.id}`);
               const priceWithoutTax = document.getElementById(
                    `priceWithoutTax-${this.id}`
               );
               const taxRate = document.getElementById(`taxRate-${this.id}`);
               const ddv = document.getElementById(`ddv-${this.id}`);

               // Element value
               const descriptionValue = description.innerText
               const unitMeasureValue = unitMeasure.innerText
               const unitPriceValue = unitPrice.innerText;
               const quantityValue = quantity.innerText;
               const priceWithoutTaxValue = priceWithoutTax.innerText;
               const taxRateValue = taxRate.value;
               const ddvValue = ddv.innerText;

               let totalWithoutTaxes =
                    parseFloat(unitPriceValue) * parseFloat(quantityValue);
               priceWithoutTax.innerText = totalWithoutTaxes.toFixed(2);

               // price with ddv (unitPriceValue * quantityValue) * taxRate [1,05 or 1,18 or 1]
               const totalAmount = totalWithoutTaxes * taxRateValue;

               // ddv = price with ddv - price without ddv
               ddv.innerText = (totalAmount - totalWithoutTaxes).toFixed(2);


               amountTxt.innerText = totalAmount.toFixed(2);
               total.innerText = (
                    totalAmount + parseFloat(total.innerText)
               ).toFixed(2);

               toggleBtn.classList.remove("checkBtn");
               toggleBtn.classList.add("editBtn");

               const row = {
                    rowNumber: newRow.classList[0],
                    description: descriptionValue,
                    unitMeasure: unitMeasureValue,
                    unitPrice: unitPrice.innerText,
                    quantity: quantity.innerText,
                    priceWithoutTax: priceWithoutTax.innerText,
                    taxRate: taxRate.value,
                    VAT: ddv.innerText
               }
               allRowsData.push(row)

               //FOR API TOTAL CALCULATION
               //All rows taxes for API
               allRowsTotalTaxes = parseFloat(allRowsTotalTaxes) + parseFloat(ddv.innerText)
               //All rows total without taxes for API
               allRowsTotalWithoutTaxes = parseFloat(allRowsTotalWithoutTaxes) + parseFloat(priceWithoutTax.innerText)
          } else {
               newRow.classList.remove("isCalculated");
               newRow.classList.add("notCalculated");
               // Math for when click edit button on the table row
               total.innerText = (
                    parseFloat(total.innerText) - parseFloat(amountTxt.innerText)
               ).toFixed(2);
               amountTxt.innerText = "";

               //Selecting the neded row elements for making the calculation
               const priceWithoutTax = document.getElementById(
                    `priceWithoutTax-${this.id}`
               );
               const ddv = document.getElementById(`ddv-${this.id}`);
               //All rows taxes for API
               allRowsTotalTaxes = parseFloat(allRowsTotalTaxes) - parseFloat(ddv.innerText)
               //All rows total without taxes for API
               allRowsTotalWithoutTaxes = parseFloat(allRowsTotalWithoutTaxes) - parseFloat(priceWithoutTax.innerText)


               //deleting the data from the row that is not confirmed
               let rowNumber = e.target.parentElement.parentElement.classList[0]
               allRowsData = allRowsData.filter(el => el.rowNumber != rowNumber)


               toggleBtn.classList.remove("editBtn");
               toggleBtn.classList.add("checkBtn");
          }
     });

     //Click the toggle button on the begining
     toggleBtn.click()

     // Creating the delete button
     let deleteBtnRow = document.createElement("td");
     newRow.appendChild(deleteBtnRow);
     deleteBtnRow.classList.add("hidden-print");
     let deleteBtn = document.createElement("button");
     deleteBtn.classList.add("deleteBtn");
     deleteBtn.setAttribute("id", `deleteBtnNum${dataRow}`);
     deleteBtnRow.appendChild(deleteBtn);

     // Function for delete button minusing the deleted row total from the main total
     deleteBtn.addEventListener("click", function (e) {
          // delIznos is inner text of the iznos in the deleted row
          let deletedAmount =
               e.target.parentElement.parentElement.childNodes[8].innerText;
          let newTotalAmount = (
               parseFloat(total.innerText) - parseFloat(deletedAmount)
          ).toFixed(2);
          console.log(e.target.parentElement.parentElement.childNodes[7])
          if (!isNaN(newTotalAmount)) {
               total.innerText = parseFloat(newTotalAmount).toFixed(2);
          } else {
               total.innerText = newTotalAmount
          }

          //Selecting the elements for the calculation
          let deletedTaxAmount = e.target.parentElement.parentElement.childNodes[7].innerText
          let deletedWithoutTaxAmount = e.target.parentElement.parentElement.childNodes[5].innerText
          //All rows taxes for API
          allRowsTotalTaxes = parseFloat(allRowsTotalTaxes) - parseFloat(deletedTaxAmount)
          //All rows total without taxes for API
          allRowsTotalWithoutTaxes = parseFloat(allRowsTotalWithoutTaxes) - parseFloat(deletedWithoutTaxAmount)
          console.log(allRowsTotalTaxes)
          console.log(allRowsTotalWithoutTaxes)
          console.log(total.innerText)
          e.target.parentElement.parentElement.remove();



          //Deleting the row data from the data array that is sent at the server
          let rowNumber = e.target.parentElement.parentElement.classList[0]
          allRowsData = allRowsData.filter(el => el.rowNumber != rowNumber)


          //Indexing the rows properly 
          let rows = tBody.querySelectorAll("tr");

          rows.forEach((row) => {
               row.children[0].innerText = row.rowIndex;
          });
     });
}


// Creating and giving function to reset and print button
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function () {
     let allRows = document.querySelectorAll(".rowClass");
     for (let i of allRows) {
          i.remove();
     }
     dataRow = 0;
     total.innerText = 0;
     addProduct();
});

const printBtn = document.getElementById("btnPrint");
printBtn.addEventListener("click", function () {
     let allTableRows = document.querySelectorAll(".checkBtn");
     for (let tableRow of allTableRows) {
          tableRow.click();
     }

     print();
});







///Create new empty row

const addProduct = function (e) {
     dataRow++;
     // Creating of table rows
     const newRow = document.createElement("tr");
     newRow.classList.add(`rowNum${dataRow}`, "rowClass", "notCalculated");
     tBody.appendChild(newRow);

     // Creating table data, elements within td and append td to tr
     let rowNumber = document.createElement("td");
     newRow.appendChild(rowNumber);
     const rows = tBody.getElementsByTagName("tr");
     rowNumber.append(rows.length);
     rowNumber.classList.add("rowNumber");

     createTableData(newRow, dataRow, "text", "desc");
     createTableData(newRow, dataRow, "text", "unitMeasure");
     createTableData(newRow, dataRow, "number", "unitPrice");
     createTableData(newRow, dataRow, "number", "quantity");
     createTextField(newRow, dataRow, "priceWithoutTax");
     createTaxListData(newRow, dataRow);
     createTextField(newRow, dataRow, "ddv");

     const amount = document.createElement("td");
     newRow.appendChild(amount);
     const amountTxt = document.createElement("span");
     amount.appendChild(amountTxt);
     const toggleBtnRow = document.createElement("td");
     toggleBtnRow.classList.add("hidden-print");
     newRow.appendChild(toggleBtnRow);

     // Creating toggle check and edit button in the table rows
     const toggleBtn = document.createElement("button");
     toggleBtn.classList.add("checkBtn", `calc-row-${dataRow}`);
     toggleBtn.id = `row-${dataRow}`;
     toggleBtnRow.appendChild(toggleBtn);

     toggleBtn.addEventListener("click", function (e) {
          // why disabled
          let calculated = amountTxt.toggleAttribute("disabled");
          if (calculated) {
               newRow.classList.add("isCalculated");
               newRow.classList.remove("notCalculated");

               amountTxt.style.display = "block";

               // Element objects
               const description = document.getElementById(`desc-${this.id}`)
               const unitMeasure = document.getElementById(`unitMeasure-${this.id}`)
               const unitPrice = document.getElementById(`unitPrice-${this.id}`);
               const quantity = document.getElementById(`quantity-${this.id}`);
               const priceWithoutTax = document.getElementById(
                    `priceWithoutTax-${this.id}`
               );
               const taxRate = document.getElementById(`taxRate-${this.id}`);
               const ddv = document.getElementById(`ddv-${this.id}`);

               // Element value
               const descriptionValue = description.innerText
               const unitMeasureValue = unitMeasure.innerText
               const unitPriceValue = unitPrice.innerText;
               const quantityValue = quantity.innerText;
               const priceWithoutTaxValue = priceWithoutTax.innerText;
               const taxRateValue = taxRate.value;
               const ddvValue = ddv.innerText;

               let totalWithoutTaxes =
                    parseFloat(unitPriceValue) * parseFloat(quantityValue);
               priceWithoutTax.innerText = totalWithoutTaxes.toFixed(2);

               // price with ddv (unitPriceValue * quantityValue) * taxRate [1,05 or 1,18 or 1]
               const totalAmount = totalWithoutTaxes * taxRateValue;

               // ddv = price with ddv - price without ddv
               ddv.innerText = (totalAmount - totalWithoutTaxes).toFixed(2);

               amountTxt.innerText = totalAmount.toFixed(2);
               total.innerText = (
                    totalAmount + parseFloat(total.innerText)
               ).toFixed(2);

               toggleBtn.classList.remove("checkBtn");
               toggleBtn.classList.add("editBtn");

               const row = {
                    rowNumber: newRow.classList[0],
                    description: descriptionValue,
                    unitMeasure: unitMeasureValue,
                    unitPrice: unitPrice.innerText,
                    quantity: quantity.innerText,
                    priceWithoutTax: priceWithoutTax.innerText,
                    taxRate: taxRate.value,
                    VAT: ddv.innerText
               }
               allRowsData.push(row)

               //FOR API TOTAL CALCULATION
               //All rows taxes for API
               allRowsTotalTaxes = parseFloat(allRowsTotalTaxes) + parseFloat(ddv.innerText)
               //All rows total without taxes for API
               allRowsTotalWithoutTaxes = parseFloat(allRowsTotalWithoutTaxes) + parseFloat(priceWithoutTax.innerText)
          } else {
               newRow.classList.remove("isCalculated");
               newRow.classList.add("notCalculated");
               // Math for when click edit button on the table row
               total.innerText = (
                    parseFloat(total.innerText) - parseFloat(amountTxt.innerText)
               ).toFixed(2);
               amountTxt.innerText = "";

               //Selecting the neded row elements for making the calculation
               const priceWithoutTax = document.getElementById(
                    `priceWithoutTax-${this.id}`
               );
               const ddv = document.getElementById(`ddv-${this.id}`);
               //All rows taxes for API
               allRowsTotalTaxes = parseFloat(allRowsTotalTaxes) - parseFloat(ddv.innerText)
               //All rows total without taxes for API
               allRowsTotalWithoutTaxes = parseFloat(allRowsTotalWithoutTaxes) - parseFloat(priceWithoutTax.innerText)

               //deleting the data from the row that is not confirmed
               let rowNumber = e.target.parentElement.parentElement.classList[0]
               allRowsData = allRowsData.filter(el => el.rowNumber != rowNumber)


               toggleBtn.classList.remove("editBtn");
               toggleBtn.classList.add("checkBtn");
          }
     });

     // Creating the delete button
     let deleteBtnRow = document.createElement("td");
     newRow.appendChild(deleteBtnRow);
     deleteBtnRow.classList.add("hidden-print");
     let deleteBtn = document.createElement("button");
     deleteBtn.classList.add("deleteBtn");
     deleteBtn.setAttribute("id", `deleteBtnNum${dataRow}`);
     deleteBtnRow.appendChild(deleteBtn);

     // Function for delete button minusing the deleted row total from the main total
     deleteBtn.addEventListener("click", function (e) {
          // delIznos is inner text of the iznos in the deleted row
          let deletedAmount =
               e.target.parentElement.parentElement.childNodes[8].innerText;
          let newTotalAmount = (
               parseFloat(total.innerText) - parseFloat(deletedAmount)
          ).toFixed(2);
          if (!isNaN(newTotalAmount)) {
               total.innerText = parseFloat(newTotalAmount).toFixed(2);
          }

          e.target.parentElement.parentElement.remove();

          //Selecting the elements for the calculation
          let deletedTaxAmount = e.target.parentElement.parentElement.childNodes[7].innerText
          let deletedWithoutTaxAmount = e.target.parentElement.parentElement.childNodes[5].innerText
          console.log(deletedAmount)
          //All rows taxes for API
          allRowsTotalTaxes = parseFloat(allRowsTotalTaxes) - parseFloat(deletedTaxAmount)
          //All rows total without taxes for API
          allRowsTotalWithoutTaxes = parseFloat(allRowsTotalWithoutTaxes) - parseFloat(deletedWithoutTaxAmount)

          //Deleting the row data from the data array that is sent at the server
          let rowNumber = e.target.parentElement.parentElement.classList[0]
          allRowsData = allRowsData.filter(el => el.rowNumber != rowNumber)


          //Indexing the rows properly 
          let rows = tBody.querySelectorAll("tr");

          rows.forEach((row) => {
               row.children[0].innerText = row.rowIndex;
          });
     });
};



const addProductBtn = document.getElementById("newProduct")
addProductBtn.addEventListener("click", () => {
     addProduct()
})

//Fetching the userData from the DB 
const requestUserInfo = {
     method: "GET",
     credentials: "same-origin",
     headers: {
          "Content-Type": "application/json"
     }
}

const getUserData = async function () {
     const rawData = await fetch("/api/userInfo", requestUserInfo)
     const parsedData = await rawData.json()
     return parsedData
}
//Populating the company info inputs with the data fetched from above function
const populateCompanyInfoInputs = async function () {
     const companyData = await getUserData()
     // console.log(companyInfo)
     companyInputs.name.value = companyData.companyName
     companyInputs.address.value = companyData.address
     companyInputs.tel.value = companyData.tel
     companyInputs.email.value = companyData.username
     companyInputs.bankAccount.value = companyData.bankAccount
     companyInputs.taxNumber.value = companyData.taxNumber
}
populateCompanyInfoInputs()
//Fetching the invoice data from the DB
const requestInfo = {
     method: "GET",
     credentials: 'same-origin',
     headers: {
          'Content-Type': 'application/json'
     }
}
let getInvoiceData = async () => fetch(`/api${document.location.pathname}`, requestInfo).then(res => res.json())


//Save or saveEdited Button
const saveDataBtn = document.getElementById("saveDataBtn")

//Getting all the total values from the invoice onSave
const getAllTotal = function () {
     const allTotal = {
          totalWithoutTaxes: parseFloat(allRowsTotalWithoutTaxes).toFixed(2),
          totalTaxes: parseFloat(allRowsTotalTaxes).toFixed(2),
          total: parseFloat(total.innerText).toFixed(2)
     }
     return allTotal
}

//making the table data function
const displayData = async function () {
     if (document.location.pathname.length > 1) {
          saveDataBtn.innerText = "Зачувај ја промената"

          let data = await getInvoiceData()
          for (let i of data.products) {
               invoiceDataRows(i.description, i.unitMeasure, i.unitPrice, i.quantity, i.taxRate)
          }
          //Client data populate
          clientCompanyInputs.name.value = data.clientInfo.name
          clientCompanyInputs.address.value = data.clientInfo.address
          clientCompanyInputs.tel.value = data.clientInfo.tel
          clientCompanyInputs.email.value = data.clientInfo.email

          //Invoice data populate
          invoicePaymentInputs.invoiceNumber.value = data.invoiceInfo.invoiceNumber

          let executionDateConverted = new Date(data.invoiceInfo.executionDate).toLocaleDateString('en-CA')
          invoicePaymentInputs.executionDate.value = executionDateConverted

          let invoiceDateConverted = new Date(data.invoiceInfo.invoiceDate).toLocaleDateString('en-CA')
          invoicePaymentInputs.invoiceDate.value = invoiceDateConverted

          let paymentDateConverted = new Date(data.invoiceInfo.paymentDate).toLocaleDateString('en-CA')
          invoicePaymentInputs.paymentDate.value = paymentDateConverted

          //Company,Client & Invoice info confirm button 
          companiesInfoBtn.click()

          //Save as new button
          const bottomBtnsDiv = document.getElementById("actionsBox")
          const saveAsNewBtn = document.createElement("button")
          saveAsNewBtn.innerText = "Зачувај како нова фактура"
          saveAsNewBtn.setAttribute("id", "saveAsNewBtn")
          bottomBtnsDiv.append(saveAsNewBtn)
          //Function for getting all the total values from the invoice
          let allTotal = getAllTotal()

          saveAsNewBtn.addEventListener("click", async () => {
               getClientAndInvoiceData()
               // let sentEdited = {
               //      method: "PATCH",
               //      headers: {
               //           "Content-Type": "application/json"
               //      },
               //      body: JSON.stringify([clientAndInvoiceData, allRowsData, allTotal]),

               // }
               let sentNew = {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify([clientAndInvoiceData, allRowsData, allTotal]),

               }
               const returnResponse = await fetch("/saveInvoice", sentNew)
               const link = await returnResponse.json()
               location.href = `/invoice/${link}`
          })

     } else {
          saveDataBtn.innerText = "Зачувај"
          addProduct()
     }
}
displayData()



// Saving the data to the DB

saveDataBtn.addEventListener("click", async () => {
     let allTotal = getAllTotal()

     // getAllCompanyInfoData()
     getClientAndInvoiceData()

     const today = new Date().toLocaleDateString("en-CA")
     if (!clientAndInvoiceData.invoiceInfo.executionDate) {
          clientAndInvoiceData.invoiceInfo.executionDate = today

     }
     if (!clientAndInvoiceData.invoiceInfo.invoiceDate) {
          clientAndInvoiceData.invoiceInfo.invoiceDate = today

     }
     if (!clientAndInvoiceData.invoiceInfo.paymentDate) {
          clientAndInvoiceData.invoiceInfo.paymentDate = today
     }
     let sentEdited = {
          method: "PATCH",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify([clientAndInvoiceData, allRowsData, allTotal]),

     }
     let sentNew = {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify([clientAndInvoiceData, allRowsData, allTotal]),

     }

     if (document.location.pathname.length > 1) {

          let data = await getInvoiceData()
          console.log(allTotal)
          await fetch(`/invoice/${data._id}`, sentEdited)

     } else {
          const returnResponse = await fetch("/saveInvoice", sentNew)
          const link = await returnResponse.json()
          location.href = `/invoice/${link}`
     }

})

