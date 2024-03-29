from .db import db, environment, SCHEMA, add_prefix_for_prod


class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    # set schema for production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(90), nullable=False)

    # relationships
    watchlist_items = db.relationship(
        'Watchlist_Item', back_populates='watchlist')
    owner = db.relationship('User', back_populates='watchlists')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'items': [item.ticker for item in self.watchlist_items]
        }
