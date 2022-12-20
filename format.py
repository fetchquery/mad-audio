# ffmpeg -i a.mp4 a.mp3 -c mp3
# rm a.mp4

# Requires ffmpeg
# Files under directories should be mp4 files
# Files will be formatted to mp3 files
# Check directories name and contents

import os

dirs = ["emotion", "background", "chat", "effect"]

for dir in dirs:
    files = os.listdir(dir)

    for file in files:
        filename = file[:-4]
        os.system(f"ffmpeg -i {filename}.mp4 {filename}.mp3 -c mp3")
        os.remove(f"{file}")
