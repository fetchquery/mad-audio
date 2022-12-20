class KeyElement extends HTMLDivElement {
    constructor() {
        super();
        const section = this.getAttribute("section");
        const src = this.getAttribute("src");
        const play = this.getAttribute("play");
        const end = this.getAttribute("end");
        const keymap = this.getAttribute("keymap");
        const description = this.getAttribute("description");

        const keyDiv = document.createElement("div");
        const keymapDiv = document.createElement("div");
        const descriptionDiv = document.createElement("div");
        const progress = document.createElement("progress");
        const link = document.createElement("link");

        keyDiv.classList.add("key");
        keyDiv.classList.add(section);
        keyDiv.setAttribute("src", src);
        keyDiv.setAttribute("play", play);
        keyDiv.setAttribute("end", end);

        keymapDiv.classList.add("keymap");
        keymapDiv.innerText = keymap;

        descriptionDiv.classList.add("description");
        descriptionDiv.innerText = description;

        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "asset/style.css");

        keyDiv.appendChild(keymapDiv);
        keyDiv.appendChild(descriptionDiv);
        keyDiv.appendChild(progress);
        keyDiv.appendChild(link);

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(keyDiv);
    }
}

customElements.define("key-element", KeyElement, { extends: "div" });

/*
<div
    is="key-element"
    section="emotion"
    src="dist/emotion/conflict.mp3"
    play="1"
    end="!"
    keymap="1"
    description="Conflict"
/></div>
*/