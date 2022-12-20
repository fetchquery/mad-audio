import os

urls = {
    "lovestory": "https://youtu.be/E35In9bsWh4"
}

for i in urls.items():
    (title, url) = i
    print(f"{title}: {url}")

    raw_url = os.popen(f"youtube-dl -g -x {url}").read().removesuffix("\n")
    comm = f"ffmpeg -ss 00:00:00.00 -i \"{raw_url}\" -t 00:05:00.00 -c mp3 dl/{title}.mp3"
    os.system(comm)
