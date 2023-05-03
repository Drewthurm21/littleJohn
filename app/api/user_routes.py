from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Watchlist, Portfolio

user_routes = Blueprint('users', __name__)


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


@user_routes.route('/<int:user_id>/portfolios')
@login_required
def get_user_portfolios(user_id):
    return {
        portfolio.id: portfolio.to_dict() for portfolio in
        Portfolio.query.filter_by(owner_id=user_id).all()
    }
