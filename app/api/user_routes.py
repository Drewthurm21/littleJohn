from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Watchlist

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:user_id>')
@login_required
def user(user_id):
    user = User.query.get(user_id)
    return user.to_dict()


@user_routes.route('/<int:user_id>/watchlists')
@login_required
def get_user_watchlists(user_id):
    return {
        wlist.id: wlist.to_dict() for wlist in
        Watchlist.query.filter_by(owner_id=user_id).all()
    }
