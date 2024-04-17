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

if __name__ == '__main__':
   app.run(debug = True)