import os

urls = {
    # "peaceful": "https://youtu.be/alWEu3hxQxE",
    # "calm": "https://youtu.be/AgR1irb30sU",
    # "christmas": "https://youtu.be/hG2trPQSWt0",
    # "conflict": "https://youtu.be/2kVl78-Jcoc",
    # "love": "https://youtu.be/zucClEP1TRM",
    # "type": "https://youtu.be/c8kuB_IzSLI",
    # "phone": "https://youtu.be/R17ZMezKmMc",
    # "soccerball": "https://youtu.be/r7SKJEgiyKU",
    # "message": "https://youtu.be/4HOiKWdpT-o",
    "crowd": "https://youtu.be/GvYr7avbmAo"
}

for i in urls.items():
    (title, url) = i
    print(f"{title}: {url}")

    raw_url = os.popen(f"youtube-dl -g -x {url}").read().removesuffix("\n")
    comm = f"ffmpeg -ss 00:00:00.00 -i \"{raw_url}\" -t 00:03:00.00 -c mp3 {title}.mp3"
    os.system(comm)
