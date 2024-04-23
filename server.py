import json
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import request

app = Flask(__name__)

pitches = {
    'Four-Seam': {
        'name': 'Four-Seam', 
        'image': 'four-seam.png', 
        'video':'https://img.mlbstatic.com/mlb-images/image/private/ar_16:9,g_auto,q_auto:good,w_1024,c_fill,f_jpg,dpr_3.0/mlb/v9d87gj1wrapw3wguheu',
        'color': 'red-base', 
        'path': 'four_seam',
        'speed': '85-100 mph',
        'movement': 'Little to no movement',
        'short_info':'Fastest, straighest pitch'
        },
    'Two-Seam': {
        'name': 'Two-Seam', 
        'image': 'two-seam.png', 
        'video': 'https://img.mlbstatic.com/mlb-images/image/private/ar_16:9,g_auto,q_auto:good,w_1024,c_fill,f_jpg,dpr_3.0/mlb/js9aw7pxkaahvncqwvwy',
        'color': 'orange-base', 
        'path': 'two_seam',
        'speed': '80-90 mph',
        'movement': 'Moves downward, and in',
        'short_info':'AKA Sinker Ball'
        },
    'Slider': {
        'name': 'Slider', 
        'image': 'slider.png', 
        'video': 'https://img.mlbstatic.com/mlb-photos/image/upload/ar_16:9,g_auto,q_auto:good,w_1024,c_fill,f_jpg,dpr_3.0/fastball/a87c646c-28ba-49ee-a3dd-9dc0fff69235_home.jpg',
        'color': 'yellow-base', 
        'path': 'slider',
        'speed': '80-90 mph',
        'movement': 'Breaks down and away',
        'short_info':'Between a fastball and a curve'
        },
    'Curveball': {
        'name': 'Curveball', 
        'image': 'curveball.png', 
        'video': 'https://img.mlbstatic.com/mlb-images/image/private/ar_16:9,g_auto,q_auto:good,w_1024,c_fill,f_jpg,dpr_3.0/mlb/alqhmlfecizsnakbzmnu',
        'color': 'green-base', 
        'path': 'curveball',
        'speed': '70-80 mph',
        'movement': 'Moves from top to bottom (clock hands at 12 and 6)',
        'short_info':'Called 12-6 Curveball'
        },
    'Changeup': {
        'name': 'Changeup', 
        'image': 'changeup.png', 
        'video': 'https://img.mlbstatic.com/mlb-photos/image/upload/ar_16:9,g_auto,q_auto:good,w_1024,c_fill,f_jpg,dpr_3.0/fastball/4c02b11a-bf4f-4789-8a31-c50a44997112_network.jpg',
        'color': 'teal-base', 
        'path': 'changeup',
        'speed': '70-85 mph',
        'movement': 'Moves slower that a fastball, with a drop at the end',
        'short_info':'Called fade movement'
        }
}

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
    return render_template('lessons.html', data=data)

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