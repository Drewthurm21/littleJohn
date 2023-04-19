from app.models import db, Watchlist, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_watchlists():
    demo_watchlists = [
        Watchlist(owner_id=1, name='Demo Watchlist'),
        Watchlist(owner_id=1, name='Demo Watchlist2'),
        Watchlist(owner_id=1, name='Demo Watchlist3'),
        Watchlist(owner_id=2, name='Demo Watchlist'),
        Watchlist(owner_id=3, name='Demo Watchlist')
    ]

    for watchlist in demo_watchlists:
        db.session.add(watchlist)

    db.session.commit()


def undo_watchlists():
    if environment == 'production':
        db.session.execute(
            f'TRUNCATE {SCHEMA}.watchlists RESTART IDENTITY CASCADE;')
        db.session.commit()
    else:
        db.session.execute('DELETE from watchlists;')
        db.session.commit()
