import datetime
from flask_sqlalchemy import SQLAlchemy
import uuid
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.dialects.postgresql import UUID
from flask_sqlalchemy import SQLAlchemy
import uuid


def create_app():
    app = Flask(__name__)
    db.init_app(app)
    db.create_all()
    print('create_app yay')
    return app


db = SQLAlchemy()


class User(db.Model):

    __tablename__ = 'users'

    user_id = db.Column(
        UUID(as_uuid=True), primary_key=True, unique=True, nullable=False)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'user_id': self.user_id,
            'fname': self.fname,
            'lname': self.lname,
            'email': self.email,
            'profile_pic': self.profile_pic
        }


class Habit(db.Model):

    __tablename__ = 'habits'

    habit_id = db.Column(UUID(as_uuid=True), primary_key=True,
                         default=uuid.uuid4, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    display_type = db.Column(db.String, nullable=False)
    habit_type = db.Column(db.String, nullable=False)
    user_id = db.Column(db.ForeignKey('users.user_id'))

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'habit_id': self.habit_id,
            'name': self.name,
            'description': self.description,
            'display_type': self.display_type,
            'habit_type': self.habit_type,
            'user_id': self.user_id
        }


class Log(db.Model):

    __tablename__ = 'logs'

    log_id = db.Column(UUID(as_uuid=True), primary_key=True,
                       default=uuid.uuid4, unique=True, nullable=False)
    user_id = db.Column(db.ForeignKey('users.user_id'))
    date = db.Column(db.DateTime, nullable=False)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'log_id': self.log_id,
            'user_id': self.user_id,
            'date': self.date,
        }


class Habit_Log(db.Model):

    __tablename__ = 'habit_logs'

    habit_log_id = db.Column(UUID(as_uuid=True), primary_key=True,
                             default=uuid.uuid4, unique=True, nullable=False)
    habit_id = db.Column(db.ForeignKey('habits.habit_id'))
    log_id = db.Column(db.ForeignKey('logs.log_id'))
    habit_value = db.Column(db.String)
    notes = db.Column(db.String)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'habit_log_id': self.habit_log_id,
            'habit_id': self.habit_id,
            'log_id': self.log_id,
            'habit_value': self.habit_value,
            'notes': self.notes,
        }


def connect_to_db(flask_app, db_uri='postgresql:///moodi', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)
    # db.drop_all(app=flask_app)
    # uncomment line above and move create_all() out of the "if not" to drop db and start over
    engine = create_engine(
        db_uri, convert_unicode=True)

    if not database_exists(engine.url):
        create_database(engine.url)
        db.create_all(app=flask_app)

    print(database_exists(engine.url))
    print('Connected to the db!')


if __name__ == '__main__':
    from app import app

    connect_to_db(app)
