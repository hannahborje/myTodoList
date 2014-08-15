import sqlite3

db = sqlite3.connect('todoDatabase.db', check_same_thread=False)
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
        _cursor.execute('UPDATE todo SET done = ? WHERE id = ? ', (id, value ))
        db.commit()

    @classmethod
    def retrieve_todos(cls, n):
        rows = _cursor.execute(
            'SELECT * FROM todo ORDER BY id DESC LIMIT ?', (n, )
        )
        list = []
        for row in _cursor:
            list.append([row['id'], row['text'], row['done']])
        return list

