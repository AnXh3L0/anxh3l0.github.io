var lastChild = null;
document.onkeydown = function(e) {
    if (document.activeElement.className != "note") {
        if (e.key == "Escape" && lastChild) {
            document.body.appendChild(lastChild);
        }
        document.getElementById("search").focus();
    } else {
        if (e.key == "Escape") {
            lastChild = document.activeElement;
            document.body.removeChild(document.activeElement);
            lmpos = [0, 0];
        }
        storeNotes();
    }
}

function updateClock() {
    var now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    if (minutes < 10) {
        time = hours + ':' + "0" + minutes;
    } else {
        time = hours + ':' + minutes;
    }
    if (hours < 10) {
        time = "0" + time;
    }
    document.getElementById('time').innerHTML = time;
    setTimeout(updateClock, 1000);
}

updateClock();

var lmpos = [0, 0];

function storeNotes() {
    notes = document.getElementsByClassName("note");
    savefile = [];
    for (var i = 0; i < notes.length; i++) {
        color = notes[i].style.backgroundColor;
        x = parseInt(notes[i].style.left);
        y = parseInt(notes[i].style.top);
        content = notes[i].value;
        savefile.push([color, x, y, content.split(".").join("&punt:").split(";").join("&punticoma:")].join("."));
    }
    localStorage.setItem("savefile", savefile.join(";"));
}
class note {
    constructor() {
        this.n = document.createElement("textarea");
        this.n.className = "note";
        this.n.spellcheck = false;
        this.n.onmousedown = function(e) {
            this.setAttribute("data-dragging", "ye");
        }
        this.n.onmouseup = this.n.onmouseleave = function(e) {
            this.setAttribute("data-dragging", "na");
            lmpos = [0, 0];
            storeNotes();
        }
        this.n.onmousemove = function(e) {
            if (this.getAttribute("data-dragging") == "ye") {
                if (lmpos[0] != 0 && lmpos[1] != 0) {
                    this.style.left = parseInt(this.style.left) + e.clientX - lmpos[0] + "px";
                    this.style.top = parseInt(this.style.top) + e.clientY - lmpos[1] + "px";
                }
                lmpos = [e.clientX, e.clientY];
            }
        }
    }
    makeup(color, x, y, content = "") {
        this.n.style.backgroundColor = color;
        this.n.style.top = y + "px";
        this.n.style.left = x + "px";
        this.n.value = content;
    }
    stick() {
        document.body.appendChild(this.n);
        storeNotes();
    }
}

try {
    if (localStorage.getItem("savefile")) {
        sn = localStorage.getItem("savefile").split(";");
        for (var i = 0; i < sn.length; i++) {
            saved = sn[i].split(".");
            n = new note();
            n.makeup(saved[0], saved[1], saved[2], saved[3].split("&punt:").join(".").split("&punticoma:").join(";"));
            n.stick();
        }
    }
} catch (e) {
    console.log("You are unironically a stupid loser.");
}

var colors = ["#341A32", "#341A1E", "#342C1A", "#1A341A", "#1A3433", "#1A1F34"];

function createNote(x, y) {
    n = new note();
    color = colors[parseInt(Math.random() * colors.length)];
    n.makeup(color, x, y);
    n.stick();
}