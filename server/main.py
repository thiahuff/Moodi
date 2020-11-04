from flask import jsonify, Flask, json
from model import db, User, Habit, Log

app = Flask(__name__)


@app.route('/users')
def get_user():
    user_cynthia = User('Cynthia', 'Soffiantini', 'thiahuff')

    return json.dumps(user_cynthia.__dict__)


if __name__ == '__main__':

    app.run(debug=True, host="0.0.0.0")
