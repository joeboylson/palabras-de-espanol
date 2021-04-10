from sqlalchemy_serializer import SerializerMixin
from .db import db

class Spanish(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    word_id = db.Column(db.Integer, db.ForeignKey('words.id'), nullable=False)
    text = db.Column(db.String(80), nullable=False)

    # parent
    serialize_rules = ('-words',)
    words = db.relationship('Words', back_populates='spanish')

def add_spanish_words(word_id, spanish_texts):
    for text in spanish_texts:
        new_spanish_word = Spanish(word_id=word_id, text=text)
        db.session.add(new_spanish_word)
    db.session.commit()