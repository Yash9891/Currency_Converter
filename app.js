const base_url='https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'
const dropdowns=document.querySelectorAll(".dropdown select")
const button =document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg")
// for (codekey in countryList){
//     console.log(codekey,countryList[codekey]);
// }

window.addEventListener("load",()=>{
    updatExchangeRate()

})

for(let select of dropdowns){
    for (currCode in countryList){
    let newOption =document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode
    if(select.name==="from" && currCode==="USD"){
        newOption.selected="selected"
    }else if(select.name==="to" && currCode==="INR"){
        newOption.selected="selected"

    }
    select.append(newOption)
    

}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target)
})

}

const updateFlag=(element)=>{//element=select in html
    let currCode=element.value;
    // console.log(currCode);
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newSrc


}



button.addEventListener(('click'), (evt)=>{
    evt.preventDefault()//it  dsabled the form event
    updatExchangeRate()
    
})

const updatExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1"
    }
    // console.log(fromCurr.value);
    // console.log(toCurr.value);
    const URL=`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response=await fetch(URL)
    let data=await response.json()
    let rate = data[toCurr.value.toLowerCase()]
    // console.log(response);
    // console.log(data);
    // console.log(rate);

    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

}