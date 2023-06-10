from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Trade, User, Portfolio, db
from datetime import datetime
trade_routes = Blueprint('trades', __name__)


@trade_routes.route('/')
@login_required
def get_trades():
    return {trade.id: trade.to_dict() for trade in Trade.query.all()}


@trade_routes.route('/', methods=['POST'])
@login_required
def create_trade():
    portfolio = Portfolio.query.get(request.json['portfolio_id'])
    trade_info = {**request.json}
    timestamp = int(trade_info['timestamp']) / 1000
    trade_info['timestamp'] = datetime.utcfromtimestamp(
        timestamp).strftime('%Y-%m-%d %H:%M:%S')
    total_price = trade_info['quantity'] * trade_info['price']
    holdings = portfolio.build_holdings()

    if trade_info['trade_type'] == 'buy':
        if portfolio.balance < total_price:
            return {'errors': ['Insufficient funds']}, 401
        portfolio.balance -= total_price
    elif trade_info['trade_type'] == 'sell':
        if holdings[trade_info['ticker']] < trade_info['quantity']:
            return {'errors': ['Insufficient shares']}, 401
        portfolio.balance += total_price
    else:  # trade_type == 'deposit'
        portfolio.balance += total_price

    trade = Trade(**trade_info)
    db.session.add(portfolio)
    db.session.add(trade)
    db.session.commit()
    return portfolio.to_dict()
