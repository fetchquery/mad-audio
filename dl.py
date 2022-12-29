import os

urls = {
    "hug": "https://youtu.be/WMG-4DlRyqg"
}

for i in urls.items():
    (title, url) = i
    print(f"{title}: {url}")

    raw_url = os.popen(f"youtube-dl -g -x {url}").read().removesuffix("\n")
    comm = f"ffmpeg -ss 00:07:32.00 -i \"{raw_url}\" -t 00:10:35.00 -c mp3 dl/{title}.mp3"
    os.system(comm)
