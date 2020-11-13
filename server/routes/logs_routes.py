from app import app
from crud.logs import create_log, get_logs_from_db, update_log, get_logs_by_user, get_log_by_id, delete_log_by_id


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
    if isinstance(request_body, list):
        for log_json_obj in request_body:
            log = Log(**log_json_obj)
            create_log(log)
    else:
        log = Log(**request_body)
        result = create_log(log)
    return jsonify(request.get_json())


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
