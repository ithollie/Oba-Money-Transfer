from tkinter import EXCEPTION
from flask import Flask, render_template, escape, make_response, redirect,session, request,jsonify,json, flash,url_for
import requests
import ssl
import sys
import os
import re
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage
import uuid
import stripe
import logging 
import datetime
import socket
from hashlib import md5
from flask import   jsonify
import  secrets
import string 
from bson.objectid import ObjectId
from common.database import Database
from common.Utils import utils
from RegisterForm.RegisterForm import RegForm as Form
from sendemail.registration_email_sender.registeration_email_sender import Regmail
from models.System_file import File_system
from models.userBlog.userBlog import UserBlog
from models import constants as constants
from models.user.User import Users
from models.customer.Customer import Customer
from models.recipient.recipient import Recipient
from models.requests.Request import  Request
from models.user.User import Users
from models.user.restp import Restp
from models.user import error as UserErrors
from models.flask_wtf.register import RegisterForm
from models.activate.active_account import activate_account

app = Flask(__name__)

stripe_keys = {
  'secret_key': os.environ['STRIPE_SECRET_KEY'],
  'publishable_key': os.environ['STRIPE_PUBLISHABLE_KEY']
}

stripe.api_key = stripe_keys['secret_key']

UPLOAD_FOLDER = os.path.basename('static') + "/uploads"
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.secret_key = os.urandom(24)

@app.before_first_request
def initialize_database():
    Database.initialize()
    
@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html')
    
@app.route('/')
def frontPage():
    return render_template('main.html')

@app.route('/admin_login')
def admin_login():
    return  render_template('payer.html')

@app.route('/payments')
def  payment():
    return   render_template('checkout.html')

@app.route('/addrecipiant')
def addrecipiant():
    return  render_template('addrecipiant.html')

@app.route('/activate')
def activate():
    return render_template('activate.html')

@app.route('/card',  methods=['POST', 'GET'])
def card():
    if request.method == 'POST':

        try:
            email  = request.cookies.get('login_email')

            _id =  uuid.uuid4().hex
            customerId =   request.json['_id']
            cardNumber =  request.json['cardNumber']
            month =   request.json['cardMonth']
            year =   request.json['cardYear']
            code =   request.json['secuirtyCode']

            data =  {"customerId":customerId,   "_id":_id, "number":cardNumber, "month":month, "year":year, "code":code}

            Database.insert("cards",  data); 

            print("Card  has  been  Inserted ")
            return redirect(url_for('welcome' ,  email=email))

        except  Exception as  ex:
            print(ex)

    email  = request.cookies.get('login_email')
    return redirect(url_for('welcome' ,  email=email))

@app.route('/checkout', methods=['POST', 'GET'])
def checkout():

    amount = 500

    customer = stripe.Customer.create(
        email='sample@customer.com',
        source=request.form['stripeToken']
    )

    stripe.Charge.create(
        customer=customer.id,
        amount=amount,
        currency='usd',
        description='Flask Charge'
    )

    return render_template('checkouts.html', amount=amount)

@app.route('/insertCustomer' , methods=['POST', 'GET'])
def insertCustomer():
    if request.method == 'POST':

            firstname = request.get_json()['firstname']
            lastname =  request.get_json()['lastname']
            address =   request.get_json()['address']
            contact =   request.get_json()['contact']
            country = request.get_json()['country']
            phone = request.get_json()['phone']
            email  = request.cookies.get('login_email')

            session['phoneNumber'] =  phone

            customer  = Customer(firstname, lastname ,  address,  contact,  country,  phone, email)

            if  customer.insert(firstname, lastname ,  address,  contact,  country,  phone, email) is True:

                print("Not  a  problem")
                return redirect(url_for('welcome' ,  email=email))

            else:

                print("Problem  inserting   a   customer ")

                return redirect(url_for('login' ,  email=email))

    return redirect(url_for('login'))

