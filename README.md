# Bad Apple on Google Solitaire

[Video link]([https://youtu.be/OSBkggpfpG4](https://youtu.be/gR6i8ZG0Jl0) of this running in case they ever update their game

I runned it at 4 fps to ensure that it runs smoothly for the video, but you can try to increase it in `display.js`

---

## Installation

Clone the repo

```bash
git clone https://github.com/Kuuro-neko/bad-apple-google-solitaire.git
```

Install the libraries

```bash
cd bad-apple-google-solitaire
pip install -r requirements.txt
```

### Libraries used:

- **opencv-python** (video processing)
- **flask** (web server to serve the frames)
- **flask-cors** (allow cross origin requests)

## How to run it

1. Download the video and put it in the root folder named `bad-apple.mp4`

2. Run `convert.py` to convert the video to frames

```bash	
python3 convert.py
```

3. Run `serve_frames.py` to start the server

```bash
python3 serve_frames.py
```

4. Start a [Google Solitaire](https://www.google.com/search?q=google+solitaire) game

5. Open the console and paste the content of `display.js`. Then press enter

6. Enjoy
