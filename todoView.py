from flask import request, jsonify, render_template
from todoModel import TodoModel

import flask.views
import json

RETRIEVE_DEFAULT_NR = 5

class TodoView(flask.views.MethodView):
    def get(self):
        return render_template('main.html')

class TodoAdd(flask.views.MethodView):
    def post(self):
        args = json.loads(request.data)
        TodoModel.add_todo(args['item'], args['value'])
        return jsonify({ 'success': True })

class TodoAddValue(flask.views.MethodView):
    def post(self):
        args = json.loads(request.data)
        print("Changed done value to:", args)
        TodoModel.add_value(args['value'], args['id'])
        return jsonify({'success' : True})

class TodoRetrieve(flask.views.MethodView):
    def get(self, n):
        try:
            n = int(n)
        except ValueError:
            n = RETRIEVE_DEFAULT_NR
        if n <= 0:
            n = RETRIEVE_DEFAULT_NR
        todoList = TodoModel.retrieve_last_N_items(n)
        return jsonify({
            'success': True,
            'todoList': [{ 'text': item } for item in todoList]
        })
