class Key {
    keyElement;
    progressElement;
    audioName;
    audio;
    isPlaying;
    time;
    length;

    constructor(keyElement, audioName) {
        this.keyElement = keyElement;
        this.progressElement = keyElement.querySelector("progress");
        this.audioName = audioName;
        this.audio = new Audio(this.audioName);
        this.isPlaying = false;
        this.time = 0;

        this.audio.addEventListener("loadeddata", () => {
            this.progressElement.max = this.audio.duration;
        });
    };

    play() {
        this.audio.currentTime = this.time;
        this.audio.play();
        this.progressElement.classList.toggle("playing");
        this.isPlaying = true;
    }

    pause() {
        this.time = this.audio.currentTime;
        this.audio.pause();
        this.progressElement.classList.toggle("playing");
        this.isPlaying = false;
    }

    end() {
        this.time = 0;
        this.audio.pause();
        this.progressElement.classList.toggle("playing");
        this.audio.currentTime = 0;
        this.isPlaying = false;
    }

    handleClick() {
        if (!this.isPlaying) {
            this.play();
        } else {
            this.pause();
        }
    }

    handleProgress() {
        if (this.audio.currentTime == this.audio.duration) {
            this.end();
        }

        this.progressElement.value = this.audio.currentTime;
    }
}

const keyElements = Array.from(document.querySelectorAll(".key"));
const keys = keyElements.map(element => {
    const key = new Key(element, element.attributes.altsrc.nodeValue);
    element.addEventListener("click", () => key.handleClick());
    element.addEventListener("dblclick", () => key.end());
    key.audio.addEventListener("timeupdate", () => key.handleProgress());
    return key;
});

document.addEventListener("keydown", (event) => {
    keyElements
        .filter((element) => element.hasAttribute("keymap"))
        .filter((element) => {
            return event.key === element.attributes.keymap.nodeValue ||
                event.key.toLowerCase() === element.attributes.keymap.nodeValue;
        })
        .forEach((element) => {
            if (event.key === event.key.toLowerCase()) {
                element.dispatchEvent(new Event("click"));
            } else {
                element.dispatchEvent(new Event("dblclick"));
            }
        });
});