@app.route('/insertRecipient' , methods=['POST', 'GET'])
def insertRecipient():

    if request.method == 'POST':

            print("Insert recipient  wow ")
            
            #recipients data 
            firstname = request.get_json()['firstname']
            lastname =  request.get_json()['lastname']
            address =   request.get_json()['address']
            contact =   request.get_json()['contact']
            country = request.get_json()['country']
            
            reciverPhoneNumber = request.get_json()['reciverPhoneNumber']
            SenderPhoneNumber =  session['phoneNumber']

            email  = request.cookies.get('login_email')

            Recipient(firstname, lastname ,  address,  contact,  country,  reciverPhoneNumber,SenderPhoneNumber)

            if  Recipient.insert(firstname, lastname ,  address,  contact,  country, reciverPhoneNumber,SenderPhoneNumber) is True and Recipient.findByPhoneNumber(reciverPhoneNumber)  ==  False:

                return redirect(url_for('welcome' ,  email=email))

            else:

                print("Problem  inserting   a   customer or phone already exists ")

                return redirect(url_for('login' ,  email=email))

    return redirect(url_for('login'))

@app.route('/api')
def api():
    if request.method == 'POST':

        amountInDollar = request.get_json()['amoutInDallor']
        amountConverted = request.get_json()['amountConverted']

        fee =   8.00

        email  = request.cookies.get('login_email')

        baseCurrencyLetter =  "USD"
        convertToCurrencyLetter  ="SLL"

        total =  (amountInDollar + fee)
        
        url = 'https://api.apilayer.com/fixer/convert?to="{{convertToCurrencyLetter}}"&from="{{baseCurrencyLetter}}"&amount=400'

        payload = {}

        headers= {
            "apikey": "FoLzpNufmZOWlGZNvdEEgU1kPwwmQBsN"
        }

        response = requests.request("GET", url, headers=headers, data = payload)

        status_code = response.status_code

        result = response.text

        print(result)
      
    return redirect(url_for('welcome' ,  email=email))

@app.route('/submitPayment' ,  methods=['GET', 'POST'])
def  submitPayment():
    if  request.method == "POST":

            try:    
                    N = 3
                    _id =  uuid.uuid4().hex
                    recipientFirstName  =  request.get_json()['firstname']
                    recipientLasttName  =  request.get_json()['lastname']
                    recipientAddress  =    request.get_json()['address']
                    recipientContact  =    request.get_json()['contact']
                    recipientCountry  =    request.get_json()['country']
                    recipient_id      =    request.get_json()['_id']
                    recipientPhoneNumber  =  request.get_json()['recipientPhoneNumber']
                    senderPhoneNumber  =   request.get_json()['senderPhoneNumber']
                    sentAmount          =  request.get_json()['sentAmount']
                    email  = request.cookies.get('login_email')
                    paymentStatus  = False

                    code = 'AA'.join(secrets.choice(string.ascii_uppercase + string.digits)
                        for i in range(N))

                    _recipient_id = Database.find_one('payments' ,  {"_id":recipient_id})

                
                    if _recipient_id is None:
                        
                        session['customerPhoneNumber'] = senderPhoneNumber

                        Database.insert("payments", {"_id":_id, "recipientFirstName":recipientFirstName,"recipientLastName":recipientLasttName, 
                            
                            "recipientAddress":recipientAddress,"recipientContact":recipientContact,"recipientCountry":recipientCountry,
                            "recipient_id":recipient_id,"recipientPhoneNumber":recipientPhoneNumber,
                            "senderPhoneNumber":senderPhoneNumber,"amount":sentAmount,"code":code, "paymentStatus":paymentStatus
                        })

                        print("recipientFirstName => " + recipientLasttName)

                        return redirect(url_for('welcome' ,  email=email))

                    else:
            
                        return redirect(url_for('welcome' ,  email=email))

            except Exception  as  e:
                print(e)
            
    email  = request.cookies.get('login_email')

    print("Some  thing is  wrong ")

    return redirect(url_for('welcome' ,  email=email))  

@app.route('/updateSession' , methods=['GET', 'POST'])
def updateSession():

    if request.method == 'POST':
        try:

            
            email  = request.cookies.get('login_email')

            customerPhoneNumber =  request.get_json()['customerPhoneNumber']

            if customerPhoneNumber  is not None:

                session['customerPhoneNumber'] = customerPhoneNumber
                
                print("Phone  number of  cutomer")
                print(customerPhoneNumber)

                email  = request.cookies.get('login_email')

                return redirect(url_for('welcome' ,  email=email))

            else:
                print("Error  message on   updateSession ")

                return redirect(url_for('welcome' ,  email=email))


        except Exception  as  ex:

            print(ex)
        
    print("There is a  problem  in  the  updateSession")
    return redirect(url_for('login'))

