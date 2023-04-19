from app.models import db, User


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
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
