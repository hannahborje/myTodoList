from flask import request, jsonify, render_template
from todoModel import TodoModel

import flask.views
import json

RETRIEVE_DEFAULT_NR = 5

# Render template for main.html
class TodoView(flask.views.MethodView):
    def get(self):
        return render_template('main.html')

# Add todo (item) and if it is checked or not (value=false)
class TodoAdd(flask.views.MethodView):
    def post(self):
        args = json.loads(request.data)
        TodoModel.add_todo(args['item'], args['value'])
        return jsonify({ 'success': True })

# When a todo is checked - change its value (true or false)
class TodoAddValue(flask.views.MethodView):
    def post(self):
        args = json.loads(request.data)
        print("Changed done value to:", args)
        TodoModel.add_value(args['id'], args['value'])
        return jsonify({'success' : True})

# Retrieves all the todos from the database, including id and value
class TodoRetrieve(flask.views.MethodView):
    def get(self, n):
        try:
            n = int(n)
        except ValueError:
            n = RETRIEVE_DEFAULT_NR
        if n <= 0:
            n = RETRIEVE_DEFAULT_NR
        todoList = TodoModel.retrieve_todos(n)
        return jsonify({
            'success': True,
            'todoList': [{ 'id': item[0], 'text':item[1], 'value':item[2] } for item in todoList]
        })
