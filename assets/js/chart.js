const selector = document.querySelector('#currencySelector')
//get usd data
usdData = async () => {
    const endPoint = "https://mindicador.cl/api/dolar"
    try {
        const res = await fetch(endPoint)
        const data = await res.json()
        const currencyDate = data.serie
        var usdPastDates = currencyDate.map((value) => {
            const dates = new Date(value.fecha).toDateString()
            return dates
        })
        const currencyValue = data.serie
        var usdPastValues = currencyValue.map((value) => {
            const pastValue = value.valor
            return pastValue
        })
        return { usdPastValues, usdPastDates }
    } catch (error) {
        console.log(error)
    }
}
//get eurodata
euroData = async () => {
    const endPoint = "https://mindicador.cl/api/euro"
    try {
        const res = await fetch(endPoint)
        const data = await res.json()
        const currencyDate = data.serie
        var euroPastDates = currencyDate.map((value) => {
            const dates = new Date(value.fecha).toDateString()
            return dates
        })
        const currencyValue = data.serie
        var euroPastValues = currencyValue.map((value) => {
            const pastValue = value.valor
            return pastValue
        })
        return { euroPastValues, euroPastDates }
    } catch (error) {
        console.log(error)
    }
}
//config graph and values
async function configGraphAndRender() {
    const grafica = document.querySelector('#myChart')
    try {
        euro = await euroData()
        usd = await usdData()
    } catch (error) {
    }
    const labels = euro.euroPastDates
    const data = {
        labels: labels,
        datasets: [{
            label: 'select a currency',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: ''
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 11,
                    }
                }
            }
        }
    };
    const myChart = new Chart(grafica, config)
    myChart.render()

    selector.addEventListener('change', updateChart = () => {
        if (selector.value === 'usd') {
            myChart.data.datasets[0].label = 'Valor USD'
            myChart.data.datasets[0].data = usd.usdPastValues
            myChart.update();
            //console.log(selector.value)
        } else if (selector.value === 'euro') {
            myChart.data.datasets[0].label = 'Valor Euro'
            myChart.data.datasets[0].data = euro.euroPastValues
            myChart.update();
            //console.log(selector.value)
        } else {
            myChart.data.datasets[0].label = 'Valor Euro'
            myChart.data.datasets[0].data = ''
            myChart.update()
        }
    })
}

//call graph
document.addEventListener('DOMContentLoaded', (event) => {
    configGraphAndRender();
});
