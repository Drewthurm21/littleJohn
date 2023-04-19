from .db import db, environment, SCHEMA, add_prefix_for_prod


class Trade(db.Model):
    __tablename__ = 'trades'

    # set schema for production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('portfolios.id')), nullable=False)
    ticker = db.Column(db.String(90), nullable=False)
    quantity = db.Column(db.Numeric(asdecimal=False), nullable=False)
    price = db.Column(db.Numeric(asdecimal=False), nullable=False)
    trade_type = db.Column(db.String(90), nullable=False)
    timestamp = db.Column(db.Text, nullable=False)

    # relationships
    portfolio = db.relationship('Portfolio', back_populates='trades')

    def to_dict(self):
        return {
            'id': self.id,
            'portfolio_id': self.portfolio_id,
            'ticker': self.ticker,
            'quantity': self.quantity,
            'price': self.price,
            'trade_type': self.trade_type,
            'timestamp': self.timestamp
        }
