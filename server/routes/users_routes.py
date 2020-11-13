from app import app
from flask import jsonify, request
from crud.users import get_user_by_id, create_user, delete_user_by_id, get_users_from_db, update_user
from model import User


@app.route('/users', methods=['POST', 'GET', 'PUT'])
def access_users():
    if request.method == "POST":
        return create_new_user()
    if request.method == "GET":
        return get_all_users()
    if request.method == "PUT":
        return update_users()


def create_new_user():
    request_body = request.get_json()
    if isinstance(request_body, list):
        for user_json_obj in request_body:
            user = User(**user_json_obj)
            create_user(user)
    else:
        user = User(**request_body)
        result = create_user(user)
    return jsonify(request.get_json())


def get_all_users():
    users = get_users_from_db()
    return jsonify([user.serialize for user in users])


def update_users():
    request_body = request.get_json()
    if isinstance(request_body, list):
        for user_json_obj in request_body:
            user = User(**user_json_obj)
            if user.user_id is not None:
                update_user(user)
    else:
        user = User(**request_body)
        result = update_user(request_body)
    return jsonify(request.get_json())


"""get by user"""


@app.route('/users/<user_id>', methods=['GET', 'DELETE'])
def user_by_id(user_id):
    if request.method == 'GET':
        user = get_user_by_id(user_id)
        if user == None:
            return jsonify(None)
        return jsonify(user.serialize)
    else:
        delete_user_by_id(user_id)
        return jsonify({"success": True})
