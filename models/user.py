class User():

    def __init__(self, fname, lname, email):

        self.fname = fname
        self.lname = lname
        self.email = email

    def __repr__(self):
        return f"<User's first name is {self.fname}, last name is {self.lname}, and email is {self.email}.>"