@app.route('/selectedPayment' , methods=['GET', 'POST'])
def selectedPayment():

    if request.method == 'POST':
        try:
            currentSelectedPaymentId =  request.get_json()['currentSelectedPaymentId']
            
           
            data  =  Database.find_one('payments',  {"_id":currentSelectedPaymentId})
            
            print("Here  I am ")
            
            print(currentSelectedPaymentId)

            print(data)


            if  data is  not None:
                
                session['selectedPaymentId']  = data['_id']
                

                print("Im in")

                print(session['selectedPaymentId'])

            email  = request.cookies.get('login_email')

            return redirect(url_for('welcome' ,  email=email))

        except Exception  as  ex:

            print(ex)
            print("That  is  good ")

    return redirect(url_for('login'))

@app.route('/editSender', methods=['GET', 'POST'])
def editSender():
        
        if request.method == 'POST':

            print("Edit customer ")

            firstname = request.get_json()['firstname']
            lastname =  request.get_json()['lastname']
            address =   request.get_json()['address']
            contact =   request.get_json()['contact']
            country = request.get_json()['country']
            phone = request.get_json()['phone']
            _id   = request.get_json()['_id']

            print("Edit  sender  " +  "firstname => " + firstname)
            print("Edit  sender  " +  "lastname => " + lastname)
            print(_id)

            Database.updates("customers",{"_id":_id},{"$set": {"firstname":firstname}})
            Database.updates("customers",{"_id":_id},{"$set": {"lastname":lastname}})
            Database.updates("customers",{"_id":_id},{"$set": {"address":address}})
            Database.updates("customers",{"_id":_id},{"$set": {"contact":contact}})
            Database.updates("customers",{"_id":_id},{"$set": {"country":country}})
            Database.updates("customers",{"_id":_id},{"$set": {"phone":phone}})

            email  = request.cookies.get('login_email')


            return redirect(url_for('welcome' ,  email=email))

        return redirect(url_for('login'))

@app.route('/findUser' , methods=['GET', 'POST'])
def findUser():

    if  request.method  == 'POST':

        email  = request.cookies.get('login_email')

        phoneNumber = request.get_json()['phoneNumber']

        session['phoneNumber'] =  phoneNumber

        if session['phoneNumber'] ==  phoneNumber:

            session['phoneNumberStatus'] = True

            print("The mobile number is " + phoneNumber + " That is  correct 1") 
            
            database =  Database(); 

            database_phone_number =  database.find_one("customers", {"phone":session['phoneNumber']})
            
            if database_phone_number is not  None:
                
                if database_phone_number['phone'] ==  phoneNumber:

                    print("Found  phone number" +  database_phone_number['phone'])
                    
                    redirect(url_for('welcome', email=email))

            else:
                
                session['display'] = "block"


                return redirect(url_for('welcome' , email=email))
            
    session['phoneNumberStatus'] = False 

    return redirect(url_for('welcome' , email=email))

@app.route('/editeprocess/<string:email>/<string:blogtitle>/<string:blog_id>', methods=('POST', 'GET'))
def editeprocess(email,blogtitle,blog_id):
    editeform = EditeForm()
    loginform = LoginForm()
    database_email = Users.get_by_email(email)["email"]
    if editeform.validate_on_submit() == True and 'user' in session and session['user'] == email and blog_id.__len__() ==  32:
        thins = Users.bytitle(blogtitle)
        ids = Users.id_one(blog_id)["_id"]
        for stuff in thins:
            if stuff['titleblog'] == blogtitle and stuff['email'] == session["user"] and blog_id == ids:
                description = editeform.description.data
                Database.updates("blogs",{"content":stuff['content']},{"$set": {"content":description}})
                return render_template('editemessage.html')
            else:
                redirect(url_for('login_route'))
    flash("these are technical errors please try login again")
    return render_template('login.html',loginform=loginform)

