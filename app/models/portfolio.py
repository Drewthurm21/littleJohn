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

    def build_holdings(self):
        holdings = {}
        for trade in self.trades:
            if trade.ticker in holdings:
                if trade.trade_type == 'buy':
                    holdings[trade.ticker] += trade.quantity
                else:
                    holdings[trade.ticker] -= trade.quantity
            else:
                holdings[trade.ticker] = trade.quantity

        holdings['USD'] = self.balance
        # delete empty holdings
        for ticker in list(holdings):
            if holdings[ticker] == 0:
                del holdings[ticker]

        return holdings

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'balance': self.balance,
            'name': self.name,
            'trades': {trade.id: trade.to_dict() for trade in self.trades},
            'holdings': self.build_holdings()
        }
