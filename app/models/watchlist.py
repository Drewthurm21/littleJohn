from .db import db


class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(90), nullable=False)

    # relationships
    watchlist_items = db.relationship(
        'Watchlist_Item', back_populates='watchlist')
    owner = db.relationship('User', back_populates='watchlists')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name
        }
