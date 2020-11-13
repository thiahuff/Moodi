from app import app


@app.route('/logs', methods=['POST', 'GET'])
def create_new_log():
    log = Log(**request.get_json())
    result = create_log(log)
    return jsonify({"log_id": result})
