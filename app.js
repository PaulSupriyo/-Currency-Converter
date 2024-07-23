const BASE_URL= "https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=INR"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const resultDiv = document.querySelector(".msg");

for(let select of dropdowns ){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value= currCode;
       
        if(select.name==="from"&& currCode==="USD"){
            newOption.selected ="selected";
        } else if(select.name==="to"&& currCode==="INR"){
            newOption.selected ="selected";
        }
        select.append(newOption);
    }
    select
    .addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag = (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input").value;
    if (amount === "" || amount < 1) {
        amount = 1;
        document.querySelector(".amount input").value = "1";
    }

    const BASE_URL = `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;

    try {
        let response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
        let data = await response.json();

        let rate = data.rates[toCurr.value];
        let convertedAmount = (amount * rate).toFixed(2);

        resultDiv.innerText = `${amount} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
    } catch (error) {
        console.error("Fetch error: ", error);
        resultDiv.innerText = "There was an error fetching the conversion rate.";
    }
});