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
    
    print( Spanish.query.filter_by(word_id=word_id).all() )
    print( English.query.filter_by(word_id=word_id).all() )




    # user_word_id = request.form.get('user_word_id')
    # answer_language = request.form.get('answer_language')
    # answer_text = request.form.get('answer_text')

    # user_word = get_user_word_by_id(user_word_id)

    # if answer_language == 'spanish':
    #     word = user_word.word.spanish
    # elif answer_language == 'english':
    #     word = user_word.word.english
    # else:
    #     word = None;
        
    # if word is None:
    #     return json.dumps({"success": False, "message": "invalid" })
    
    # correct = answer_text.lower() in [ w.text for w in word ]
    # default_score = 0.5

    # if correct:
    #     score = user_word.score * 2 if user_word.score > 0 else default_score
    # else:
    #     score = default_score

    # next_review_at = (datetime.now() + timedelta(minutes=score)).timestamp()
    # user_word.next_review_at = next_review_at
    # user_word.score = score
    # db.session.commit()

    # return json.dumps({"success": True, "correct": correct, "user_word": user_word.to_dict(), "answer_text": answer_text })
