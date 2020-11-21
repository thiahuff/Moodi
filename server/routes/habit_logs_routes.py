from app import app
from crud.habit_logs import create_habit_log, get_habit_logs_from_db, update_habit_log, get_habit_logs_by_user, get_habit_log_by_id, delete_habit_log_by_id
from model import Habit_Log
from flask import jsonify, request


@app.route('/habit-logs', methods=['POST', 'GET', 'PUT'])
def access_habit_log():
    if request.method == 'POST':
        return create_new_habit_log()
    if request.method == 'GET':
        return get_all_habit_logs()
    if request.method == 'PUT':
        return update_habit_logs()


def create_new_habit_log():
    request_body = request.get_json()
    if request_body.get("habit_logs") is not None:
        habit_logs = []
        for habit_log_json_obj in request_body["habit_logs"]:
            habit_log = Habit_Log(**habit_log_json_obj)
            result = create_habit_log(habit_log)
            habit_logs.append(result)
        return jsonify([habit_log.serialize for habit_log in habit_logs])
    else:
        habit_log = Habit_Log(**request_body)
        result = create_habit_log(habit_log)
        return jsonify(result.serialize)


def get_all_habit_logs():
    habit_logs = get_habit_logs_from_db()
    return jsonify([habit_log.serialize for habit_log in habit_logs])


def update_habit_logs():
    request_body = request.get_json()
    if request_body.get("habit_logs") is not None:
        for habit_log in request_body["habit_logs"]:
            if habit_log.get("habit_log_id") is not None:
                update_habit_log(habit_log)
            else:
                create_habit_log(Habit_Log(**habit_log))
    else:
        result = update_habit_log(request_body)

    return jsonify(request.get_json())


@ app.route('/habit-logs/user/<user_id>')
def habit_logs_by_user_id(user_id):
    habit_logs = get_habit_logs_by_user(user_id)
    return jsonify([habit_log.serialize for habit_log in habit_logs])


@ app.route('/habit-logs/<habit_log_id>', methods=['GET', 'DELETE'])
def habit_log_by_id(habit_log_id):
    if request.method == 'GET':
        habit_log = get_habit_log_by_id(habit_log_id)
        if habit_log == None:
            return jsonify(None)
        return jsonify(habit_log.serialize)
    else:
        delete_habit_log_by_id(habit_log_id)
        return jsonify({"success": True})
