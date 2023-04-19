from .db import db


class Watchlist_Item(db.Model):
    __tablename__ = 'watchlist_items'

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.foreignKey(
        'watchlist.id'), nullable=False)
    ticker = db.Column(db.String(90), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'watchlist_id': self.watchlist_id,
            'ticker': self.ticker
        }
