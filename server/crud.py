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

    return True


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


# TODO: Add a try/except
