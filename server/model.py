import datetime
from flask_sqlalchemy import SQLAlchemy
import uuid
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database


def create_app():
    app = Flask(__name__)
    db.init_app(app)
    db.create_all()
    print('create_app yay')
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
    display_type = db.Column(db.String, nullable=False)
    habit_type = db.Column(db.String, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('users.user_id'))


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
    habit_value = db.Column(db.String)
    notes = db.Column(db.String)


def connect_to_db(flask_app, db_uri='postgresql:///moodi', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)
    engine = create_engine(
        db_uri, convert_unicode=True)

    if not database_exists(engine.url):
        create_database(engine.url)
        db.create_all(app=flask_app)

    print(database_exists(engine.url))
    print('Connected to the db!')


if __name__ == '__main__':
    from main import app

    connect_to_db(app)
