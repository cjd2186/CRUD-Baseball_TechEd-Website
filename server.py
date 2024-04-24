#server.py
import json
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import request
import os

app = Flask(__name__)

# ROUTES
data = 0
with open('static/data.json', 'r') as f:
    data = json.load(f)
    pitches = data['pitches']
    f.close()

@app.route('/')
def home():
    return render_template('home.html', data=data)   

@app.route('/lessons', methods=['GET', 'POST'])
def lessons(): 
    print("here")
    print(pitches.values())
    return render_template('lessons.html', pitches=pitches.values())

@app.route('/pitches/<pitch_name>')
def pitch(pitch_name):
    # Convert pitches to list to index them
    pitch_list = list(pitches.values())
    current_pitch = None

    # Find the current pitch using 'path'
    for index, pitch in enumerate(pitch_list):
        if pitch['path'].lower() == pitch_name.lower():
            current_pitch = pitch
            current_index = index
            break

    # Calculate the next index for cycling through pitches
    next_index = (current_index + 1) % len(pitch_list)  # Wraps around to the first pitch
    next_pitch = pitch_list[next_index]

    video_files = os.listdir('static/videos')  # Assuming your videos are stored in 'static/videos'
    video= ['videos/' + file for file in video_files if file.endswith('.mp4') and current_pitch['name'] + "_1" in file][0].strip("'")
    return render_template('pitch_template.html', pitch=current_pitch, next_pitch=next_pitch, video=video)


@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/part1')
def part1():
    return render_template('part1.html')

@app.route('/part2')
def video_quiz():
    video_files = os.listdir('static/videos')  # Assuming your videos are stored in 'static/videos'
    videos = ['videos/' + file for file in video_files if file.endswith('.mp4')]
    return render_template('video_quiz.html', videos=videos)


if __name__ == '__main__':
   app.run(debug = True)