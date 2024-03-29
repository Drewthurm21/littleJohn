from flask import Blueprint, jsonify, session, request
from app.models import User, Portfolio, Watchlist, Watchlist_Item, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
import os

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        alpha_vantage_key = os.environ.get('ALPHA_VANTAGE_API_KEY')
        alpha_vantage_alt = os.environ.get('ALPHA_VANTAGE_ALT_KEY')
        finnhub_api_key = os.environ.get('FINNHUB_API_KEY')
        finnhub_webhook_key = os.environ.get('FINNHUB_WEBHOOK_KEY')

        return {
            'user': user.to_dict(),
            'apiKeys': {
                'finnhub': finnhub_api_key,
                'finnhub_webhook': finnhub_webhook_key,
                'alpha_vantage': alpha_vantage_key,
                'alpha_vantage_alt': alpha_vantage_alt
            }
        }

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()

        portfolio = Portfolio(
            owner_id=user.id, name='My Portfolio', balance=10000)
        db.session.add(portfolio)

        watchlist = Watchlist(owner_id=user.id, name='My Watchlist')
        db.session.add(watchlist)
        db.session.commit()

        watchlist_item = Watchlist_Item(
            watchlist_id=watchlist.id, ticker='AAPL')
        db.session.add(watchlist_item)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
