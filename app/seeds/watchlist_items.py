from app.models import db, Watchlist_Item, environment, SCHEMA


def seed_watchlist_items():
    demo_watchlist_items = [
        Watchlist_Item(watchlist_id=1, ticker='AAPL'),
        Watchlist_Item(watchlist_id=1, ticker='TSLA'),
        Watchlist_Item(watchlist_id=1, ticker='AMZN'),
        Watchlist_Item(watchlist_id=1, ticker='MSFT'),
        Watchlist_Item(watchlist_id=1, ticker='GOOG'),
        Watchlist_Item(watchlist_id=1, ticker='FB'),
        Watchlist_Item(watchlist_id=1, ticker='NFLX'),
        Watchlist_Item(watchlist_id=1, ticker='UBER'),
        Watchlist_Item(watchlist_id=1, ticker='SQ'),
        Watchlist_Item(watchlist_id=1, ticker='LYFT')
    ]

    for watchlist_item in demo_watchlist_items:
        db.session.add(watchlist_item)

    db.session.commit()


def undo_watchlist_items():
    if environment == 'production':
        db.session.execute(f'TRUNCATE {SCHEMA}.watchlist_items RESTART IDENTITY CASCADE;')
        db.session.commit()
    else:
        db.session.execute('DELETE from watchlist_items;')
        db.session.commit()