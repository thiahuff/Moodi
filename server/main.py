from app import app
from model import connect_to_db
from routes import habit_logs_routes, users_routes, habits_routes, logs_routes

if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host="0.0.0.0")
