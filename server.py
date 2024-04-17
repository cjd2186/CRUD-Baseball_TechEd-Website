import json
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import request

app = Flask(__name__)


# ROUTES
data = 0
with open('static/data.json', 'r') as f:
    data = json.load(f)
    f.close()
@app.route('/')
def home():
    return render_template('home.html', data=data)   

@app.route('/lessons', methods=['GET', 'POST'])
def lessons(): 
    return render_template('lessons.html')   
@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/part1')
def part1():
    return render_template('part1.html')

@app.route('/part2')
def part2():
    return render_template('part2.html')
if __name__ == '__main__':
   app.run(debug = True)