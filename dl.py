import os

urls = {
    "conflict": "https://youtu.be/MI2wq39BPFo",
    "love": "https://youtu.be/f4inH4tOw6A",
}

for i in urls.items():
    (title, url) = i
    print(f"{title}: {url}")

    raw_url = os.popen(f"youtube-dl -g -x {url}").read().removesuffix("\n")
    comm = f"ffmpeg -ss 00:00:00.00 -i \"{raw_url}\" -t 00:05:00.00 -c mp3 dl/{title}.mp3"
    os.system(comm)
