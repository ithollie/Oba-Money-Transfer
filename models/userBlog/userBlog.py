from common.database import Database
from models.user.User  import Users
from  models import  constants 

class UserBlog(object):
    def __init__(self, email):
        self.list  = []
        self.collection  = constants.POSTS
        self.comment_list = []
        self.arraylist  = []
        self.email  =  email

    def blog_list(self):
        posts = Database.find(self.collection, {"email":self.email})
        
        arraylist = []
        for post in posts:
            if posts is not None:
                arraylist.append(post)
        return arraylist

    def comments(self):
         comments = Database.find("post_comments",{})
         comment_list = []

         for comment in comments:
            comment_list.append(comment)

         return comment_list
                        