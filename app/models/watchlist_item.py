from .db import db, environment, SCHEMA, add_prefix_for_prod


class Watchlist_Item(db.Model):
    __tablename__ = 'watchlist_items'

    # set schema for production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('watchlists.id')), nullable=False)
    ticker = db.Column(db.String(90), nullable=False)

    # relationships
    watchlist = db.relationship('Watchlist', back_populates='watchlist_items')

    def to_dict(self):
        return {
            'id': self.id,
            'watchlist_id': self.watchlist_id,
            'ticker': self.ticker
        }
