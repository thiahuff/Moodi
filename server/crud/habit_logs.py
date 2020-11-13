from model import db, User, Habit, Habit_Log, Log, connect_to_db


def create_habit_log(habit_log_instance):
    """Create and return a new user."""

    db.session.add(habit_log_instance)
    db.session.commit()

    return True
