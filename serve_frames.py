from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/frame/<int:frame_nb>')
def frame(frame_nb):
    with open('frames/frame_%d.json' % frame_nb) as f:
        return jsonify(json.load(f))

if __name__ == '__main__':
    app.run(debug=True)