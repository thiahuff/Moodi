from model import db, Log
from sqlalchemy import asc, extract, cast, Date
from dateutil.parser import *


def create_log(log_instance):
    """Create and return a new user."""
    existing_log = get_log_by_user_and_date(
        log_instance.user_id, log_instance.date)
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


def get_logs_by_user(user_id, start_date, end_date):
    """query for logs by user_id."""
    if start_date == None or end_date == None:
        logs = db.session.query(Log).filter(
            Log.user_id == user_id).order_by(Log.date).all()
        return logs
    else:
        start_date = parse(start_date)
        end_date = parse(end_date)
        logs = db.session.query(Log).filter(
            Log.user_id == user_id,
            cast(Log.date, Date) >= start_date,
            cast(Log.date, Date) <= end_date
        ).order_by(Log.date).all()

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
    # Convert date string to datetime python object
    date_to_query = parse(date)

    # Query based on date and user
    log = db.session.query(Log).filter(
        Log.user_id == user_id, extract(
            'month', Log.date) == date_to_query.month,
        extract('year', Log.date) == date_to_query.year,
        extract('day', Log.date) == date_to_query.day).first()

    return log
