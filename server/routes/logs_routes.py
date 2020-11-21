from app import app
from crud.logs import create_log, get_logs_from_db, update_log, get_logs_by_user, get_log_by_id, delete_log_by_id, get_log_by_user_and_date
from model import Log
from flask import jsonify, request


@app.route('/logs', methods=['POST', 'GET', 'PUT'])
def access_logs():
    if request.method == 'POST':
        return create_new_log()
    if request.method == 'GET':
        return get_all_logs()
    if request.method == 'PUT':
        return update_logs()


def create_new_log():
    request_body = request.get_json()
    if request_body.get("logs") is not None:
        logs = []
        for log_json_obj in request_body["logs"]:
            log = Log(**log_json_obj)
            result = create_log(log)
            logs.append(result)
        return jsonify([log.serialize for log in logs])
    else:
        log = Log(**request_body)
        result = create_log(log)
        return jsonify(result.serialize)


def get_all_logs():
    logs = get_logs_from_db()
    return jsonify([log.serialize for log in logs])


def update_logs():
    request_body = request.get_json()
    if isinstance(request_body, list):
        for log in request_body:
            if log["log_id"] is not None:
                update_log(log)
    else:
        result = update_log(request_body)

    return jsonify(request.get_json())


@app.route('/logs/user/<user_id>')
def logs_by_user_id(user_id):
    logs = get_logs_by_user(user_id)
    return jsonify([log.serialize for log in logs])


@app.route('/logs/user/<user_id>/<date>')
def log_by_user_id_and_date(user_id, date):
    log = get_log_by_user_and_date(user_id, date)
    if log is None:
        return jsonify(None)
    return jsonify(log.serialize)


@app.route('/logs/<log_id>', methods=['GET', 'DELETE'])
def log_by_id(log_id):
    if request.method == 'GET':
        log = get_log_by_id(log_id)
        if log == None:
            return jsonify(None)
        return jsonify(log.serialize)
    else:
        delete_log_by_id(log_id)
        return jsonify({"success": True})
