from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Portfolio, User, db


portfolio_routes = Blueprint('portfolios', __name__)


@portfolio_routes.route('/', methods=['POST'])
@login_required
def create_portfolio():
    user = User.query.get(current_user.id)
    portfolios = Portfolio.query.filter_by(user_id=user.id).all()
    if len(portfolios) >= 3:
        return {'errors': ['You can only have 3 portfolios']}, 401
    portfolio = Portfolio(**request.json)
    db.session.add(portfolio)
    db.session.commit()
    return portfolio.to_dict()


@portfolio_routes.route('/<int:portfolio_id>')
@login_required
def get_portfolio_info(portfolio_id):
    user = User.query.get(current_user.id)
    portfolio = Portfolio.query.get(portfolio_id)
    if user.id != portfolio.user_id:
        return {'errors': ['Users can only view their own portfolios.']}, 401
    return portfolio.to_dict()


@portfolio_routes.route('/<int:portfolio_id>', methods=['PUT'])
@login_required
def update_portfolio(portfolio_id):
    user = User.query.get(current_user.id)
    portfolio = Portfolio.query.get(portfolio_id)
    if user.id != portfolio.user_id:
        return {'errors': ['Users can only edit their own portfolios.']}, 401
    # assign all the values from the request.json to the portfolio object
    portfolio.update(**request.json)
    db.session.commit()
    return portfolio.to_dict()


@portfolio_routes.route('/<int:portfolio_id>', methods=['DELETE'])
@login_required
def delete_portfolio(portfolio_id):
    user = User.query.get(current_user.id)
    portfolio = Portfolio.query.get(portfolio_id)
    if user.id != portfolio.user_id:
        return {'errors': ['Users can only edit their own portfolios.']}, 401
    db.session.delete(portfolio)
    db.session.commit()
    return {'message': 'deleted'}
