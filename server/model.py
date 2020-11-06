import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):

    __tablename__ = 'users'

    user_id = db.Column(UUID(as_uuid=True), primary_key=True,
                        server_default=sqlalchemy.text("uuid_generate_v4()"),)

    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String)




class Habit(db.Model):

    __tablename__ = 'habits'

    habit_id = db.Column(UUID(as_uuid=True), primary_key=True,
                         server_default=sqlalchemy.text("uuid_generate_v4()"),)

    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    habit_type = db.Column(db.String, nullable=False)
    habit_assertion = db.Column(db.String, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('users.user_id'))
    notes = db.Column(db.TextField)


class Log(db.Model):

    __tablename__ = 'logs'

    log_id = db.Column(UUID(as_uuid=True), primary_key=True,
                       server_default=sqlalchemy.text("uuid_generate_v4()"),)

    user_id = db.Column(db.String, db.ForeignKey('users.user_id'))
    date = db.Column(db.datetime, nullable=False)


class Habit_Log(db.Model):

    __tablename__ = 'habit_logs'

    habit_log_id = db.Column(UUID(as_uuid=True), primary_key=True,
                             server_default=sqlalchemy.text("uuid_generate_v4()"),)

    habit_id = db.Column(db.String, db.ForeignKey('habits.habit_id'))
    log_id = db.Column(db.String, db.ForeignKey('logs.log_id'))
