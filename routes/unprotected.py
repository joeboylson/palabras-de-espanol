import json

from flask import Blueprint, request, send_from_directory, render_template
from flask_login import login_user, current_user
from datastore import get_user_by_email, create_user
from werkzeug.security import check_password_hash

unprotected = Blueprint('unprotected', __name__, template_folder='../build')

@unprotected.errorhandler(404)
def page_not_found():
    return render_template('index.html')

# @unprotected.route("/static/<path:path>")
# def static_dir(path):
#     return send_from_directory("build/static", path)

@unprotected.route('/')
@unprotected.route('/register')
@unprotected.route('/login')
@unprotected.route('/admin')
@unprotected.route('/home')
def index():
    return render_template('index.html', )

@unprotected.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    user = get_user_by_email(email)

    if not user:
        return json.dumps({ "success": False, "message": "failed to log in" });

    login_success = check_password_hash(user.password, password)

    if not login_success: 
        return json.dumps({ "success": False, "message": "failed to log in" });

    login_user(user, remember=remember)
    return json.dumps({ "success": True, "message": "successfully logged in" });

@unprotected.route('/register', methods=['POST'])
def register():

    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')

    user = get_user_by_email(email)

    if user:
        return json.dumps({ "success": False, "message": "email already used" });

    success = create_user(name, email, password)
    if success:
        return json.dumps({ "success": True, "message": "succesfully registered" });

    return json.dumps({ "success": False, "message": "failed to register" });


@unprotected.route('/user_is_authorized')
def data():
    return json.dumps({ "authorized": current_user.is_authenticated})    
