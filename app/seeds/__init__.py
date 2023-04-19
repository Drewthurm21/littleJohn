from flask.cli import AppGroup
from app.models import db, environment, SCHEMA
from .users import seed_users, undo_users
from .watchlists import seed_watchlists, undo_watchlists
from .portfolios import seed_portfolios, undo_portfolios
from .watchlist_items import seed_watchlist_items, undo_watchlist_items
from .trades import seed_trades, undo_trades

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name. This is because the schema name is
        # prepended to the table name in production.
        undo_trades()
        undo_portfolios()
        undo_watchlist_items()
        undo_watchlists()
        undo_users()
    seed_users()
    seed_watchlists()
    seed_watchlist_items()
    seed_portfolios()
    seed_trades()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_trades()
    undo_portfolios()
    undo_watchlist_items()
    undo_watchlists()
    undo_users()
    # Add other undo functions here
