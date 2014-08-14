import sqlite3

db = sqlite3.connect('db.db', check_same_thread=False)
db.row_factory = sqlite3.Row
_cursor = db.cursor()

class TodoModel:
    def __init__(self):
        pass

    @classmethod
    def add_todo(cls, item, value):
        _cursor.execute('INSERT INTO todo (text, done) VALUES (?,?)', ( item, value ))
        db.commit()

    @classmethod
    def add_value(cls, value, id):
        _cursor.execute('UPDATE todo SET done = ? WHERE id = ? ', (value, id))
        db.commit()

    @classmethod
    def retrieve_last_N_items(cls, n):
        rows = _cursor.execute(
            'SELECT * FROM todo ORDER BY id DESC LIMIT ?', (n, )
        )
        return [r['text'] for r in rows]

