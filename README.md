# bad-apple-google-solitaire

## Installation

```bash
pip install -r requirements.txt
```

### Libraries used:

- **opencv-python** (video processing)
- **numpy** (video processing)
- **flask** (web server to serve the frames)
- **flask-cors** (allow cross origin requests)

## How to run it

1. Download the video and put it in the root folder named `bad-apple.mp4`

2. Run `convert.py` to convert the video to frames

```bash	
python3 convert.py
```

3. Run `server.py` to start the server

```bash
python3 server.py
```

4. Open a google solitaire game

5. Open the console and paste the content of `display.js`. Then press enter

6. Enjoy