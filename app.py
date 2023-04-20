#!/usr/bin/env python

from flask import Flask, request, make_response, render_template
#-----------------------------------------------------------------------

app = Flask(__name__, template_folder='.')

#-----------------------------------------------------------------------

@app.route('/', methods=['GET'])
@app.route('/intro', methods=['GET'])
def index():

    html = render_template('templates/intro.html')
    response = make_response(html)
    return response

#-----------------------------------------------------------------------

@app.route('/game', methods=['GET'])
def game():

    html = render_template('templates/game.html')
    response = make_response(html)
    return response

#-----------------------------------------------------------------------

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    html = render_template('templates/leaderboard.html', score= request.args.get('score', ""))
    response = make_response(html)
    return response
