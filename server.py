import json
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import request

app = Flask(__name__)

pitches = [
    {'name': 'Four-Seam', 'image': 'four-seam.png', 'color': 'red-base', 'path': 'four_seam'},
    {'name': 'Two-Seam', 'image': 'two-seam.png', 'color': 'orange-base', 'path': 'two_seam'},
    {'name': 'Slider', 'image': 'slider.png', 'color': 'yellow-base', 'path': 'slider'},
    {'name': 'Curveball', 'image': 'curveball.png', 'color': 'green-base', 'path': 'curveball'},
    {'name': 'Changeup', 'image': 'changeup.png', 'color': 'teal-base', 'path': 'changeup'}
]

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
    return render_template('lessons.html', pitches=pitches)

@app.route('/pitches/<pitch_name>')
def pitch(pitch_name):
    for pitch in pitches:
        if pitch['path'] == pitch_name:
            pitch_data=pitch

    current_index = next((i for i, p in enumerate(pitches) if p['path'] == pitch_name), None)
    if current_index is not None:
        next_index = (current_index + 1) % len(pitches)  # This wraps around to the first pitch
        next_pitch = pitches[next_index]
    return render_template('pitch_template.html', pitch=pitches[current_index], next_pitch=next_pitch)



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