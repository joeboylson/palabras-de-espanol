from werkzeug.security import generate_password_hash
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin
from .db import db
from .words import Words
from .user_words import UserWords

class User(UserMixin, SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))
    is_admin = db.Column(db.Boolean, default=False)

    serialize_rules = ('-password',)

    # children
    user_words = db.relationship('UserWords', back_populates='user')

def get_user_by_email(email):
    try:
        return User.query.filter_by(email=email).first()
    except Exception as e:
        print(e)
        return None

def create_user(name, email, password):

    words = Words.query.order_by(Words.id).all()

    try:
        new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))
        db.session.add(new_user)

        for word in Words.query.all():
            new_user_word = UserWords(user_id=new_user.id, word_id=word.id)
            db.session.add(new_user_word)
            
        db.session.commit()
        return new_user
    except Exception as e:
        print(e)
        return None
