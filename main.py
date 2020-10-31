from flask import jsonify, Flask, json

app = Flask(__name__)

# TODO: move back to user.py and import


class User():

    def __init__(self, fname, lname, email):

        self.fname = fname

        self.lname = lname
        self.email = email

    def __repr__(self):
        return f"<User's first name is {self.fname}, last name is {self.lname}, and email is {self.email}.>"


@app.route('/users')
def get_user():
    user_cynthia = User('Cynthia', 'Soffiantini', 'thiahuff')

    return json.dumps(user_cynthia.__dict__)


if __name__ == '__main__':

    app.run(debug=True, host="0.0.0.0")
