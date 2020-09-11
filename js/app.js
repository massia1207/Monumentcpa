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
  console.log(MyStatus.value);
    if(isNaN(Ordinary)){
      setMessage("Please Enter Your Income",'red','');
      disclaimer.textContent = '';
    }else if(MyStatus.value === "0" ){
      setMessage("Please Select Your Filing Status", 'red','');
      disclaimer.textContent = '';
    }else{
      let Tax = myTax(Ordinary, MyStatus.value).toLocaleString('en-US',{
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
      
      disclaimer.textContent = "The calculated amount of tax shown is based on 2020 IRS ordinary income tax rates.  Capital gains, self employment, state or other types of taxes are not considered in this calculation."

    }
    document.getElementById("message").focus();
})

function setMessage(msg, color, bckg){
  message.textContent = msg;
  message.style.color = color;
  message.style.background = bckg;
}

//MATH FOR TAX
function myTax(ordinary, status){      
  let ordTax = 0;
  let r1 = .1;
  let r2 = .12;
  let r3 = .22;
  let r4 = .24;
  let r5 = .32;
  let r6 = .35;
  let r7 = .37;
  let t1 = 0, t2=0, t3=0, t4=0, t5=0, t6=0,t7=0;
  
    switch(status){
      case "MFJ":
        console.log("case is MFJ") 
        t1 = 19750;
        t2 = 80250;
        t3 = 171050;
        t4 = 326600;
        t5 = 414700;
        t6 = 622050;
        break;
      case "IND":
        t1 = 9875;
        t2 = 40125;
        t3 = 85525;
        t4 = 163300;
        t5 = 207350;
        t6 = 518400;
        break;
      case "MFS":
        t1 = 9875;
        t2 = 40125;
        t3 = 85525;
        t4 = 163300;
        t5 = 207350;
        t6 = 518400;
        break;
       case "HOH":
        t1 = 14100;
        t2 = 53700;
        t3 = 85500;
        t4 = 163300;
        t5 = 207350;
        t6 = 518400;
        break;
     }
  
   ordTax = 0
   if(ordinary >0){
   ordTax = Math.min(ordinary, t1)*r1;
   }
        
    if (ordinary > t1){
      ordTax = ordTax + ((Math.min(ordinary, t2) - t1) * r2);
    }
  
    if (ordinary > t2){
      ordTax = ordTax + ((Math.min(ordinary, t3) - t2) * r3);
    }
     
    if (ordinary > t3){
      ordTax = ordTax + ((Math.min(ordinary, t4) - t3) * r4);
    } 
      
    if (ordinary > t4){
      ordTax = ordTax + ((Math.min(ordinary, t5) - t4) * r5);
    } 
      
    if (ordinary > t5) {
      ordTax = ordTax + ((Math.min(ordinary, t6) - t5) * r6);
    }
      
    if (ordinary > t6){
      ordTax = ordTax + ((ordinary - t6) * r7);
     }
       
    
     return ordTax
    
}






