from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

@app.route('/frame/<int:frame_nb>')
def frame(frame_nb):
    with open('frames/frame_%d.json' % frame_nb) as f:
        return jsonify(json.load(f))

@app.route('/frame_count')
def frame_count():
    i = 0
    file = 'frames/frame_%d.json' % i
    while os.path.exists(file):
        i += 1
        file = 'frames/frame_%d.json' % i
    return jsonify(i)

if __name__ == '__main__':
    app.run(debug=True)