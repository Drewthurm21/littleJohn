from .db import db


class Watchlist(db.model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.foreignKey('users.id'), nullable=False)
    name = db.Column(db.String(90), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name
        }
