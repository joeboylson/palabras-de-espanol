import json

from .db import db
from .user import *
from .user_words import *
from .words import *
from .spanish import *
from .english import *

def init_db(production=False):

    if production:
        return

    db.drop_all()
    db.create_all()

    print("DELETING ALL WORDS")
    English.query.delete()
    Spanish.query.delete()
    Words.query.delete()

    print("ADDING ALL WORDS")
    with open('datastore/raw_data/words.json') as words_file:
        words = json.load(words_file)

        for word in words:
    
            id = word.get('id', None)
            to_spanish_tip = word.get('to_spanish_tip', None)
            to_english_tip = word.get('to_english_tip', None)

            new_word = Words(id=id, to_spanish_tip=to_spanish_tip, to_english_tip=to_english_tip)
            db.session.add(new_word)

            spanish = word.get('spanish', None)
            english = word.get('english', None)

            for text in spanish:
                new_spanish_word = Spanish(word_id=new_word.id, text=text)
                db.session.add(new_spanish_word)

            for text in english:
                new_english_word = English(word_id=new_word.id, text=text)
                db.session.add(new_english_word)
        
        db.session.commit()

    print("DONE")



