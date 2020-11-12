@app.route('/habits/<user_id>')
def get_habits_by_user_id(user_id):
    habits = get_habits_by_user(user_id)
    print(habits)
    return jsonify([habit.serialize for habit in habits])


@app.route('/habits', methods=['POST', 'GET'])
def create_new_habit():
    habit = Habit(**request.get_json())
    result = create_habit(habit)
    return jsonify({"success": True})
