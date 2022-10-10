"use strict"
const  Model =  {};
const  View =  {};
const  Controller =  {};


Model.recipientSelectButtonState = window.localStorage.getItem('buttonState');
Model.paymentMethod  =      window.localStorage.getItem('paymentMethod');
Model.selectCountry        =      window.localStorage.getItem('selectCountry');
Model.addCard              = window.localStorage.getItem('card');

Controller.initialize  =  function(eventObject){

  Model.customerState =  window.localStorage.getItem("customer");
  Model.recipient =     window.localStorage.getItem('recipient');


  View.paymentCard  =  document.getElementById("paymentCard");
  View.paymentCash  =  document.getElementById("paymentCash");
  
  View.topup = document.getElementById("topup");

  View.data_key_customer_data = document.getElementById("data-key-customer-data");

  View.sendMoneyMainbutton = document.getElementById("sendMoneyMainbutton");
  View.addcard             = document.getElementById("addcard")
  View.cardSubmitButton    = document.getElementById("cardSubmitButton"); 

  View.found_user =  document.getElementById("found_user"); 
  View.senderTable = document.getElementById("senderTable")

  View.addNewCustomer = document.getElementById("addNewCustomer");
  
  View.recipients   = document.querySelectorAll(".recipient");
  View.paymentMethods =  document.querySelectorAll(".paymentMethod");

  View.search = document.getElementById("search");

  View.phoneInput = document.getElementById("input"); 

  View.customerNotFoundNumber = document.getElementById("customerNotFoundNumber");
  View.recipiantNotFoundNumber = document.getElementById("recipiantNotFoundNumber");
  View.recipiantNotFoundNumberTable  = document.getElementById("recipiantNotFoundNumberTable");

  View.addrecipiant = document.getElementById("addrecipiant");

  View.save_sender = document.getElementById("save_sender");
  View.save_reciver = document.getElementById("save_reciver")
  
  View.insertCustomer = document.getElementById("insertCustomer");
  
  View.found_user   = document.getElementById("found_user")
  View.clear        = document.getElementById("clear")
  View.inputPhoneNumber = document.getElementById("inputPhoneNumber");
  
 
  View.addrecipiant     = document.getElementById("addrecipiant");
  
  // Customer  table id's 
  View.inputFirstNameCustomer = document.getElementById("inputFirstNameCustomer");
  View.inputLastNameCustomer = document.getElementById("inputLastNameCustomer");
  View.inputAddressCustomer = document.getElementById("inputAddressCustomer");
  View.inputContactCustomer = document.getElementById("inputContactCustomer");
  View.inputCountryCustomer = document.getElementById("inputCountryCustomer");
  View.inputPhoneNumberCustomer = document.getElementById("inputPhoneNumberCustomer");
  // Customer table  ids ends

  // reciver  table id's 
  View.inputFirstNameRecipient = document.getElementById("inputFirstNameRecipient");
  View.inputLastNameRecipient =  document.getElementById("inputLastNameRecipient");
  View.inputAddressRecipient =   document.getElementById("inputAddressRecipient");
  View.inputContactRecipient =   document.getElementById("inputContactRecipient");
  View.inputCountryRecipient =   document.getElementById("inputCountryRecipient");
  View.inputPhoneNumberRecipient = document.getElementById("inputPhoneNumberRecipient");
  View.recipiantAddOtherRecipient = document.getElementById("recipiantAddOtherRecipient");
  // end  of  reciver  id's 
  
  //amount  in  dollar  and amout  converted  and  fee   and  change 
  View.amoutInDallor  = document.getElementById("amoutInDallor"); 
  View.amountConverted = document.getElementById("amountConverted");
  View.charge          = document.getElementById("charge"); 
  
  if(View.topup != null){

    View.topup.addEventListener('click',  function(){

        alert("View.topup has  been  clicked ");
    });
  }

  if( View.addcard  != null){

        View.addcard.addEventListener('click', Controller.addcard)

  }

  if( View.cardSubmitButton  != null){

        View.cardSubmitButton.addEventListener('click', Controller.cardSubmitButton)

  }

  if(View.sendMoneyMainbutton  !=  null){

    
        View.sendMoneyMainbutton.addEventListener('click', Controller.sendMoneyMainbutton);

  }

  if(View.inputPhoneNumberRecipient != null){

        View.inputPhoneNumberRecipient = document.getElementById("inputPhoneNumberRecipient");
  }
  

  if(View.recipiantAddOtherRecipient != null){

        View.recipiantAddOtherRecipient.addEventListener('click' ,  Controller.recipiantAddOtherRecipient);
  }
 
  if(View.customerNotFoundNumber != null){

    View.customerNotFoundNumber.addEventListener('click' , Controller.customerNotFoundNumber);

  }

  if(View.recipiantNotFoundNumber != null){

    View.recipiantNotFoundNumber.addEventListener('click',  Controller.recipiantNotFoundNumber)
  }
  if(View.insertCustomer != null){

    View.insertCustomer.addEventListener('click', Controller.insertCustomer);
  }
  
  if(View.save_reciver != null ){

      View.save_reciver.addEventListener('click', Controller.save_reciver);
  }

  if(View.addrecipiant != null){

     View.addrecipiant.addEventListener('click', Controller.showAddrecipiant);
  }

 if(View.search !=  null && Model.search == null){

    
     View.search.addEventListener('click', Controller.customerState);


  }
 if(View.search !=  null  &&   View.search.attributes['data-key'] != null){

    View.search.addEventListener('click', Controller.customerIsNoTAvaliable);

 }
 if(View.search !=  null &&   View.search.attributes['data-key'] != null){

    View.search.addEventListener('keyup', Controller.customerIsNoTAvaliable);

 }

if(View.save_sender !=  null){

    View.save_sender.addEventListener('click' ,  Controller.editSender);

}
  
if(View.clear  != null){

    View.clear.addEventListener('click', Controller.clear);
}

if(View.search != null){

      View.search.addEventListener('keyup' , Controller.validateForm);
  
}
Controller.selectRecipient();
Controller.paymentMethod();
Controller.selectOption();
Controller.selectOptionPayments();


$("#amoutInDallor").on("keyup", function (e){

    let amount  =  document.getElementById("amoutInDallor");

    Controller.apiResult(amount.value, "USD",  "SLL");

});
   
}

