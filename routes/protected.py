import json

from flask import Blueprint
from flask_login import logout_user, login_required, current_user
from datastore import User, get_user_by_email

protected = Blueprint('protected', __name__)

@protected.before_request
@login_required
def before_request():
    if not current_user:
        abort(401)

@protected.route('/')
def index():
    return 'INDEX'

@protected.route('/logout')
def logout():
    logout_user()
    return "successfully logged out"

@protected.route('/profile')
def profile():

    profile = {
        "name": current_user.name,
        "email": current_user.email
    }

    return json.dumps({"success": True, "profile": profile})