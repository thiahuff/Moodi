from flask import jsonify, Flask, json
from model import db, User, Habit, Log, connect_to_db
from crud import create_user
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/users', methods=['POST', 'GET'])
def get_user(user):
    create_user(user)

    return True


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host="0.0.0.0")
