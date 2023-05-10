from app.models import db, Trade, environment, SCHEMA
from faker import Faker
from random import randint

fake = Faker()
trade_tickers = ['AAPL', 'TSLA', 'AMZN', 'MSFT',
                 'GOOG', 'META', 'NFLX', 'UBER', 'SQ', 'LYFT']


def generate_trades(n, ticker):
    stock_price = randint(40, 200)
    last_date = fake.date_time_between(start_date='-1y', end_date='now')
    trades = []
    for _ in range(0, n):
        date = fake.date_time_between(start_date=last_date, end_date='now')
        trades.append(Trade(
            portfolio_id=randint(1, 3),
            ticker=ticker,
            quantity=randint(1, 20),
            price=stock_price,
            trade_type='buy',
            timestamp=str(date)
        ))
        stock_price += randint(-5, 5)
        last_date = date

    return trades


def seed_trades():
    demo_trades = []
    for ticker in trade_tickers:
        demo_trades.extend(generate_trades(3, ticker))

    for trade in demo_trades:
        db.session.add(trade)

    db.session.commit()


def undo_trades():
    if environment == 'production':
        db.session.execute(
            f'TRUNCATE {SCHEMA}.trades RESTART IDENTITY CASCADE;')
        db.session.commit()
    else:
        db.session.execute('DELETE from trades;')
        db.session.commit()
