import datetime
from flask_sqlalchemy import SQLAlchemy
import uuid


def create_app():
    app = Flask(__name__)
    db.init_app(app)
    return app


db = SQLAlchemy()


class User(db.Model):

    __tablename__ = 'users'

    user_id = db.Column(db.String, primary_key=True)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String)


class Habit(db.Model):

    __tablename__ = 'habits'

    habit_id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    habit_type = db.Column(db.String, nullable=False)
    habit_assertion = db.Column(db.String, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('users.user_id'))
    notes = db.Column(db.String)


class Log(db.Model):

    __tablename__ = 'logs'

    log_id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.user_id'))
    date = db.Column(db.DateTime, nullable=False)


class Habit_Log(db.Model):

    __tablename__ = 'habit_logs'

    habit_log_id = db.Column(db.String, primary_key=True)
    habit_id = db.Column(db.String, db.ForeignKey('habits.habit_id'))
    log_id = db.Column(db.String, db.ForeignKey('logs.log_id'))


def connect_to_db(flask_app, db_uri='postgresql:///moodi', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app

    connect_to_db(app)
