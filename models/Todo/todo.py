from common.database  import Database
from models.user.User import Users
from  sendemail.eul import Emails

class Todo(object):
    
    database_collection = "todo"
    databaseClassName   = "Database"
    userClassName       = "Users"
    
    def __init__(self,todoname=None, photo=None, description=None, login_email=None):
        self.todoname = todoname
        self.photo    = photo
        self.description = description
        self.login_email = login_email
        
    def  find_by_email(self, name=None):
        data = Database.find_one(Todo.database_collection, {"todoname":name})
        if name and  data is not None:
            return True
        else:
            return False
            
    def save_mongodb(self):
        if  Todo.database_collection  is not None:
            Database.insert(self.database_collection, self.save())
            
    def save(self):
        return {
            "todoname":self.todoname,
            "description":self.description,
            "photo":self.photo,
            "email":self.login_email
        }
    def checkName(self):
        if self.todoname is not None and  self.todoname.__len__() > 0:
            return True
        else:
            return False
        
    def descriptionfun(self):
        if self.description  is  not  None and self.description.__len__() > 4:
            return  True
        else:
            return False