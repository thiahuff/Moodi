from flask import jsonify, Flask, json, request
from model import db, User, Habit, Log, connect_to_db
from crud import create_user
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross Origin so requests can come from other domains


@app.route('/users', methods=['POST', 'GET'])
def get_user():
    create_user(request.get_json())

    return jsonify(request.get_json())


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host="0.0.0.0")
