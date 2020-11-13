from model import db, User, Habit, Habit_Log, Log, connect_to_db


def create_habit_log(habit_log_instance):
    """Create and return a new user."""

    db.session.add(habit_log_instance)
    db.session.commit()

    return True


def get_habit_logs_from_db():
    return db.session.query(Habit_Log).all()


def update_habit_log(habit_log):
    db.session.query(Habit_Log).filter(Habit_Log.habit_log_id ==
                                       habit_log['habit_log_id']).update(habit_log)
    db.session.commit()


def get_habit_logs_by_user(user_id):
    """query for habit_logs by user_id."""
    habit_logs = db.session.query(Habit_Log).filter(
        Habit_Log.user_id == user_id).all()

    return habit_logs


def get_habit_log_by_id(habit_log_id):
    habit_log = db.session.query(Habit_Log).filter(
        Habit_Log.habit_log_id == habit_log_id).first()
    return habit_log


def delete_habit_log_by_id(habit_log_id):
    db.session.query(Habit_Log).filter_by(habit_log_id=habit_log_id).delete()
    db.session.commit()
    return True
