
const main = document.querySelector("main")

const createTotalRow = function (totalPayed, totalPayedWithoutTaxes, totalPayedTaxes, totalUnpayed, totalUnpayedWithoutTaxes, totalUnpayedTax) {
     const totalRow = document.createElement("div")
     totalRow.classList.add("totalRow")
     main.prepend(totalRow)

     const payedChartDiv = document.createElement("div")
     payedChartDiv.classList.add("payedChartDiv")

     const payedChartCanvas = document.createElement("canvas")
     payedChartCanvas.classList.add("payedChartCanvas")
     payedChartDiv.append(payedChartCanvas)
     totalRow.append(payedChartDiv)
     const totalPayedChart = new Chart(payedChartCanvas, {
          type: "bar",
          data: {
               labels: [`Вкупно: ${totalPayed
                    }`, `Без ДДВ: ${totalPayedWithoutTaxes
                    }`, `ДДВ: ${totalPayedTaxes}`],
               datasets: [{
                    label: 'Наплатено',
                    data: [totalPayed, totalPayedWithoutTaxes, totalPayedTaxes],
                    backgroundColor: [
                         'rgba(255, 99, 132)',
                         'rgba(54, 162, 235)',
                         'rgba(255, 206, 86)',
                    ],
                    borderColor: [
                         'rgba(255, 99, 132)',
                         'rgba(54, 162, 235)',
                         'rgba(255, 206, 86)',
                    ],
                    borderWidth: 2
               }],
               options: {
                    responsive: true,
                    aspectRatio: 1,
               }
          },


     })

     const unpayedChartDiv = document.createElement("Div")
     unpayedChartDiv.classList.add("unpayedChartDiv")
     const unpayedChartCanvas = document.createElement("canvas")
     unpayedChartDiv.append(unpayedChartCanvas)
     totalRow.append(unpayedChartDiv)
     const totalUnpayedChart = new Chart(unpayedChartCanvas, {
          type: "bar",
          data: {
               labels: [`Вкупно: ${totalUnpayed}`, `Без ДДВ: ${totalUnpayedWithoutTaxes
                    }`, `ДДВ: ${totalUnpayedTax}`],
               datasets: [{
                    label: 'За наплата',
                    data: [totalUnpayed, totalUnpayedWithoutTaxes, totalUnpayedTax],
                    backgroundColor: [
                         'rgba(255, 99, 132)',
                         'rgba(54, 162, 235)',
                         'rgba(255, 206, 86)',
                    ],
                    borderColor: [
                         'rgba(255, 99, 132)',
                         'rgba(54, 162, 235)',
                         'rgba(255, 206, 86)',
                    ],
                    borderWidth: 2
               }],
               options: {
                    responsive: true,
                    aspectRatio: 1
               }
          },


     })

}

