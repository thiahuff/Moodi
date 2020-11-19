from model import db, Log


def create_log(log_instance):
    """Create and return a new user."""
    existing_log = db.session.query(Log).filter(
        Log.user_id == log_instance.user_id, Log.date == log_instance.date).first()
    print(existing_log)
    if existing_log is not None:
        print("log already exists!")
        existing_log.mood_value = log_instance.mood_value
        db.session.commit()
        return existing_log

    else:
        db.session.add(log_instance)
        db.session.commit()

        return log_instance


def get_logs_from_db():
    return db.session.query(Log).all()


def update_log(log):
    db.session.query(Log).filter(Log.log_id ==
                                 log['log_id']).update(log)
    db.session.commit()


def get_logs_by_user(user_id):
    """query for logs by user_id."""
    logs = db.session.query(Log).filter(Log.user_id == user_id).all()

    return logs


def get_log_by_id(log_id):
    log = db.session.query(Log).filter(Log.log_id == log_id).first()
    return log


def delete_log_by_id(log_id):
    db.session.query(Log).filter_by(log_id=log_id).delete()
    db.session.commit()
    return True


def get_log_by_user_and_date(user_id, date):
    """query for logs by user_id and date."""
    log = db.session.query(Log).filter(
        Log.user_id == user_id, Log.date == date).first()

    return log
