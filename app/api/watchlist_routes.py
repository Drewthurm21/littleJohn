from flask import Blueprint, request
from flask_login import login_required
from app.models import Watchlist, Watchlist_Item, db

watchlist_routes = Blueprint('watchlists', __name__)


@watchlist_routes.route('/', methods=['POST'])
@login_required
def create_watchlist():
    watchlist = Watchlist(**request.json)
    db.session.add(watchlist)
    db.session.commit()
    return watchlist.to_dict()


@watchlist_routes.route('/<int:watchlist_id>')
@login_required
def watchlist(watchlist_id):
    watchlist = Watchlist.query.get(watchlist_id)
    return watchlist.to_dict()


@watchlist_routes.route('/<int:watchlist_id>', methods=['PUT'])
@login_required
def update_watchlist(watchlist_id):
    watchlist = Watchlist.query.get(watchlist_id)
    watchlist.name = request.json['name']
    db.session.commit()
    return watchlist.to_dict()


@watchlist_routes.route('/<int:watchlist_id>', methods=['DELETE'])
@login_required
def delete_watchlist(watchlist_id):
    watchlist = Watchlist.query.get(watchlist_id)
    db.session.delete(watchlist)
    db.session.commit()
    return {'message': 'watchlist deleted'}


@watchlist_routes.route('/<int:watchlist_id>/<string:ticker>')
@login_required
def add_watchlist_item(watchlist_id, ticker):
    watchlist_item = Watchlist_Item(
        watchlist_id=watchlist_id,
        ticker=ticker
    )
    db.session.add(watchlist_item)
    db.session.commit()
    return watchlist_item.to_dict()


# delete watchlist item
@watchlist_routes.route('/<int:watchlist_id>/<string:ticker>', methods=['DELETE'])
@login_required
def delete_watchlist_item(watchlist_id, ticker):
    watchlist_item = Watchlist_Item.query.filter_by(
        watchlist_id=watchlist_id,
        ticker=ticker
    ).first()
    db.session.delete(watchlist_item)
    db.session.commit()

    watchlist = Watchlist.query.get(watchlist_id)
    return watchlist.to_dict()