Controller.apiResult = function(amount, currentCountryCode,  receivingCountryCode){

        let  v  = document.getElementById("amountConverted");

        let charge  = document.getElementById("charge");

        var myHeaders = new Headers();

        myHeaders.append("apikey", "FoLzpNufmZOWlGZNvdEEgU1kPwwmQBsN");

        var requestOptions = { method: 'GET', redirect: 'follow', headers: myHeaders };

    let x =  fetch(`https://api.apilayer.com/fixer/convert?to=${receivingCountryCode}&from=${currentCountryCode}&amount=${amount}`, requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {

            v.value =   responseJSON['result']; 

            charge.value  = 13.00

        // do stuff with responseJSON here...
        console.log(responseJSON);
        });
    console.log(x);
}
$(document).keyup(function(event) {
    if (event.which === 13) {
        let value =  View.phoneInput.value;


    if (value == "") {

    
      alert("Input  field must be filled out");

      return false;

    }
    
    if(isNaN(value)){

        alert("That  is  not  a   number");
        return  false
    }

    if(value != "" && !isNaN(value) && value.length > 9 && value.length == 10){

        //alert("The input  string  passed the test"); 

        $.ajax({
            type: "POST",
            url: "/findUser",
            data: JSON.stringify({
            "phoneNumber":value,
          
            } ),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                console.log(data);
                
            }
        })

        View.phoneInput.value = ""; 

        

        setInterval(Controller.refreshPage, 1000);


        event.preventDefault(); 
        
    }

    
   
    if(value.length  < 10){

        alert("Phone  number  is not equal  10"); 
    }
    }
});
Controller.cardSubmitButton = function(){

    let carMessage  = document.getElementById("cardMessage");

    carMessage.style.display = "block"; 

}
Controller.addcard =  function(event){

    console.log("addcard button  has been  clicked ");

    let  email = document.getElementById("email").value; 
    let  card  = document.getElementById("cardNumber").value; 
    let  month = document.getElementById("month").value;
    let  year  = document.getElementById("year").value;
    let  securityCode = document.getElementById("securityCode").value;

    let data = {"email":email, "card":card, "month":month,"year":year, "securtiyCode":securityCode};

    window.localStorage.setItem('card', JSON.stringify(data)); 

    Model.addCard  =  window.localStorage.getItem('card');

    console.log(JSON.parse(Model.addCard));
    console.log(card)

    let submitButton  = document.getElementById("cardSubmitButton");

    let  x  = document.getElementById("cardform");
    
    if (x.style.display === "none") {
    
            x.style.display = "block";
    
    } else {
    
            x.style.display = "none";
    
    }
    
    submitButton.addEventListener('click', function(event){

        console.log(email); 

    });

    

}
Controller.checkPhoneNumber =  function(phone){


    if (phone != "") {

        if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone)) {

            //alert("Please enter a  valiable  phone  number ");

            //document.formname.txt.focus();

            return false;

        }else{

            return  true; 
        }
    }
}
Controller.checkForSpecialCharacter =  function(checkString){

    if (checkString != "") {

        if (/[^A-Za-z\d]/.test(checkString)) {

            alert("Please enter only letter and numeric characters");

            //document.formname.txt.focus();

            return false;
        }else{

            return  true; 
        }
    }
}
Controller.storeCustomer = function(){

        let firstname  =  View.inputFirstNameCustomer.value;
        let lastname   =  View.inputLastNameCustomer.value;
        let address    =  View.inputAddressCustomer.value;
        let contact    =  View.inputContactCustomer.value;
        let country    =  View.inputCountryCustomer.value;
        let phone      =  View.inputPhoneNumberCustomer.value;
        let _id        =  View.inputFirstNameCustomer.attributes[1].nodeValue;

        console.log(_id);

        let data   =  null;  

        if(firstname.length > 3  &&  lastname.length > 3 &&  address.length > 3){

           data =  {"first":firstname,
           "lastname":lastname, 
           "address":address,
           "contact":contact,
           "country":country, 
           "phone":phone, 
           "_id":_id,
           "state":true,

        };
           
           window.localStorage.setItem('customer', JSON.stringify(data)); 
        }
        
        
}
Controller.customerState =  function(){

    
    Model.search  =  {"click":true}; 

    if(Model.search['click']  == true &&  View.phoneInput.value != undefined &&  View.phoneInput.value !=""){


        Model.search = {"click":false};

        Controller.validateForm();


    }else{

        alert("Input  field is  empty please  enter  a   valiable phone number "); 
    }

}
Controller.sendMoneyMainbutton = function(){

     alert("You  are  sending  money "); 

     let  amoutInDallor    = View.amoutInDallor.value; 
     let  amountConverted  = View.amountConverted.value;
     let  fee              = View.charge.value;

    if (amountConverted.length <= 9 && amoutInDallor.length >= 1 &&  fee.length >= 1 

        
        &&  Model.customerState != null &&  Model.recipient !=  null && Model.paymentMethod != null 

        &&  Model.selectCountry != null  &&  amountConverted  != "" && amoutInDallor != ""

        && amoutInDallor.replace(/\s/g, "") !=  "" &&  amountConverted.replace(/\s/g, "") !=""  && fee.replace(/\s/g, "") !=""

        ){  
            
            if(!isNaN(amountConverted) && !isNaN(amoutInDallor)){

                let  recipient  =       JSON.parse(Model.recipient);
                let  customer   =       JSON.parse(Model.recipient);
                let  buttonState     =  JSON.parse(Model.recipientSelectButtonState);

                if(Model.recipientSelectButtonState != null &&  buttonState['click'] == true){

                        let  recipient  =  JSON.parse(Model.recipient);
                        let  customer   =  JSON.parse(Model.recipient);
                        let  buttonState     =  JSON.parse(Model.recipientSelectButtonState);

        
                        $.ajax({
                            type: "POST",
                            url: "/submitPayment",

                            data: JSON.stringify({
                            
                            "firstname":recipient['firstname'],
                            "lastname":recipient['lastname'],
                            "address":recipient['address'],
                            "contact":recipient['contact'],
                            "country":recipient['country'],
                            "_id":recipient['_id'],
                            "senderPhoneNumber":recipient['senderPhoneNumber'],
                            "recipientPhoneNumber":recipient['recipientPhoneNumber'], 
                            "sentAmount":recipient['amount']
                           
                            } ),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {

                                console.log(data);
                                
                            }
                        })

                        setInterval(Controller.refreshPage, 1000);

                        window.localStorage.removeItem('customer');
                        window.localStorage.removeItem('recipient');
                        window.localStorage.removeItem('buttonState');
                        window.localStorage.removeItem('paymentMethod');
                        window.localStorage.removeItem('selectCountry');

                        event.preventDefault(); 
                        
                }else{

                        alert("One   or  more  fields don't   meet  the requirement ");
               }
            }else{

                alert("That is  not  a number "); 
            }

    }else{

        if(Model.paymentMethod == null){

            alert("Please  select  payment type to  continue"); 

        }

        if(Model.customerState == null &&  Model.recipient ==  null){

            alert("Please select a recipient to  continue ");

        }

        if(amountConverted.length < 3 && amoutInDallor.length < 3 ){
            
            alert("Input must  be  greater  than 3 ");

        }

        if(amountConverted  == "" && amoutInDallor == ""){

            alert("One  or  two  fields are  Empty");

        }

        if(amoutInDallor.replace(/\s/g, "") ==  "" &&  amountConverted.replace(/\s/g, "") ==""){

            alert("Please  enter  some valuable  value");
        }

        if(Model.selectCountry ==  null){

            alert("Please  select  a  country where  the  recipient lives "); 
        }
       
    }
    
    
   
}
Controller.selectOptionPayments =  function(){

    if(document.getElementById('my-select-payments') != null){

        document.getElementById('my-select-payments').addEventListener('change', function(event) {

              console.log(this.value); 

              $.ajax({
                type: "POST",
                url: "/selectedPayment",

                data: JSON.stringify({
    
                "currentSelectedPaymentId":this.value,
                
                } ),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    console.log(data);
                    
                }
            })

            //setInterval(Controller.refreshPage, 1000);

            document.getElementById("paymentDisplay").style.display="block";

            

            });
    }
    


} 
Controller.selectOption =  function(){

    if(document.getElementById('my-select') != null){

        document.getElementById('my-select').addEventListener('change', function(event) {

                let  data  = {};  

                for(let  i  = 0;  i <  Countries.length ;  i++){

                    if(Countries[i]['index'] == this.value){
                        
                        data = Countries[i];

                        console.log('You selected: ', this.value);

                        window.localStorage.setItem('selectCountry', JSON.stringify(data));

                        Model.selectCountry =  window.localStorage.getItem('selectCountry');

                        console.log(JSON.parse(window.localStorage.getItem('selectCountry'))['name']); 

                    }

                }
                

            });
    }
    


} 
Controller.customerIsNoTAvaliable =  function(){

    let v  = null; 

    if(View.addNewCustomer.attributes['data-key'].nodeValue != null){

       v =  View.addNewCustomer.attributes['data-key'].nodeValue;

    }
  
    let  input  = View.phoneInput.value;

    if(v == "None" || input != undefined){

        View.addNewCustomer.style.display="block";
    }
}
Controller.selectRecipient =  function(){

    
    if(View.recipients != undefined &&  View.recipients != null){

    
        for (let i = 0; i < View.recipients.length; i++) {

            View.recipients[i].addEventListener('click', Controller.runRecipient);
        }
    }
}
Controller.paymentMethod =  function(){

    for (let i = 0; i < View.paymentMethods.length; i++) {
            
            if(Model.paymentMethod == null){

                View.paymentMethods[i].addEventListener('click', Controller.activePayment);

            }
             if(Model.paymentMethod != null){


                View.paymentMethods[i].addEventListener('click', Controller.activePayment);
 
            }
    }
    
}
Controller.activePayment = function(event){

    let  payment  = event.target.attributes[1].value; 

    if(payment == "card"){

    
        let  paymentSelectMessage  =  document.getElementById("paymentSelectMessage");

        let  data  =  {"paymentMethod":"card"}; 

        window.localStorage.setItem('paymentMethod', JSON.stringify(data));

        Model.paymentMethod =  window.localStorage.getItem('paymentMethod');

        paymentSelectMessage.style.display="block";

        console.log(window.localStorage.getItem('paymentMethod')); 

        paymentSelectMessage.childNodes[1].childNodes[0].innerText = JSON.parse(window.localStorage.getItem('paymentMethod'))['paymentMethod'];

    }
    
    if(payment == "cash"){

        let  paymentSelectMessage  =  document.getElementById("paymentSelectMessage");

        let  data  =  {"paymentMethod":"cash"}; 

        window.localStorage.setItem('paymentMethod', JSON.stringify(data));

        Model.paymentMethod =  window.localStorage.getItem('paymentMethod');

        paymentSelectMessage.style.display="block";

        console.log(window.localStorage.getItem('paymentMethod')); 

        paymentSelectMessage.childNodes[1].childNodes[0].innerText = JSON.parse(window.localStorage.getItem('paymentMethod'))['paymentMethod'];


    }
    if(payment == "paypal"){

      
        let  paymentSelectMessage  =  document.getElementById("paymentSelectMessage");

        let  data  =  {"paymentMethod":"paypal"}; 

        window.localStorage.setItem('paymentMethod', JSON.stringify(data));

        Model.paymentMethod =  window.localStorage.getItem('paymentMethod');

        paymentSelectMessage.style.display="block";

        console.log(window.localStorage.getItem('paymentMethod')); 

        paymentSelectMessage.childNodes[1].childNodes[0].innerText = JSON.parse(window.localStorage.getItem('paymentMethod'))['paymentMethod'];
    }
    
}
Controller.recipiantAddOtherRecipient = function(event){
    
    let  x  = document.getElementById("recipiantAddOtherRecipientTable");

    if (x.style.display === "none") {

        x.style.display = "block";

      } else {

        x.style.display = "none";

    }
}
Controller.recipiantNotFoundNumber = function(event){

    let v  = document.getElementById("recipiantNotFoundNumberTable");

    v.style.display = "block";
}
Controller.runRecipient = function(event){
      
      let  selectMessage  =  document.getElementById("selectMessage");

      let  text           =  "Recipient have  been  selected ";

      let  amount  = View.amoutInDallor.value;
      let  amountConverted =  View.amountConverted.value; 
     
     if (View.amoutInDallor.value != null && View.amoutInDallor.value != "" && View.amountConverted.value != null &&  View.amountConverted.value !="" && View.charge.value          != null &&  View.charge.value !=""){      
        
       let  charge  =  document.getElementById("charge");

       console.log("The changing value " +  charge.value); 

       charge.value =  "8.5";

       var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

                if(!isNaN(amount) && !isNaN(View.amountConverted.value) && !isNaN(View.charge.value)){

                                    let _id        =        event.target.attributes[1].nodeValue;
                                    let firstname  =        event.target.attributes[2].nodeValue;
                                    let lastname   =        event.target.attributes[3].nodeValue;
                                    let address    =        event.target.attributes[4].nodeValue;
                                    let contact    =        event.target.attributes[5].nodeValue;
                                    let country    =        event.target.attributes[6].nodeValue;

                                    let senderPhoneNumber      =        event.target.attributes[7].nodeValue;
                                    let recipientPhoneNumber     =        event.target.attributes[8].nodeValue;
                                
                                    let amount =   View.amountConverted.value;

                                    console.log(event.path[0].innerText);

                                    let  name = event.path[0].innerText

                                    event.path[0].style.backgroundColor="blue";

                                    let data  = {

                                                "_id":_id,
                                                "firstname":firstname,
                                                "lastname":lastname,
                                                "address":address,
                                                "contact":contact,
                                                "country":country,
                                                "senderPhoneNumber":senderPhoneNumber,
                                                "recipientPhoneNumber":recipientPhoneNumber,
                                                "amount":amount

                                    } ;

                                    let  buttonState  = {
                                        "click":true
                                    };
                                    
                                    selectMessage.childNodes[0].innerHTML = text; 
                    
                                    selectMessage.style.display    = "block";
                                    selectMessage.style.background = "black";
                                    selectMessage.style.border ="25px";

                                    window.localStorage.setItem('recipient', JSON.stringify(data));
                                
                                    window.localStorage.setItem('buttonState',JSON.stringify(buttonState));

                                    Controller.storeCustomer();

                                    Model.recipientSelectButtonState = window.localStorage.getItem('buttonState');
                                    Model.recipient = window.localStorage.getItem('recipient');
                                    Model.customerState =  window.localStorage.getItem("customer");
                                     
                }else{

                    alert("Please  enter dollar  number amount"); 
                }
                
            }
       };
       xhttp.open("GET", "ajax_info.txt", true);
       xhttp.send();
          

        
           
    }else{

        alert("Dollar  amount is  empty or  one  or  two  fields  is  empty "); 
    }

}
Controller.customerNotFoundNumber = function(){

    let  x  = document.getElementById("found_user_false");

    if (x.style.display === "none") {

        x.style.display = "block";

      } else {

        x.style.display = "none";

      }

    //v.style.display="block";
}
Controller.showAddrecipiant =  function(event){

    //alert("ADD RECIPIANT  HAS  BE  CLICKED ");
}
Controller.insertCustomer = function(event){

    alert("insertCustomer  has  been  clicked yaya ");

    // Customer  table id's 
    let firstname  =  View.inputFirstNameCustomer.value;
    let lastname   =  View.inputLastNameCustomer.value;
    let address    =  View.inputAddressCustomer.value;
    let contact    =  View.inputContactCustomer.value;
    let country    =  View.inputCountryCustomer.value;
    let phone      =  View.inputPhoneNumberCustomer.value; 

    // Customer table  ids ends

    let inputArray  = []; 

    inputArray[0] = firstname; 
    inputArray[1] = lastname; 
    inputArray[2] = address; 
    inputArray[3] = contact; 
    inputArray[4] = country; 
    inputArray[5] = phone; 

    console.log("Save  sender  has been  clicked " +  inputArray[0] + " " + inputArray[1] + " " + inputArray[2] + " " + inputArray[3] + " " + inputArray[4] + " " + inputArray[5]);

    if (firstname.length > 3   &&  lastname.length > 3 &&  address.length > 3 &&  phone.length > 9 && phone.length == 10) {

        if(firstname ==  undefined  &&  lastname == undefined  &&  address == undefined &&  contact == undefined  && country== undefined &&  phone== undefined){

            alert("Input  fields are undefined "); 

        }else{

            alert("correct ");
        }
     
    }else{

        alert("Fields are  Empty or  phone number  is  not   greater  than  9 ")
    }
    
    if(isNaN(inputArray[5])){

        alert("The  phone  filed must be   a   number ");

        return  false
    }

    
    if(Controller.senderLoop(inputArray) == 0){

        alert("The  function  return " +  Controller.senderLoop(inputArray));


        $.ajax({
            type: "POST",
            url: "/insertCustomer",

            data: JSON.stringify({
            "firstname":firstname,
            "lastname":lastname,
            "address":address,
            "contact":contact,
            "country":country,
            "phone":phone
          
            } ),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                console.log(data);
                
            }
        })

        View.phoneInput.value = ""; 
        setInterval(Controller.refreshPage, 1000);
        event.preventDefault(); 
        
    }else{


        alert("One   or  more  fields don't   meet  the requirement ");
    }

}
Controller.addrecipiant =  function(event){

    alert("Hello  addrecipiant"); 
}
Controller.save_reciver =  function(event){

     // sender  table id's 
     let firstname  =  View.inputFirstNameRecipient.value;
     let lastname   =  View.inputLastNameRecipient.value;
     let address    =  View.inputAddressRecipient.value;
     let contact    =  View.inputContactRecipient.value;
     let country    =  View.inputCountryRecipient.value;
     let phone      =  View.inputPhoneNumberRecipient.value; 
     let _id  = View.senderTable.attributes[1].nodeValue
 
     // sender table  ids ends
 
     let inputArray  = []; 
 
     inputArray[0] = firstname; 
     inputArray[1] = lastname; 
     inputArray[2] = address; 
     inputArray[3] = contact; 
     inputArray[4] = country; 
     inputArray[5] = phone; 
     inputArray[6] = _id; 
 
     console.log("Save  sender  has been  clicked " +  inputArray[0] + " " + inputArray[1] + " " + inputArray[2] + " " + inputArray[3] + " " + inputArray[4] + " " + inputArray[5]);
 
     if (firstname.length > 3   &&  lastname.length > 3 &&  address.length > 3 ) {
 
         if(firstname ==  undefined  &&  lastname == undefined  &&  address == undefined &&  contact == undefined  && country== undefined &&  phone== undefined){
 
             alert("Input  fields are undefined "); 
 
         }
      
     }else{
 
         alert("Fields are  Empty ")
     }
     
     if(isNaN(phone)){
 
         alert("The  phone  filed must be   a   number ");
 
         return  false
     }
 
     
    if (Controller.senderLoop(inputArray) == 0 && firstname.length > 3 && lastname.length > 3 && address.length > 3){
 
      
         $.ajax({
             type: "POST",
             url: "/insertRecipient",
 
             data: JSON.stringify({
             "firstname":firstname,
             "lastname":lastname,
             "address":address,
             "contact":contact,
             "country":country,
             "reciverPhoneNumber":phone,
             "_id":_id
           
             } ),
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function (data) {
 
                 console.log(data);
                 
             }
         })
 
         View.phoneInput.value = ""; 
 
         setInterval(Controller.refreshPage, 1000);
         event.preventDefault(); 
         
     }else{
 
         //alert("The  function  return " +  Controller.senderLoop(inputArray));
         alert("One   or  more  fields don't   meet  the requirement ");
     }

}
Controller.clear = function(event){

    if (View.phoneInput !=null){

    
        let value = View.phoneInput.value;

        $.ajax({
            type: "POST",
            url: "/clearSearch",
            data: JSON.stringify({
            "phoneNumber":value,
        
            } ),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                console.log(data);
                
            }
        })


        setInterval(Controller.refreshPage, 1000);

        event.preventDefault(); 

    }else{
        alert("Problem "); 
    }
    
}
Controller.senderLoop  =  function(inputArray){

    let n  = 0; 

    for (let i = 0; i < inputArray.length; i++) {
        
        if(inputArray[i].length == 0){

            n++; 
        }
        
    }

    return  n; 
}
Controller.editSender = function(event){

    // sender  table id's 
    let firstname =  View.inputFirstNameCustomer.value.replace(/\s/g, "");
    let lastname = View.inputLastNameCustomer.value.replace(/\s/g, "");
    let address = View.inputAddressCustomer.value.replace(/\s/g, "");
    let contact = View.inputContactCustomer.value.replace(/\s/g, "");
    let country = View.inputCountryCustomer.value.replace(/\s/g, "");
    let phone = View.inputPhoneNumberCustomer.value.replace(/\s/g, ""); 
    let _id = View.senderTable.attributes[1].nodeValue.replace(/\s/g, "")

    console.log(country);
    // sender table  ids ends

    let inputArray  = []; 

    inputArray[0] = firstname; 
    inputArray[1] = lastname; 
    inputArray[2] = address; 
    inputArray[3] = contact; 
    inputArray[4] = country; 
    inputArray[5] = phone; 
    inputArray[6] = _id; 

    console.log("Save  sender  has been  clicked " +  inputArray[0] + " " + inputArray[1] + " " + inputArray[2] + " " + inputArray[3] + " " + inputArray[4] + " " + inputArray[5]);

    if (firstname.length > 3   &&  lastname.length > 3 &&  address.length > 3 ) {

        if(firstname ==  undefined  &&  lastname == undefined  &&  address == undefined &&  contact == undefined  && country== undefined &&  phone== undefined){

            alert("Input  fields are undefined "); 

        }

    }else{

        alert("Fields are  Empty ")
    }
    
    if(isNaN(phone)){

        alert("The  phone  filed must be   a   number  to  edit  customer or  sender");

        return  false
    }

    
    if(Controller.senderLoop(inputArray) == 0 
    
    
                &&  Controller.checkForSpecialCharacter(firstname) ==  true

                &&  Controller.checkForSpecialCharacter(lastname)  == true

                && Controller.checkForSpecialCharacter(contact) ==    true

                && Controller.checkForSpecialCharacter(country) ==    true

                && Controller.checkPhoneNumber(phone) ==  true
                
                ){


        $.ajax({
            type: "POST",
            url: "/editSender",

            data: JSON.stringify({
            "firstname":firstname,
            "lastname":lastname,
            "address":address,
            "contact":contact,
            "country":country,
            "phone":phone,
            "_id":_id
          
            } ),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                console.log(data);
                
            }
        })

        View.phoneInput.value = ""; 

        setInterval(Controller.refreshPage, 1000);
        event.preventDefault(); 
        
    }else{

        if(Controller.senderLoop(inputArray) != 0 ){

             alert("One   or  more  fields don't   meet  the requirement ");

        }else if(Controller.checkPhoneNumber(phone) ==  false) {
            
            alert("pleas enter a  valiable  phone  number and  phone  number  must  contain 2  sets  of  3  and  one  set  of 4 ");
    
       }else{

        alert("One  or more   fields  have  a   special  character except email  address "); 

       }

    }

    
}
Controller.inputStatus = function(event){

    console.log("Model" + Model.inputStatus);

    Model.inputStatus  =  true; 
}
Controller.validateForm  = function(event) {

   
    
    let  value = View.phoneInput.value;

   

    if(value != "" && !isNaN(value) && value.length > 9 && value.length == 10 &&  value != null){

         

        $.ajax({
            type: "POST",
            url: "/findUser",
            data: JSON.stringify({
            "phoneNumber":value,
          
            } ),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                console.log(data);
                
            }
        })

         
        
        View.phoneInput.value = ""; 

        Model.inputStatus = true; 

        
        setInterval(Controller.refreshPage, 1000);

        View.found_user.style.display ="block";


        event.preventDefault(); 
        
    }else{

        View.found_user.style.display ="block";

        console.log("Customer is  not  found  and  phone  is " + value ); 

        

    }

    
   
    if(value.length  < 10  ){

        alert("Phone  number  is not equal  10"); 

        if(isNaN(value)){

           alert("That is  not  number ");
        }

        
    }
    
}
if( Model.inputStatus == true){

    View.found_user.style = "block"; 
}
Controller.refreshPage = function(){

    location.reload();

    View.found_user.style.display = "block"
}