@app.route('/deletePayment', methods=['GET', 'POST'])
def delete():

    if request.method == 'POST':

        try:
            email  = request.cookies.get('login_email')

            payment_id = request.get_json()['payment_id']

            print("payment id ")

            print(payment_id)

            data  =  Database.find_one('payments' , {"_id":payment_id})

            print(data)

            if data['_id'] == payment_id:
                
                print("Pay is  deleted ")

                Database.delete("payments",{"_id":payment_id})
            
                return redirect(url_for('welcome', email=email))
            else:

                print("payment id   is  None")

        except  Exception  as  e:

            print(e)
        
    print("that  is not quite yet")

    return redirect(url_for('welcome', email=request.cookies.get('login_email')))

@app.route('/auth/restpass',methods=['POST','GET'])
def pass_rest():
	if request.method == 'POST':
		email = request.form['email']
		object_file = File_system()
		users_conn =  Restp(email)
		mal = users_conn.checkmliame(email)
		mailer = users_conn.checkmail(mal)

		image = object_file.image(request.form['email'])
		if mailer is not None:
			response = make_response(redirect(url_for('change_user', email=request.form.get('email'),id=image['_id'])))
			response.set_cookie('email',request.form.get('email'))
			return response
		else:
			print("Error message")
	return redirect(url_for('login_route'))

@app.route('/active/account/')
def update_activation_status():
	url = "activate.html"
	routeUrl = Urls()
	return render_template(routeUrl.update_activation_status_url(url))

@app.route('/auth/account/activated/',methods=['POST','GET'])
def activated():
	User_utils = utils()
	loginform =  LoginForm()
	if request.method == 'POST':
		user_password = request.form['password']
		userEmail =  request.form['email']
		active = activate_account(userEmail)
		databaseEmail = active.getEmail(userEmail)
		if user_password and userEmail:

			active.Update(User_utils.check_hash_password(request.form['password'],databaseEmail['password']))
		else:
			return False
	flash("Thank you for activating you account")
	return render_template("login.html", loginform=loginform)
 
@app.route('/changepassword')
def changePassword():
    return  render_template('changepassword.html')
    
@app.route('/login')
def login():
    session.pop('login_email', None)
    return render_template('login.html')

@app.route('/profile')
def profile():
    return redirect(url_for('index'))

@app.route('/register/page')
def register_route():
   regform = Form()
   return render_template('register.html', title='registration', regform=regform)

@app.route('/register')
def register():
   regform = Form()

   response = make_response(redirect(url_for('register_route')))
   response.set_cookie('login_email', "")
   response.set_cookie('login_author', "")
   response.set_cookie('login_id', "")

   return response

@app.route('/picture', methods=['GET','POST'])
def profile_picture():
    if  request.method == 'POST':
        file = request.files['file']
        if file == '':
            print("No file  seleted file")
        if file.filename:
            
            email = request.cookies.get('login_email')
            filename = secure_filename(file.filename)
            
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            Users.save_image(email, filename)
            response = make_response(redirect(url_for('welcome', email=email)))
            response.set_cookie('login_email',request.cookies.get('login_email'))
            response.set_cookie('login_author', request.cookies.get('login_author'))
            response.set_cookie('login_id', request.cookies.get('login_id'))
            return response
        else:
            print("file type not allowed")
    
    return redirect(url_for('welcome'))

@app.route('/clearSearch' ,  methods=['GET', 'POST'])
def clearSearch():

    print("Clear  is  activate ")
    session.pop('phoneNumber', None)

    email  = request.cookies.get('login_email')

    return redirect(url_for('welcome' , email=email))

@app.route('/register/process', methods=['GET', 'POST'])
def register_process():
    
   regform = Form(request.form)
 
   if request.method == 'POST':
       
       image = 'https://www.gravatar.com/avatar/{}?d=identicon&s={}'.format(md5(request.form['email'].lower().encode('utf-8')).hexdigest(), 128)

       f  = request.files['file']

       filename = secure_filename(f.filename)
     
       f.save(os.path.join(os.getcwd() +'/static/uploads/reg', filename))
    
       firstname = request.form['firstname'].lower()
       lastname = request.form['lastname'].lower()
       password = request.form['password'].lower()
       confirm  = request.form['confirm'].lower()
       email = request.form['email'].lower()
       phoneNumber = request.form['phoneNumber'].lower()

       if  Users.get_by_email(request.form['email'].lower()) == False and password == confirm  and phoneNumber.__len__() > 9:

           registeremail  = Regmail(email)

           registeremail.send()

           Users.registration(firstname, lastname , email, password, filename, image=image, phoneNumber=phoneNumber)
           
           flash("You  have  successful login ")

           return redirect(url_for('login'))

       else:

           flash("The user email that you  enter  is  incorrect   or  password  did  not  match or  the  phoneNumber  is less than 10")

           return render_template('register.html', title='register', regform=regform)

   flash("The  application  is  facing some  difficulties in  the  registration please contact an  adminstrator")

   return render_template('register.html', title='register', regform=regform)

