const sideNav = document.querySelector('.sidenav');
    M.Sidenav.init(sideNav, {});
// Material Boxed
const mb = document.querySelectorAll('.materialboxed');
M.Materialbox.init(mb, {});

// ScrollSpy
const ss = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(ss, {});

// Fixed Asset Button
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    // direction: 'left',
    hoverEnabled: false
  });
});

// const fab = document.querySelectorAll('.fixed-action-btn');
// M.FloatingActionButton.init(fab, {
//   hoverEnabled:false;
// });

// Slider
const slider = document.querySelector('.slider');
M.Slider.init(slider, {
  indicators: false,
  height: 500,
  transition: 500,
  interval: 4000
});


//UI ELEMENTS
const taxcalculator = document.querySelector('#taxCalculator');
const year = document.getElementById("year");
const income = document.querySelector('#income');
const Status = document.getElementById("status");
const message = document.querySelector('.message');
const calcBtn = document.querySelector("#submit-tax");
const ordTax = document.querySelector('#ordTax');
const disclaimer = document.querySelector('#disclaimer');

//LISTEN FOR SUBMIT
calcBtn.addEventListener('click', function(){
  console.log("clicked");
  let Ordinary = parseInt(income.value);
  let MyStatus = Status.options[Status.selectedIndex];
  let MyYear = year.options[year.selectedIndex];
  console.log(MyStatus.value);
    if(isNaN(Ordinary)){
      setMessage("Please Enter Your Income",'red','');
      disclaimer.textContent = '';
    }else if(MyYear.value === "0" ){
      setMessage("Please Select a year", 'red','');
      disclaimer.textContent = '';
    }else if(MyStatus.value === "0" ){
      setMessage("Please Select Your Filing Status", 'red','');
      disclaimer.textContent = '';
    }else{
      let Tax = myTax(Ordinary, MyStatus.value, MyYear.value).toLocaleString('en-US',{
        style: "currency",
        currency: "USD",
        minimumFractionDigits:0,
        maximumFractionDigits: 0,
      });
      
      setMessage(`Ordinary Federal Income Tax Will Be ${Tax} as a ${MyStatus.text} Taxpayer With $${Ordinary.toLocaleString('en-US')} of Taxable Ordinary Income.`, 'black', 'rgb(248, 238, 238)');
      
      // income.value = '';
      income.disabled = false;
      Status.disabled = false;
      // calcBtn.className += ' recalculate'
      // calcBtn.text = "Try Again"  
      
      disclaimer.textContent = `The calculated amount of tax shown is based on ${MyYear.text} IRS ordinary income tax rates.  Capital gains, self employment, state or other types of taxes are not considered in this calculation.`

    }
    document.getElementById("message").focus();
})

function setMessage(msg, color, bckg){
  message.textContent = msg;
  message.style.color = color;
  message.style.background = bckg;
}

//MATH FOR TAX
//generic tax function 
function taxCalc(rates, brackets, income, status, year){
  var tax = 0;
  var myBracket = [];
  var x = brackets.get(year)
  x.forEach(function(item){
    if (item[0] == status){
        myBracket = item[1]
    }
  }) 
  
  for (let i = 0; i<rates[year].length-1; i++){
    if (income > myBracket[i]){
      tax += (Math.min(income,myBracket[i+1])-myBracket[i])*rates[year][i];
      }
  }
  
  if (income>myBracket[myBracket.length-1]){
    tax += (income - myBracket[myBracket.length -1])*rates[year][rates[year].length-1];
  }
  
   return tax

} 

//calculate fed tax
function myTax(income, status, year){
  var rates = {"2020": [.1,.12,.22,.24,.32,.35,.37]};
  var brackets = new Map();
  brackets.set("2020",[['MFJ', [0,19750,80250,171050,326600,414700,622050]],
                     ['IND', [0,9875,40125,85525,163300,207350,518400]],
                     ['HOH', [0,14100,53700,85500,63300,207350,518400]],
                     ['MFS', [0,9875,40125,85525,163300,207350,518400]]]
);

return taxCalc(rates,brackets,income,status, year)

}




