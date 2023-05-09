from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Trade, User, Portfolio, db

trade_routes = Blueprint('trades', __name__)


@trade_routes.route('/', methods=['POST'])
@login_required
def create_trade():
    portfolio = Portfolio.query.get(request.json['portfolio_id'])
    trade_info = {**request.json}
    total_price = trade_info['quantity'] * trade_info['price']
    holdings = portfolio.build_holdings()

    if trade_info['trade_type'] == 'buy':
        if portfolio.balance < total_price:
            return {'errors': ['Insufficient funds']}, 401
        portfolio.balance -= total_price
    else:
        if holdings[trade_info['ticker']] < trade_info['quantity']:
            return {'errors': ['Insufficient shares']}, 401
        portfolio.balance += total_price

    trade = Trade(**trade_info)
    db.session.add(portfolio)
    db.session.add(trade)
    db.session.commit()
    return portfolio.to_dict()
