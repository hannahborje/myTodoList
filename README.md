Author: Hannah Börjesson, 2014 Linköping

This is a Todo Application created with a little help from AngularJS, Flask, Jinja2, Python, HTML, CSS and a SQLite3 database.

*** You need:

- Linux/UNIX like operating system
- Python 2.7
- virtualenv (for Python 2.7)
- SQLite3

There is a setup file that will help you to:

- create the SQLite3 database
- create a virtualenv folder
- install the Python dependencies

*** To run the setup file:

    ./setup.sh

*** To run the application:

1. Run the setup file (you only need to do this the first time)

2. Open a terminal window and write

    . venv/bin/activate

3. and then

    python todo.py

This will start the server application. Now you can go to http://127.0.0.1:5000
and for the best view of the application, please run it in Chrome


*** When you are getting tired of the Todo Application (how can you ever?) you stop it by:

In terminal window

    use Ctrl-C.

To get out of the virtualenv, write:

    deactivate
