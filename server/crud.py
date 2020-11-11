from model import db, User, Habit, Habit_Log, Log, connect_to_db
from datetime import datetime


def create_user(user_instance):
    """Create and return a new user."""

    db.session.add(user_instance)
    db.session.commit()

    return True


def create_log(log_instance):
    """Create and return a new user."""

    db.session.add(log_instance)
    db.session.commit()

    return log_instance.log_id


def create_habit(habit_instance):
    """Create and return a new user."""

    db.session.add(habit_instance)
    db.session.commit()

    return True


def create_habit_log(habit_log_instance):
    """Create and return a new user."""

    db.session.add(habit_log_instance)
    db.session.commit()

    return True


def get_habits_by_user(user_id):

    habits = db.session.query(Habit).filter(Habit.user_id == user_id).all()
    # print(habits)
    # for habit in habits:
    #     print(dict(habit))
    return habits

# TODO: Add a try/except
