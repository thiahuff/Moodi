from model import db, Log


def create_log(log_instance):
    """Create and return a new user."""

    db.session.add(log_instance)
    db.session.commit()

    return log_instance.log_id


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
