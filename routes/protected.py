import json
from datetime import timedelta, datetime

from flask import Blueprint, request
from flask_login import logout_user, login_required, current_user
from datastore import db, User, get_user_by_email
from datastore import UserWords, get_user_next_word, get_user_word_by_id, get_user_words_by_user_id
from datastore import Words

protected = Blueprint('protected', __name__)

@protected.before_request
@login_required
def before_request():
    if not current_user:
        abort(401)



@protected.route('/logout')
def logout():
    logout_user()
    return "successfully logged out"



@protected.route('/profile')
def profile():
    return json.dumps({"success": True, "profile": current_user.to_dict()})



@protected.route('/next_word')
def next_word():
    next_word = get_user_next_word(current_user)
    return json.dumps({"success": True, "next_word": next_word })



@protected.route('/question_answer', methods=['POST'])
def question_answer():
    user_word_id = request.form.get('user_word_id')
    answer_language = request.form.get('answer_language')
    answer_text = request.form.get('answer_text')

    user_word = get_user_word_by_id(user_word_id)

    if answer_language == 'spanish':
        word = user_word.word.spanish
    elif answer_language == 'english':
        word = user_word.word.english
    else:
        word = None;
        
    if word is None:
        return json.dumps({"success": False, "message": "invalid" })
    
    correct = answer_text.lower() in [ w.text for w in word ]
    default_score = 1

    if correct:
        score = user_word.score * 3 if user_word.score > 0 else default_score
    else:
        score = default_score

    next_review_at = (datetime.now() + timedelta(minutes=score)).timestamp()
    user_word.next_review_at = next_review_at
    user_word.score = score
    db.session.commit()

    return json.dumps({"success": True, "correct": correct, "user_word": user_word.to_dict(), "answer_text": answer_text })



@protected.route('/user_is_admin')
def data():
    return json.dumps({ "is_admin": current_user.is_admin})



@protected.route('/all_words')
def all_words():
    page = int(request.args.get('page')) or 0

    limit = 10
    offset = page * limit

    all_words = [ word.to_dict() for word in Words.query.limit(limit).offset(offset).all() ]
    return json.dumps({ "all_words": all_words })
