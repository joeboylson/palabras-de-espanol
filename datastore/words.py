from sqlalchemy_serializer import SerializerMixin
from .db import db
from .english import English, add_english_words
from .spanish import Spanish, add_spanish_words

class Words(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    to_english_tip = db.Column(db.String(80))
    to_spanish_tip = db.Column(db.String(80))

    # parent
    serialize_rules = ('-user_words',)
    user_words = db.relationship('UserWords', back_populates='word')

    # child
    spanish = db.relationship('Spanish', back_populates='words')
    english = db.relationship('English', back_populates='words')

def get_word_by_id(id):
    try:
        return Words.query.filter_by(id=id).first()
    except Exception as e:
        print(e)
        return None

def update_translation(word_id, english_translations=[], spanish_translations=[]):
    
    word = get_word_by_id(word_id)

    Spanish.query.filter_by(word_id=word_id).delete()
    English.query.filter_by(word_id=word_id).delete()

    add_spanish_words(word.id, spanish_translations)
    add_english_words(word.id, english_translations)

    db.session.commit()
