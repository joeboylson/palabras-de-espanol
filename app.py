import os

from flask import Flask, Blueprint
from flask_login import LoginManager 

from routes import unprotected, protected
from datastore import User, db

DOWNLOAD_DIRECTORY = "static/images"
DIST_DIRECTORY = "dist"
IS_PRODUCTION = os.environ.get('NODE_ENV') == 'production'
DEBUG = True if not IS_PRODUCTION else False
PORT = 5000 if not IS_PRODUCTION else os.environ.get('PORT')
SECRET_KEY = 'tacocat' if not IS_PRODUCTION else os.environ.get('SECRET_KEY')

app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

app.register_blueprint(protected)
app.register_blueprint(unprotected)

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

if __name__ == '__main__':
    print('::: {}'.format(PORT))
    app.run(debug=DEBUG, host='0.0.0.0', port=PORT)