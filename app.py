import os
import sqlite3
import psycopg2

from flask import Flask, Blueprint
from flask_login import LoginManager 

from routes import unprotected, protected, admin
from datastore import User, db, init_db

IS_PRODUCTION = os.environ.get('NODE_ENV') == 'production'
DEBUG = True if not IS_PRODUCTION else False
PORT = 5000 if not IS_PRODUCTION else os.environ.get('PORT')
SECRET_KEY = 'tacocat' if not IS_PRODUCTION else os.environ.get('SECRET_KEY')
DATABASE_URL = os.environ.get('DATABASE_URL') if IS_PRODUCTION else 'sqlite:///database.db'

class FlaskApp(Flask):
    def run(self, host=None, port=None, debug=None, load_dotenv=True, **options):
        with self.app_context():
            init_db(IS_PRODUCTION)    
        super(FlaskApp, self).run(host=host, port=port, debug=debug, load_dotenv=load_dotenv, **options)

app = FlaskApp(__name__, static_folder='./build', static_url_path='/')
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL

build_folder = Blueprint('build', __name__, static_url_path='', static_folder='build')
app.register_blueprint(build_folder)

app.register_blueprint(protected)
app.register_blueprint(unprotected)
app.register_blueprint(admin)

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

if __name__ == '__main__':
    print('::: {}'.format(PORT))
    app.run(debug=DEBUG, host='0.0.0.0', port=PORT)