@app.route('/changepass', methods=['GET' , 'POST'])
def changepass():
    session.pop('_flashes', None)
    if request.method == 'POST':
        if Users.get_by_email(request.form['email']):
                response = make_response(redirect(url_for('reqs', email=request.form['email'])))
                response.set_cookie('payBit_resetUser_email', request.form['email'])
                return response
    else:
        flash("password is not   change  try   again ")    
        return render_template('login.html')
            
@app.route('/confirm', methods=['GET', 'POST'])
def  passwordChanged():
    if request.method  == 'POST':
        new_password = request.form['new_password']
        confirm_password = request.form['confirm_password']
        print({"firstpass":new_password, "secondpass":confirm_password})
        if  new_password  ==   confirm_password:
            print("They are equal")
            Users.resetPassword(request.cookies.get('payBit_resetUser_email'), Users.passhashed(new_password))
            response = make_response(redirect(url_for('login_route')))
            response.set_cookie('payBit__resetUser_email', "")
            return  response
    return  render_template('login.html')
        
@app.route('/login/process', methods=['GET','POST'])
def login_process():

    session.pop('login_email', None)

    session.pop('_flashes', None)

    error = "There is a problem were you are not successfully logged in"

    if request.method == 'POST':
        try: 
                    email = request.form['email'].lower()
                    password = request.form['password'].lower()
                    
                    data =  Database.find_one(constants.COLLECTION,{"email":email})

                    if Users.login_valid(request.form['email'],request.form['password']) == True  and utils.check_hash_password(password,data['password']) ==  True:
                        
                        session['login_email'] =  request.form['email'].lower()
                        session['login_password'] =  request.form['password'].lower()

                        response = make_response(redirect(url_for('welcome', email=email)))
                        response.set_cookie('login_email', request.form['email'])
                        response.set_cookie('login_author', data['firstname'])
                        response.set_cookie('login_id', data['_id'])
                        return response
                        
                    else:
                        app.logger.warning('incorrect user name (%s)', request .form.get('name') )

                        flash("You are not a valiable  user")

                        render_template('login.html', title='login', error=error)

        except Exception  as  ex:

            print(ex) 
                       
    flash('User  name or  password  not   correct')

    return render_template('login.html', title='login',error=error)
    
@app.route('/payerProcess', methods=['GET','POST'])
def payer_process():
    session.pop('login_email', None)
    session.pop('_flashes', None)

    error = "There is a problem were you are not successfully logged in"

    if request.method == 'POST':
        try: 
                    email = request.form['email'].lower()
                    password = request.form['password'].lower()
                    
                    data =  Database.find_one(constants.COLLECTION,{"email":email})

                    if Users.login_valid(request.form['email'],request.form['password']) != False  and utils.check_hash_password(password,data['password']) ==  True:
                        
                        session['login_email'] =  request.form['email']
                        session['login_password'] =  request.form['password']

                        response = make_response(redirect(url_for('welcome_payer')))
                        response.set_cookie('login_email', request.form['email'])
                        response.set_cookie('login_author', data['firstname'])
                        response.set_cookie('login_id', data['_id'])
                        return response
                        
                    else:
                        print("valid " + Users.login_valid(request.form['email'],request.form['password']))
                        print("password condition " + utils.check_hash_password(password,data['password']))
                        app.logger.warning('incorrect user name (%s)', request .form.get('name') )
                        flash("You are not a valiable  user")
                        render_template('login.html', title='login', error=error)
        except:
            print("An  exception  occured in login  process") 
                       
    flash('User  name or  password  not   correct')

    return render_template('login.html', title='login',error=error)

