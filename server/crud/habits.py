from model import db, User, Habit, Habit_Log, Log, connect_to_db


def create_habit(habit_instance):
    """Create and return a new user."""

    db.session.add(habit_instance)
    db.session.commit()

    return True


def get_habits_by_user(user_id):
    """query for habits by user_id."""
    habits = db.session.query(Habit).filter(Habit.user_id == user_id).all()

    return habits
