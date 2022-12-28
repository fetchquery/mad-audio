import os

urls = {
    "painful": "https://youtu.be/2kVl78-Jcoc"
}

for i in urls.items():
    (title, url) = i
    print(f"{title}: {url}")

    raw_url = os.popen(f"youtube-dl -g -x {url}").read().removesuffix("\n")
    comm = f"ffmpeg -ss 00:02:56.00 -i \"{raw_url}\" -t 00:05:20.00 -c mp3 dl/{title}.mp3"
    os.system(comm)
