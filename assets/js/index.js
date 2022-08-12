const btn = document.querySelector('#btnResult')
//get data from an endpoint
getCurrency = async () => {
    try {
        const currencyEndPoint = "https://mindicador.cl/api"
        const res = await fetch(currencyEndPoint)
        const resJSON = await res.json()
        const currency = resJSON
        return currency
    } catch (err) {
        console.log(err)
    }
}

btn.addEventListener('click', calculate = async () => {
    //retrieve dom elements
    const clp = document.querySelector('#clpInput')
    const currencySelector = document.querySelector('#currencySelector')
    const result = document.querySelector('#total')
    const currency = await getCurrency()
    //only number allowed
    if (clp.value == '') {
        return alert('only numbers accepted')
        //usd case
    } else if (currencySelector.value === "usd") {
        return result.innerHTML = `$${(clp.value / currency.dolar.valor).toFixed(2)}`
        //euro case 
    } else if (currencySelector.value === "euro") {
        return result.innerHTML = `$${(clp.value / currency.euro.valor).toFixed(2)}`
        //anything else kill the function
    } else {
        return result.innerHTML = 'Error'
    }
})



