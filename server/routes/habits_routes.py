from app import app
from flask import jsonify, request
from crud.habits import create_habit, get_habits_by_user, get_habits_from_db, update_habit, get_habit_by_id, delete_habit_by_id, get_habits_by_habit_log


@app.route('/habits', methods=['POST', 'GET', 'PUT'])
def access_habit():
    if request.method == "POST":
        return create_new_habit()
    if request.method == 'GET':
        return get_all_habits()
    if request.method == 'PUT':
        return update_habits()


def create_new_habit():
    request_body = request.get_json()
    if isinstance(request_body, list):
        for habit_json_obj in request_body:
            habit = Habit(**habit_json_obj)
            create_habit(habit)
    else:
        habit = Habit(**request_body)
        result = create_habit(habit)
    return jsonify(request.get_json())


def get_all_habits():
    habits = get_habits_from_db()
    return jsonify([habit.serialize for habit in habits])


def update_habits():
    request_body = request.get_json()
    if isinstance(request_body, list):
        for habit in request_body:
            if habit["habit_id"] is not None:
                update_habit(habit)
    else:
        result = update_habit(request_body)
    return jsonify(request.get_json())


@app.route('/habits/<habit_id>', methods=['GET', 'DELETE'])
def habit_by_id(habit_id):
    if request.method == 'GET':
        habit = get_habit_by_id(habit_id)
        if habit == None:
            return jsonify(None)
        return jsonify(habit.serialize)
    else:
        delete_habit_by_id(habit_id)
        return jsonify({"success": True})


@app.route('/habits/user/<user_id>')
def habits_by_user_id(user_id):
    habits = get_habits_by_user(user_id)
    return jsonify([habit.serialize for habit in habits])


@app.route('/habits/habit_log/<habit_log_id>')
def habits_by_habit_log_id(habit_log_id):
    habits = get_habits_by_habit_log(habit_log_id)
    return jsonify([habit.serialize for habit in habits])
