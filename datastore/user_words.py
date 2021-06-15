from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from .db import db

class UserWords(db.Model, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    word_id = db.Column(db.Integer, db.ForeignKey('words.id'), nullable=False)
    score = db.Column(db.Float(), default=0.0)
    next_review_at = db.Column(db.Float(), default=0.0)

    # parent
    serialize_rules = ('-user',)
    user = db.relationship('User', back_populates='user_words')

    # child
    word = db.relationship('Words', back_populates='user_words')

def get_user_next_word(user):
    try:
        now = datetime.now().timestamp()
        query_result = UserWords.query \
            .filter_by(user_id=user.id) \
            .filter(UserWords.next_review_at < now) \
            .order_by(UserWords.score) \
            .order_by(UserWords.word_id) \
            .first()
        
        if query_result is not None:
            return query_result.to_dict()
        else:
            return None
    except Exception as e:
        print(e)
        return None

def get_user_word_by_id(id):
    try:
        return UserWords.query.filter_by(id=id).first()
    except Exception as e:
        print(e)
        return None

def get_user_words_by_user_id(user_id):
    try:
        return UserWords.query.filter_by(user_id=user_id).all()
    except Exception as e:
        print(e)
        return None


