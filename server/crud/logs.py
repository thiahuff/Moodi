from model import db, User, Habit, Habit_Log, Log, connect_to_db


def create_log(log_instance):
    """Create and return a new user."""

    db.session.add(log_instance)
    db.session.commit()

    return log_instance.log_id
