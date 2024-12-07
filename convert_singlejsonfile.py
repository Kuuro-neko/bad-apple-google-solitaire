import cv2
import json
import sys

if (len(sys.argv) != 4):
    print("Usage: python3 convert_singlejsonfile.py <target_width> <target_height> <video_path>")
    sys.exit(1)


# Set the target size, don't forget to keep the aspect ratio if you change this (64/48) or it will look weird
target_height = int(sys.argv[2])
target_width = int(sys.argv[1])

# Open the video
cap = cv2.VideoCapture(sys.argv[3])

# Get the video properties
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# Create the frames folder
import os
if not os.path.exists('frames'):
    os.makedirs('frames')

# Create the frames
i = 0

# Create a list to store the frames
frames = []

while(cap.isOpened()):
    ret, frame = cap.read()
    if ret == False:
        break

    # Convert to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Threshold the grayscale image to create a black and white image
    _, bw = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY)
    
    # Resize the image
    bw = cv2.resize(bw, (target_width, target_height))

    # Save the image as a PNG file
    #cv2.imwrite(f'frames/frame_{i}.png', bw)

    # Make it black and white
    jsonf = bw.tolist()
    for j in range(len(jsonf)):
        for k in range(len(jsonf[j])):
            jsonf[j][k] = 1 if jsonf[j][k] >= 128 else 0

    # Save the frame
    frames.append(jsonf)

    i += 1

with open(f'frames/frames.json', 'w') as f:
        json.dump(frames, f)

cap.release()
cv2.destroyAllWindows()
