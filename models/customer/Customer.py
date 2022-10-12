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


class Customer(object):
    def __init__(self,firstname, lastname, address, contact, country, phone, email, date=datetime.datetime.utcnow(), _id=None):
        self.email     =  email
        self.firstname =  firstname
        self.lastname  =  lastname
        self.address   =  address
        self.contact   =  contact
        self.country   =  country 
        self.phone     =  phone
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
        
        data =  Database.find_one(UserConstants.COLLECTION,{"email":email})

        user =  Customer.get_by_email(email)

        if user == True and utils.check_hash_password(password,data['password']) ==  True:
            
            return True

        else:
            return  False
            
    @classmethod
    def insert(cls,firstname, lastname, address, contact, country, phone,  email ):
        if  firstname:
            new_user = cls(firstname, lastname, address, contact, country, phone,  email)
            new_user.save_to_mongo()

            return True

        else:
            return False

    @classmethod
    def passhashed(cls,password):
        if  password is not None:
            return  utils.hash_password(password)

    @staticmethod
    def findByEmail(email):
        Database.find_one(UserConstants.COLLECTION,{"email":email})

    @staticmethod
    def login(email):
        session['email'] = email

    @classmethod
    def resetPassword(cls ,email,  hash_password):
        Database.updates(UserConstants.COLLECTION,{"email":email}, { "$set": { "password":hash_password }})


    def save_to_mongo(self):
        Database.insert(UserConstants.CUSTOMER_COLLECTION,self.json())


    @classmethod
    def update_image(cls, email, image):
        Database.updates(UserConstants.COLLECTION,{"email":email },{"$set":{"image":image}})


    def json(self):
        return {
         "email":self.email, 
         "firstname":self.firstname,
         "lastname":self.lastname,
         "address":self.address,
         "contact":self.contact,
         "country":self.country,
         "phone":self.phone,
         "_id":self._id,
         "date":self.date
        
        }
