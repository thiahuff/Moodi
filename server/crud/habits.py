from model import db, Habit


def create_habit(habit_instance):
    """Create and return a new user."""

    db.session.add(habit_instance)
    db.session.commit()

    return True


def get_habits_from_db():
    return db.session.query(Habit).all()


def update_habit(habit):
    db.session.query(Habit).filter(Habit.habit_id ==
                                   habit['habit_id']).update(habit)
    db.session.commit()


def get_habits_by_user(user_id):
    """query for habits by user_id."""
    habits = db.session.query(Habit).filter(Habit.user_id == user_id).all()

    return habits


def get_habit_by_id(habit_id):
    habit = db.session.query(Habit).filter(Habit.habit_id == habit_id).first()
    return habit


def delete_habit_by_id(habit_id):
    db.session.query(Habit).filter_by(habit_id=habit_id).delete()
    db.session.commit()
    return True
