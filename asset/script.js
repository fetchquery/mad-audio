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
        if (!this.progressElement.classList.contains("playing")) {
            this.progressElement.classList.add("playing");
        }
        this.isPlaying = true;
    }

    pause() {
        this.time = this.audio.currentTime;
        this.audio.pause();
        this.progressElement.classList.remove("playing");
        this.isPlaying = false;
    }

    end() {
        this.time = 0;
        this.audio.pause();
        this.progressElement.classList.remove("playing");
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
    const key = new Key(element, element.attributes.src.nodeValue);
    element.addEventListener("click", () => key.handleClick());
    element.addEventListener("dblclick", () => key.end());
    key.audio.addEventListener("timeupdate", () => key.handleProgress());

    return key;
});

document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        keyElements
            .filter(element => element.querySelector("progress").classList.contains("playing"))
            .forEach(element => element.dispatchEvent(new Event("click")));
    } else if (event.key === "Enter") {
        keyElements.forEach(element => element.dispatchEvent(new Event("dblclick")));
    } else {
        keyElements
            .filter(element => event.key === element.attributes.play.nodeValue)
            .forEach(element => element.dispatchEvent(new Event("click")));

        keyElements
            .filter(element => event.key === element.attributes.end.nodeValue)
            .forEach(element => element.dispatchEvent(new Event("dblclick")));
    }
});