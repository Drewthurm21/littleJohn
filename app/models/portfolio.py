from .db import db, environment, SCHEMA, add_prefix_for_prod


class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    # set schema for production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    balance = db.Column(db.Numeric(asdecimal=False), nullable=False)
    name = db.Column(db.String(90), nullable=False)

    # relationships
    trades = db.relationship('Trade', back_populates='portfolio')
    owner = db.relationship('User', back_populates='portfolios')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'balance': self.balance,
            'name': self.name,
        }
