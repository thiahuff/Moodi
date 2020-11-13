from app import app


@app.route('/habit-logs', methods=['POST', 'GET'])
def add_to_habit_log():
    habit_log = HabitLog(**request.get_json())
    result = create_habit_log(HabitLog)
    return jsonify({"success": True})