@app.route('/welcome_payer')
def welcome_payer():
   print("You  are here")
   session.pop('_flashes', None)
   message = "You have  not logged in  please try  again"
   img = "image"

   userInDatabase = Database.find_one("users", {"email": request.cookies.get('login_email')})

   if request.cookies.get('login_email') != "" and userInDatabase  is not None:
            try:
                   
                    
                    date = datetime.datetime.utcnow()
                    item = Database.find_one(constants.COLLECTION,{"email":request.cookies.get('login_email')})
                
                    uploads    = Database.find('myboo', {"useremail":request.cookies.get('login_email')})
                    com_text = Users.text_avaliable(Database.find_one('profileImage', {"useremail":request.cookies.get('login_email')}))
                    if com_text is not  None:
                        com_text = Users.text_avaliable(Database.find_one('profileImage', {"useremail":request.cookies.get('login_email')}))
                    elif com_text is None:
                        com_text =  "nothing here"
                        print(com_text)
                
                    
                    if  request.cookies.get('login_email') != "":
                    
                        postobject = UserBlog(request.cookies.get('login_email'))
                        blogs = postobject.blog_list()

                        print(blogs)

                        
                        pictures     =  Database.find('profileImage',{}).limit(4)
                        
                        saysomething = Database.find(request.cookies.get('login_email')+"saycomment", {'login_email':request.cookies.get('login_email')})
                        youtube    = Database.find_one('users', {"email":request.cookies.get('login_email')})['youtube']
                     
                        postsu     = Database.find(request.cookies.get('login_email')+"_"+"blog_posts", {})
                        comment_posts = Database.find("post_comments", {})
                        videos      = Database.find("videos",  {})
                        
                        
                        
                        
                        length     = Database.find("requests"+request.cookies.get('login_email'), {})
                        
                        messageRe   = Database.find("requests"+request.cookies.get('login_email'), {})
                        requests   = Database.find("requests"+request.cookies.get('login_email'), {})
                        friends    = Users.friends(Database.find("requests"+request.cookies.get('login_email'), {}) ,length)
                        requests = None
                        
                        messages   = Users.messages( Database.find("requests"+request.cookies.get('login_email'),{}) ,length)
                        
                        userblog   = Users.blogs( "blogs" ,item['email'])
                        email      = request.cookies.get('login_email') 
                        user       = Database.find_one('user', {"email":email})
                        
                        todolist = Database.find("todo", {}).limit(2)
                        
                        items = Database.find_one(constants.COLLECTION,{"email":request.cookies.get('login_email')})
                        
                        img = File_system.image(request.cookies.get('login_email'))
                        flash('Login is a success' + " "+ 'welcome' + " "+ request.cookies.get('login_email'))
                        return render_template('adminhtml.html',videos=videos,comment_posts=comment_posts,pictures=pictures,requests=requests, messageRe=messageRe,friends=friends, email=request.cookies.get('login_email'),firstname=items['firstname'],_id=items['_id'],lastname = items['lastname'],date=date, login='true',image=items['image'],blogs=blogs, posts=postsu , userblog=userblog,user=user, Database=Database, youtube=youtube, uploads=uploads, saysomething=saysomething)
                    else:
                        print("it doesnt work")
            except:
               print("An  exception  occured in the welcome")
            
   flash("There is a problem  login  you in")

   return redirect(url_for('login_route'))

