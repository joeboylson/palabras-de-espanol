from werkzeug.security import generate_password_hash
from flask_login import UserMixin
from .db import db

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))

def get_user_by_email(email):
    try:
        return User.query.filter_by(email=email).first()
    except Exception as e:
        print(e)
        return None

def create_user(name, email, password):
    try:
        new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        print(e)
        return None