from app import app
from model import connect_to_db
from routes import habit_logs, habits, logs, users

if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host="0.0.0.0")
