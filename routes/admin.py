import json

from flask import Blueprint, request
from flask_login import current_user, login_required
from datastore import update_translation

admin = Blueprint('admin', __name__)

@admin.before_request
@login_required
def before_request():
    if not current_user and current_user.is_admin:
        abort(401)

@admin.route('/update_word_translations', methods=['POST'])
def update_word_translations():
    word_id = request.form.get('word_id')
    english_translations = request.form.get('english_translations').split(',')
    spanish_translations = request.form.get('spanish_translations').split(',')
    
    update_translation(word_id, english_translations, spanish_translations)

    return json.dumps({"success": True })
