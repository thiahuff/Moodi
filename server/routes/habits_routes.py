from app import app
from flask import jsonify, request
from crud.habits import create_habit


@app.route('/habits', methods=['POST', 'GET', 'PUT'])
def access_habit():
    if request.method == "POST":
        return create_new_user()
    # habit = Habit(**request.get_json())
    # result = create_habit(habit)
    # return jsonify({"success": True})


def create_new_habit():
    request_body = request.get_json()
    if isinstance(request_body, list):
        for habit_json_obj in request_body:
            habit = Habit(**habit_json_obj)
            create_habit(habit)
    else:
        habit = Habit(**habit_json_obj)
        result = create_habit(habit)
    return jsonify(request.get_json())


@app.route('/habits/<user_id>')
def habits_by_user_id(user_id):
    habits = get_habits_by_user(user_id)
    print(habits)
    return jsonify([habit.serialize for habit in habits])
