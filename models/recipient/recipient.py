from flask import Flask, session
from common.database import Database
from models.admin import *
from  models import constants as UserConstants
from models.System_file import File_system
import  models.user.error as UserErrors
from common.Utils import utils
from sendemail.eul import Emails
import datetime
import uuid


class Recipient(object):
    def __init__(self,firstname, lastname, address, contact, country, reciverPhoneNumber, SenderPhoneNumber,  date=datetime.datetime.utcnow(), _id=None):
        self.firstname =  firstname
        self.lastname  =  lastname
        self.address   =  address
        self.contact   =  contact
        self.country   =  country 
        self.reciverPhoneNumber = reciverPhoneNumber
        self.SenderPhoneNumber  = SenderPhoneNumber
        self.date      =  date
        self._id = uuid.uuid4().hex if _id is None else _id
        
    @classmethod
    def get_by_id(cls,_id):
        data = Database.find_one(UserConstants.COLLECTION,{"_id":_id})
        if data is not None:
            return cls(**data)
        else:
            raise UserErrors.UserNotExistError("user does not exit")

    @staticmethod
    def findByPhoneNumber(phone):
        data = Database.find_one('recipients',{"reciverPhoneNumber":phone})
        if data is not None:

            return True
        else:
            return  False

    @staticmethod
    def get_by_email(email):
        data = Database.find_one(UserConstants.COLLECTION, {"email":email})
        if data is not None:
            if data['email'] == email:
                return True
            else:
                return False
        else:
            return False

  
    @staticmethod
    def login_valid(email,password):
        
        data =  Database.find_one(UserConstants.RECIPIENT_COLLECTION,{"email":email})

        user =  Customer.get_by_email(email)

        if user == True and utils.check_hash_password(password,data['password']) ==  True:
            
            return True

        else:
            return  False
            
    @staticmethod
    def insert(firstname,lastname, address, contact, country, reciverPhoneNumber,SenderPhoneNumber ):
        
        if  firstname != "" and Recipient.findByPhoneNumber(reciverPhoneNumber) == False:
            
            Recipient.save_to_mongo()

            return True

        else:
            return False

    @classmethod
    def passhashed(cls,password):
        if  password is not None:
            return  utils.hash_password(password)

    @staticmethod
    def findByEmail(email):
        Database.find_one(UserConstants.RECIPIENT_COLLECTION,{"email":email})

    @staticmethod
    def login(email):
        session['email'] = email

    @classmethod
    def resetPassword(cls ,email,  hash_password):
        Database.updates(UserConstants.RECIPIENT_COLLECTION,{"email":email}, { "$set": { "password":hash_password }})


    def save_to_mongo(self):
        Database.insert(UserConstants.RECIPIENT_COLLECTION,self.json())


    @classmethod
    def update_image(cls, email, image):
        Database.updates(UserConstants.RECIPIENT_COLLECTION,{"email":email },{"$set":{"image":image}})


    def json(self):
        return {
         "firstname":self.firstname,
         "lastname":self.lastname,
         "address":self.address,
         "contact":self.contact,
         "country":self.country,
         "SenderPhoneNumber":self.SenderPhoneNumber,
         "reciverPhoneNumber":self.reciverPhoneNumber, 
         "_id":self._id,
         "date":self.date
        
        }
# Database.insert("recipients", 
                            # {"firstname":"Muass", 
                            # "lastname":"Thollie" ,
                            # "address":"Blod  street  pa  19033",
                            
                            # "contact":"phone", 
                            # "country":"United States",
                            # "reciverPhoneNumber":"1234567890", 
                            # "SenderPhoneNumber":session['phoneNumber'],
                            #  "id":"2be0cad4de4c460bbd297a3d11a01165",   
                            # "date":"2022-09-22T01:41:32.964+00:00"
                            
                            # })