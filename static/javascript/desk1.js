"use strict"
const  Model =  {};
const  View =  {};
const  Controller =  {};

Model.recipientSelectButtonState = window.localStorage.getItem('buttonState');
Model.paymentMethod  =      window.localStorage.getItem('paymentMethod');
Model.selectCountry        = window.localStorage.getItem('selectCountry');
Model.addCard              = window.localStorage.getItem('card');
Model.updateState          = window.localStorage.getItem('updateState');
Model.search               = window.localStorage.getItem('search');


Controller.initialize  =  function(eventObject){


  Model.customerState =  window.localStorage.getItem("customer");
  Model.recipient =     window.localStorage.getItem('recipient');

  View.sentPayment   = document.getElementById("sentPayment");
  View.editcustomer  = document.getElementById("editcustomer");

  View.borderline    = document.getElementById("borderline");
  
  View.deletePayment = document.getElementById("deletePayment"); 
  View.deletecard    = document.getElementById("deletecard");

  View.editPayment   = document.getElementById("editPayment")
  View.pausePayment  = document.getElementById("pausePayment")

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
 
  if(View.borderline != null){

    View.borderline.addEventListener('click',  function(){
        
  
        let sendMoney  = document.getElementById("sendMoney");

        if (sendMoney.style.display === "none") {
    
            sendMoney.style.display = "block";
    
        } else {
    
            sendMoney.style.display = "none";
    
        }
        
    });
  }

  if( View.deletecard  != null){

    View.deletecard.addEventListener('click', function(){

        alert("Delete  card ");

        let  customer_id  =  document.getElementById("deletecard").attributes[1].nodeValue;

        console.log(customer_id); 

        $.ajax({
            type: "POST",
            url: "/deleteCard",
            data: JSON.stringify({
            "customer_card_id":customer_id,
          
            } ),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
    
                console.log(data);
                
            }
        })

        Controller.refreshPage();


    })

  }
  if(View.pausePayment != null){

    View.pausePayment.addEventListener('click',  function(event){

        let  id = event.target.attributes[1].value;

        console.log("CURRENT PAYMENT ID  = " + id);
         
         alert("pause Payment");

         $.ajax({
             type: "POST",
             url: "/pausePayment",
             data: JSON.stringify({
             "_id":id,
           
             } ),
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function (data) {
     
                 console.log(data);
                 
             }
         })

         //Controller.refreshPage();

     });
  }

  if(View.deletePayment !=null){

    View.deletePayment.addEventListener('click',  function(event){

           let  id = event.target.attributes[1].value;

           console.log("CURRENT  ID  = " + id);
            
            alert("deletePayment");

            $.ajax({
                type: "POST",
                url: "/deletePayment",
                data: JSON.stringify({
                "payment_id":id,
              
                } ),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
        
                    console.log(data);
                    
                }
            })

            Controller.refreshPage();

    });
  }

  if(View.editPayment !=null){

    View.deletePayment.addEventListener('click',  function(event){

        let  id = event.target.attributes[1].value;

        console.log("CURRENT  ID  = " + id);
         
         alert("edit Payment");

         $.ajax({
             type: "POST",
             url: "/editPayment",
             data: JSON.stringify({
             "payment_id":id,
           
             } ),
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function (data) {
     
                 console.log(data);
                 
             }
         })

         Controller.refreshPage();

     });

  }
  
  if(View.topup != null){

    View.topup.addEventListener('click',  function(event){

        let  x = event.target.attributes[0];

        let topUpInput   = document.getElementById("topUpInput"); 

        let mainInput   =  document.getElementById("put");

        if (topUpInput.style.display === "none") {
    
            topUpInput.style.display = "block";
            mainInput.style.display= "none";
    
        } else {
    
            topUpInput.style.display = "none";
            mainInput.style.display="block";
    
        }
        
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

  }else{

    console.log(View.insertCustomer ==  null); 
  }
  
  if(View.save_reciver != null ){

      View.save_reciver.addEventListener('click', Controller.save_reciver);
  }

  if(View.addrecipiant != null){

     View.addrecipiant.addEventListener('click', Controller.showAddrecipiant);
  }

 if(Model.search == null){

    View.search.addEventListener('click', Controller.customerState);

  }else{

    alert(View.search == null &&  Model.search == null);

  }

 if(View.search !=  null  &&   View.search.attributes['data-key'] != null){

    View.search.addEventListener('click', Controller.customerIsNoTAvaliable);

 }
 if(View.search !=  null &&   View.search.attributes['data-key'] != null){

    View.search.addEventListener('keyup', Controller.customerIsNoTAvaliable);

 }

 if(View.sentPayment != null){

    let  currentSent  = document.getElementById("currentSent");

    View.sentPayment.addEventListener('mouseover',  function(event){

        currentSent.style.display="block";

    });
 }

 if(View.editcustomer !=null){

    View.editcustomer.addEventListener('click',  function(){


        let senderTable  = document.getElementById("senderTable");

        let save_sender =  document.getElementById("save_sender");


        if (senderTable.style.display === "none" && save_sender.style.display === "none") {

    
            senderTable.style.display = "block";
            save_sender.style.display = "inline-block"
            
    
        } else {
    
            senderTable.style.display = "none";
            save_sender.style.display = "none";
    
        }

    });
 }

if(View.save_sender !=  null){

    View.save_sender.addEventListener('click' ,  Controller.editSender);

}
  
View.clear.addEventListener('click', function(){

    alert("Clear  is  not  functional"); 
});

if(Model.search !=null){
    
    if(JSON.parse(Model.search)['search'] ==  true){

        View.clear.addEventListener('click', Controller.clear);

        

    }else{

        alert("It  is clear ");
    }

}

if(View.search != null){

      View.search.addEventListener('keyup' , Controller.validateForm);
  
}
Controller.selectRecipient();
Controller.paymentMethod();
Controller.selectOption();
Controller.selectOptionPayments();
Controller.updateSession();
Controller.myfunction();

$("#amoutInDallor").on("keyup", function (e){

    let amount  =  document.getElementById("amoutInDallor");

    Controller.apiResult(amount.value, "USD",  "SLL");

});
   
}

Controller.myfunction =  function(){

    let signal  =  document.getElementById("signal"); 

    let  array  = ["red", "yellow" ,  "blue"]

    let  i  =  -1

    if(signal !=  null){

        if(i <=3){

            

            setInterval(function(event){

                

                    i=i+1
                    
                    console.log(i);

                    console.log(array[i]);
                
                    signal.style.backgroundColor = array[i];
            
                    if(i == 2){

                        i = -1

                    }

            }, 5000);
        }
    }

        
       

    

}

Controller.updateSession =  function(){


    let  x  =  document.querySelectorAll("#inputPhoneNumberCustomer");

    let  p = null;

    window.localStorage.setItem('updateState',{"updateState":true});

    Model.updateState = window.localStorage.getItem('updateState');

    if(Model.updateState ==  true){

        if(x  !=null  &&  x != undefined){

            if(x  !=null){
    
                for(let  i = 0; i  < 1;  i++){
    
    
                    if(x[i] != undefined){
    
                        p  =  x[i].attributes.value.nodeValue
    
                        
                    }
    
                }
            }
        }

        if(p != null){

            $.ajax({
          type: "POST",
          url: "/updateSession",
          data: JSON.stringify({
          "customerPhoneNumber":p,
        
          } ),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (data) {
  
              console.log(data);
              
          }
      })
  
      setInterval(Controller.update, 1000);
      }
    }
       


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

    let  email = document.getElementById("cardform").attributes[1].nodeValue;

    let  cardNumber = document.getElementById("cardNumber").value; 

    let  cardMonth = document.getElementById("cardMonth").value; 

    let  cardYear = document.getElementById("cardYear").value; 

    let  secuirtyCode = document.getElementById("securityCode").value; 

    let carMessage  = document.getElementById("cardMessage");

    let formCard        = document.getElementById("cardform"); 

    let paymentMessage  = document.getElementById("paymentMessageSpan"); 

    let _id        =  View.inputFirstNameCustomer.attributes[1].nodeValue;

    let data  =  {"cardNumber":cardNumber,"cardMonth":cardMonth, "cardYear":cardYear, "secuirtyCode":secuirtyCode};

    if(cardMonth.replace(/\s/g, "") != "", cardNumber.replace(/\s/g, "") !=  "" , cardYear.replace(/\s/g, "") !=  "",  secuirtyCode.replace(/\s/g, "") !="" ){
            
            if(!isNaN(cardNumber) && !isNaN(cardMonth) &&  !isNaN(cardYear) &&  !isNaN(secuirtyCode)){

                if((cardYear.length == 4  &&  cardYear > 2021)  &&  (cardMonth != 0 &&  (cardMonth.length == 1 || cardMonth.length == 2)) &&  cardNumber.length ==  16 &&  secuirtyCode.length == 3 ){

                    console.log(data);

                    console.log("Customer  email = " + email );

                    paymentMessage.style.color = "red";

                    formCard.style.display  = "none";

                    carMessage.style.display = "block";
                    
                    $.ajax({

                        type: "POST",
                        url: "/card",

                        data: JSON.stringify({
                        "_id":_id,
                        "customerEmail":email,
                        "cardNumber":cardNumber,
                        "cardMonth":cardMonth,
                        "cardYear":cardYear,
                        "secuirtyCode":secuirtyCode
                        
                        } ),

                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {

                            console.log(data);
                            
                        }
                    })

                    setInterval(Controller.refreshPage, 1000);
                }else{

                    alert("Check  the length  of   the  inputs "); 
                }

            }
            else{

                alert("One  or  more fields  is  not a  number  ");    
            }
    }else{

        alert("One  or  more fields  is  empty ");
    }

   




}
Controller.addcard =  function(event){


    let submitButton  = document.getElementById("cardSubmitButton");

    let  x  = document.getElementById("cardform");
    
    if (x.style.display === "none") {
    
            x.style.display = "block";
    
    } else {
    
            x.style.display = "none";
    
    }
    
    

}
Controller.checkPhoneNumber =  function(phone){

    let  phoneNumber  =  phone.toString(phone);

    if (phone) {

        if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone) == false) {

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
Controller.customerState =  function(event){

    if(Model.search == null){

        window.localStorage.setItem('search', JSON.stringify({"search":true})); 

        Model.search  =  window.localStorage.getItem('search');

        if(JSON.parse(Model.search)['search']  == true &&  View.phoneInput.value != undefined &&  View.phoneInput.value !=""){

            Controller.validateForm();

        }else{

            alert("Input  field is  empty please  enter  a   valiable phone number "); 
        }


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

                let  customer_id   =    View.inputFirstNameCustomer.attributes[1].nodeValue;
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
                            "customer_id":customer_id,
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
    let  card  =  document.getElementById("paymentMessage").attributes[1].nodeValue;

    if(payment == "card" ){

        if(card !="None"){

           let  paymentSelectMessage  =  document.getElementById("paymentSelectMessage");

            let  data  =  {"paymentMethod":"card"}; 

            window.localStorage.setItem('paymentMethod', JSON.stringify(data));

            Model.paymentMethod =  window.localStorage.getItem('paymentMethod');

            paymentSelectMessage.style.display="block";

            console.log(window.localStorage.getItem('paymentMethod')); 

            paymentSelectMessage.childNodes[1].childNodes[0].innerText = JSON.parse(window.localStorage.getItem('paymentMethod'))['paymentMethod']; 

        }else{

            alert("Please  enter card payment  information  to  continue "); 

            let  x  =  document.getElementById("cardform");

            x.style.display = "block";

        }
    
        

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

    let  x  = document.getElementById("found_false");

    if (x.style.display === "none") {

        x.style.display = "block";

      } else {

        x.style.display = "none";

      }
}
Controller.showAddrecipiant =  function(event){

    //alert("ADD RECIPIANT  HAS  BE  CLICKED ");
}
Controller.insertCustomer = function(event){

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

        //alert("The  function  return " +  Controller.senderLoop(inputArray));


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

        window.localStorage.removeItem('search');
        
        Model.search = window.localStorage.getItem('search');

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
    let _id = View.senderTable.attributes[2].nodeValue;

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

    if (firstname.length > 3   &&  lastname.length > 3 &&  address.length > 3 && phone.length == 10 ) {

        if(firstname ==  undefined  &&  lastname == undefined  &&  address == undefined &&  contact == undefined  && country== undefined &&  phone== undefined){

            alert("Input  fields are undefined "); 

        }else{

             
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

    }else{

        if(phone.length != 10){

            alert("Phone is not equal  to  10");
        }

        if(firstname.length < 3){

            alert("first  name  must be  greater  than 3");
        }
        

        
        if(lastname.length < 3){

            alert("lastname  must be  greater  than 3");
        }
    }
    
    if(isNaN(phone)){

        alert("The  phone  filed must be   a   number  to  edit  customer or  sender");

        return  false
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

        Controller.clear();

        

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

Controller.update = function(){


    if(JSON.parse(Model.updateState)['updateState'] ==  true){


        window.localStorage.removeItem("updateState");

        window.localStorage.setItem('updateState', JSON.stringify({"updateState":false}));

        Model.updateState =  window.localStorage.getItem('updateState');

        window.location.reload();
        
    }



}
Controller.refreshPage = function(){

    location.reload();

    View.found_user.style.display = "block"
}




