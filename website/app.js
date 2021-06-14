// const { resolve } = require("path/posix");

/* Global Variables */
const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=`
const apiKey = 'd4cbd985a0bf9f74575f05f96cb60840'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

let genBtn = document.getElementById('generate');

genBtn.addEventListener('click', async ()=>{
   
    let myFeelings = document.getElementById('feelings').value;
  
    
    getMyTemp()
    .then(result =>{
        postMethod(result, myFeelings)
    })
    .then(result =>{
        getMethod()
    })
    // .then(weatherData =>{
    //     updateUI(weatherData)
    //  })
    .catch((err)=>{
        console.log(err,'we have an error')
    })

})


async function getMyTemp () {
    let zipCode = document.getElementById('zip').value;

    if(!zipCode){
        alert("please insert a zipcode");
    }

    const res = await fetch(baseURL+zipCode+'&appid='+apiKey)
    const data = await res.json()
    console.log(data)
    const temp = data.main.temp
    return temp
}

async function postMethod(temp, feelings) {
    
        await fetch('/saveWeatherData',{
            method :'POST',
            credentials: 'same-origin',
            headers:{
            'Content-Type': 'application/json'
                },
            body: JSON.stringify({
            date : newDate,
            temp : temp,
            content : feelings
            })
        })

}
    

async function  getMethod() {
    await fetch("/getWeatherData")
      .then((data) => data.json())
      .then((dataBack) => updateUI(dataBack));
  }


async function updateUI(data) {
    document.getElementById("date").innerHTML = "date: " + await data.date;
    document.getElementById("temp").innerHTML = "temp:  " + await data.temp;
    document.getElementById("content").innerHTML = "I feel " +  await data.content;
}






