"use strict"
const  Model =  {};
const  View =  {};
const  Controller =  {};


Controller.initialize  =  function(eventObject){

  Model.customerState =  window.localStorage.getItem("customer");
  Model.recipient =     window.localStorage.getItem('recipient');
  Model.recipientSelectButtonState = window.localStorage.getItem('buttonState');

  View.topup = document.getElementById("topup");

  View.data_key_customer_data = document.getElementById("data-key-customer-data");

  View.sendMoneyMainbutton = document.getElementById("sendMoneyMainbutton");
  View.addcard             = document.getElementById("addcard")
  View.cardSubmitButton    = document.getElementById("cardSubmitButton"); 

  View.found_user =  document.getElementById("found_user"); 
  View.senderTable = document.getElementById("senderTable")

  View.addNewCustomer = document.getElementById("addNewCustomer");
  
  View.recipients   = document.querySelectorAll(".recipient");

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
Controller.addcard =  function(){
    
    alert("addcard button  has been  clicked ");

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

     alert("You  are  sending  money ---> "); 

     let  amoutInDallor    = View.amoutInDallor.value; 
     let  amountConverted  = View.amountConverted.value;

    if (amountConverted.length > 3 && amoutInDallor.length > 3 &&  Model.customerState != null &&  Model.recipient !=  null){  
            
           
            if(!isNaN(amountConverted) && !isNaN(amoutInDallor)){

                alert("Everything  is fine "); 

                console.log("CUSTOMER  DATA  "); 
                console.log(Model.customerState);

                console.log("RECIPIENT DATA ");
                console.log(Model.recipient)

                console.log("CLICK DATA ");
                console.log(Model.recipientSelectButtonState);
                
                let  recipient  =  JSON.parse(Model.recipient);
                let  customer   =  JSON.parse(Model.recipient);
                let  buttonState     =  JSON.parse(Model.recipientSelectButtonState);

                if(Model.recipientSelectButtonState != null &&  buttonState['click'] == true){

                        let  recipient  =  JSON.parse(Model.recipient);
                        let  customer   =  JSON.parse(Model.recipient);
                        let  buttonState     =  JSON.parse(Model.recipientSelectButtonState);

                        console.log("Recipient name is " + recipient['firstname']);
                        console.log(buttonState['click']);  

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
                            "recipientPhoneNumber":recipient['recipientPhoneNumber']
                        
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

                        event.preventDefault(); 
                        
                }else{

                        alert("One   or  more  fields don't   meet  the requirement ");
               }
            }else{

                alert("That is  not  a number "); 
            }

    }else{


        alert("Fields are  Empty please  enter dallor amount");
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
Controller.recipiantAddOtherRecipient = function(event){
    
    let  v  = document.getElementById("recipiantAddOtherRecipientTable").style.display= "block";
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

    let  v  = document.getElementById("found_user_false");

    v.style.display="block";
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

    if (firstname.length > 3   &&  lastname.length > 3 &&  address.length > 3 &&  phone.length > 9 ) {

        if(firstname ==  undefined  &&  lastname == undefined  &&  address == undefined &&  contact == undefined  && country== undefined &&  phone== undefined){

            alert("Input  fields are undefined "); 

        }else{

            alert("correct ");
        }
     
    }else{

        alert("Fields are  Empty or  phone number  is  not   greater  than  9 ")
    }
    
    if(isNaN(phone)){

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

        //alert("The  function  return " +  Controller.senderLoop(inputArray));
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

        alert("The  phone  filed must be   a   number ");

        return  false
    }

    
    if(Controller.senderLoop(inputArray) == 0){


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

        //alert("The  function  return " +  Controller.senderLoop(inputArray));
        alert("One   or  more  fields don't   meet  the requirement ");
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
Controller.saysomething = function(event){

    console.log($(".iden")[0].innerText);
    console.log($("#header")[0].attributes[1].value);
    console.log($("#header")[0].attributes[2].value);
    let saysomething_comment = document.getElementById($("#header")[0].attributes[1].value+"_comment").value;
    if (saysomething_comment === '') {
        alert("You must write something!");
    }
    if(saysomething_comment !="" && document.getElementById("ithollie@yahoo.comparagraph") == null){
        
        let saysomething_comment = document.getElementById($("#header")[0].attributes[1].value+"_comment").value;
        
       $.ajax({
              type: "POST",
              url: "/saysomething",
              data: JSON.stringify({
        
              "_user":$(".iden")[0].innerText,
              "_email":$("#header")[0].attributes[1].value, 
              "_id":$("#header")[0].attributes[2].value,
              "_text":saysomething_comment

               
              } ),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function (data) {
                    console.log(data);
              }
          })
        event.preventDefault();
        document.getElementById($("#header")[0].attributes[1].value+"_comment").value = ""
        
        for(let i = 0; i < View.holder.length; i++){
            if (View.holder[i].attributes[1].value == title){   
                View.holder[i].appendChild(li);
                event.target.parentNode.childNodes[1].value ="";
                
           }
       }
    }
    if (saysomething_comment !="" && document.getElementById("ithollie@yahoo.comparagraph").innerHTML !=""){
    
        let saysomething_comment = document.getElementById($("#header")[0].attributes[1].value+"_comment").value;
        document.getElementById("ithollie@yahoo.comparagraph").innerHTML = saysomething_comment;
       $.ajax({
              type: "POST",
              url: "/saysomething",
              data: JSON.stringify({
        
              "_user":$(".iden")[0].innerText,
              "_email":$("#header")[0].attributes[1].value, 
              "_id":$("#header")[0].attributes[2].value,
              "_text":saysomething_comment

               
              } ),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function (data) {
                    console.log(data);
              }
          })
        event.preventDefault();
        document.getElementById($("#header")[0].attributes[1].value+"_comment").value = ""
        for(let i = 0; i < View.holder.length; i++){
            if (View.holder[i].attributes[1].value == title){   
                View.holder[i].appendChild(li);
                event.target.parentNode.childNodes[1].value ="";
                
           }
       }
    }
    
   
    
}


