from flask import jsonify, Flask, json, request
from model import db, User, Habit, Log, connect_to_db
from crud import create_user, get_habits_by_user, create_habit, create_log
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross Origin so requests can come from other domains


@app.route('/users', methods=['POST', 'GET'])
def create_new_user():
    user = User(**request.get_json())
    print(user)

    result = create_user(user)
    print(result)

    return jsonify(request.get_json())


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


@app.route('/logs', methods=['POST', 'GET'])
def create_new_log():
    log = Log(**request.get_json())
    result = create_log(log)
    return jsonify({"log_id": result})


@app.route('/habit-logs', methods=['POST', 'GET'])
def add_to_habit_log():
    habit_log = HabitLog(**request.get_json())
    result = create_habit_log(HabitLog)
    return jsonify({"success": True})


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host="0.0.0.0")
