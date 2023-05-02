from flask import Blueprint, request
from flask_login import login_required
from app.models import Portfolio, User, db


portfolio_routes = Blueprint('portfolios', __name__)


@portfolio_routes.route('/', methods=['POST'])
@login_required
def create_portfolio():
    portfolio = Portfolio(**request.json)
    db.session.add(portfolio)
    db.session.commit()
    return portfolio.to_dict()


@portfolio_routes.route('/<int:portfolio_id>')
@login_required
def get_portfolio_info(portfolio_id):
    portfolio = Portfolio.query.get(portfolio_id)
    return portfolio.to_dict()


@portfolio_routes.route('/<int:portfolio_id>', methods=['PUT'])
@login_required
def update_portfolio(portfolio_id):
    portfolio = Portfolio.query.get(portfolio_id)
    # assign all the values from the request.json to the portfolio object
    portfolio.update(**request.json)
    db.session.commit()
    return portfolio.to_dict()


@portfolio_routes.route('/<int:portfolio_id>', methods=['DELETE'])
@login_required
def delete_portfolio(portfolio_id):
    portfolio = Portfolio.query.get(portfolio_id)
    db.session.delete(portfolio)
    db.session.commit()
    return {'message': 'deleted'}
