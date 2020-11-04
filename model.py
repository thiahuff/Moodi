class User(db.Model):

    __tablename__ = 'users'

    user_id = db.Column(UUID(as_uuid=True), primary_key=True,
                        server_default=sqlalchemy.text("uuid_generate_v4()"),)

    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String)

    def __repr__(self):
        return f"<User's first name is {self.fname}, last name is {self.lname}, and email is {self.email}.>"
