from sqlalchemy_serializer import SerializerMixin
from .db import db

class English(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    word_id = db.Column(db.Integer, db.ForeignKey('words.id'), nullable=False)
    text = db.Column(db.String(80), nullable=False)

    # parent
    serialize_rules = ('-words',)
    words = db.relationship('Words', back_populates='english')

def add_english_words(word_id, english_texts):
    for text in english_texts:
        new_english_word = English(word_id=word_id, text=text)
        db.session.add(new_english_word)
    db.session.commit()