from app.models import db, User, environment, SCHEMA


def seed_users():
    demo_users = [
        User(username='LittleJohn',
             email='littleJohn@littleJohn.com', password='password'),
        User(username='MaidMarian',
             email='MaidMarian@littleJohn.com', password='password'),
        User(username='FriarTuck',
             email='FriarTuck@littleJohn.com', password='password'),
    ]

    for user in demo_users:
        db.session.add(user)

    db.session.commit()


def undo_users():
    if environment == 'production':
        db.session.execute(f'TRUNCATE {SCHEMA}.users RESTART IDENTITY CASCADE;')
        db.session.commit()
    else:
        db.session.execute('DELETE from users;')
        db.session.commit()