@app.route('/welcome/Oba/<string:email>' )
def welcome(email):

   session.pop('_flashes', None)


   print("card  details ")

   userInDatabase = Database.find_one("users", {"email": request.cookies.get('login_email')})

   if request.cookies.get('login_email')  is  not   None and  userInDatabase is not  None:

          

            card     =  Database.find_one("cards" , {"_id":userInDatabase['_id']})

            database_phone_number_data  = None
            customerIsTrue = None 
            display = None
            recipients =  ""
            array = None
            arrayLen = None
            currentSelectedPaymentId =None

            paymentsArray = None

            try:
            
                    com_text = Users.text_avaliable(Database.find_one('profileImage', {"useremail":request.cookies.get('login_email')}))

                    if com_text is not  None:
                        
                        com_text = Users.text_avaliable(Database.find_one('profileImage', {"useremail":request.cookies.get('login_email')}))
                    
                    elif com_text is None:
                        
                        com_text =  "nothing here"
                    

                    if session.get('phoneNumber'):

                        if session['phoneNumber'] is  not  None:

                            array = [] 

                            customerIsTrue  = False; 

                            customer  = Database.find_one("customers", {"phone":session['phoneNumber']})

                            if customer  is  not  None:  

                                database_phone_number_data =  Database.find_one("customers", {"phone":session['phoneNumber']})
                            
                                recipients                 =  Database.find("recipients" , {"SenderPhoneNumber":session['phoneNumber']})

                                customerIsTrue = True

                                for it  in   recipients:

                                    array.append(it)
                        
                                arrayLen  = len(array)

                                display  = "none"
                            else:

                                display  = "block"

                                customerIsTrue  = False; 

                        else:
                            display  = "block"

                            customerIsTrue  = False; 

                            database_phone_number_data = None
                    else:

                        customerIsTrue  = False; 

                        database_phone_number_data  = None

                        display  = "block"

                    com_text = Users.text_avaliable(Database.find_one('profileImage', {"useremail":request.cookies.get('login_email')}))
                    
        
                    if  request.cookies.get('login_email') != "" :
                        
                        currentSelectedPaymentId  =  session.get('selectedPaymentId')
                        customerPhoneNumber       =  session.get('customerPhoneNumber')

                        paymentsArray = []
                        
                        currentSelectPayment =  Database.find_one("payments" ,  {"_id":currentSelectedPaymentId})
                        
                        print(currentSelectedPaymentId)
                        print("current Payment selected is here")
                        print(currentSelectPayment)

                        payments  =  Database.find("payments",{"senderPhoneNumber":customerPhoneNumber})

                        if payments  is  not  None:

                            for i  in   payments:
                                
                                paymentsArray.append(i)
                            
                        paymentArrayLength  = len(paymentsArray)

                        print("Paymet count ")
                        print(paymentArrayLength)

                        print("customer  phone  number " )
                        print(customerPhoneNumber)

                        items = Database.find_one(constants.COLLECTION,{"email":request.cookies.get('login_email')})
                        
                        img = File_system.image(request.cookies.get('login_email'))

                        date = datetime.datetime.utcnow()

                        # login user  data 
                        firstname=items['firstname']
                        lastname = items['lastname']
                        email        =     request.cookies.get('login_email')
                        image       =   items['image']
                        _id=items['_id']
                        #end  of  login  user data

                        flash('Login is a success' + " "+ 'welcome' + " "+ request.cookies.get('login_email'))
                    

                        return render_template('index.html', currentSelectPayment=currentSelectPayment, paymentsArray=paymentsArray,paymentArrayLength=paymentArrayLength, display=display, customerIsTrue=customerIsTrue,arrayLen=arrayLen, array=array, database_phone_number_data=database_phone_number_data, email=email,firstname=firstname,lastname = lastname ,_id=_id,date=date,image=image)
                    
                    else:

                        print("it doesnt work please  try  again ")

            except Exception as  ex:

               print(ex)
            
   flash("There is a problem   please contact an  adminstrtor")

   return redirect(url_for('login'))

@app.route('/logout')
def logout():
    response = make_response(redirect(url_for('out')))
    response.set_cookie('login_email', "",expires=0)
    response.set_cookie('login_author',"",expires=0)
    response.set_cookie('login_id', "",expires=0)
    
    session.pop('phoneNumber', None)

    return  response

@app.route('/outPage')
def  out():
    if request.cookies.get('login_email') is None:
        session.pop('_flashes', None)
        session.pop('login_email',None)
        response = make_response(redirect(url_for('login')))
        response.set_cookie('login_email', "")
        response.set_cookie('login_author', "")
        response.set_cookie('login_id', "")
        return  response
    return redirect(url_for('welcome', email="none"))
    
if __name__== '__main__':
    host = os.getenv('IP','127.0.0.1')
    port = int(os.getenv('PORT',80))
    app.secret_key = '\x0f\xf6\xc7\x11\x9c\xadC\xca\xf8$\xdeb\xde\x8bz \xbb\xcf\x9f\xbcC\xfd1.'
    app.run(host=host,port=port,debug=True)