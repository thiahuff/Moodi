from model import db, User, Habit, Habit_Log, Log, connect_to_db


def create_user(user_instance):
    """Create and return a new user."""

    db.session.add(user_instance)
    db.session.commit()

    return True


def get_user_by_id(user_id):
    user = db.session.query(User).filter(User.user_id == user_id).first()
    print(user)
    return user


def delete_user_by_id(user_id):
    db.session.query(User).filter_by(user_id=user_id).delete()
    db.session.commit()
    return True


def get_users_from_db():
    return db.session.query(User).all()


def update_user(user):
    db.session.query(User).filter(User.user_id == user['user_id']).update(user)
    db.session.commit()
