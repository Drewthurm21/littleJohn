from app.models import db, Portfolio, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_portfolios():
    demo_portfolios = [
        Portfolio(owner_id=1, balance=0, name='Demo Portfolio'),
        Portfolio(owner_id=1, balance=0, name='Demo Portfolio 2'),
        Portfolio(owner_id=1, balance=0, name='Demo Portfolio 3'),
        Portfolio(owner_id=2, balance=0, name='Demo Portfolio'),
        Portfolio(owner_id=3, balance=0, name='Demo Portfolio')
    ]

    for portfolio in demo_portfolios:
        db.session.add(portfolio)

    db.session.commit()


def undo_portfolios():
    if environment == 'production':
        db.session.execute(
            f'TRUNCATE {SCHEMA}.portfolios RESTART IDENTITY CASCADE;')
        db.session.commit()
    else:
        db.session.execute('DELETE from portfolios;')
        db.session.commit()
