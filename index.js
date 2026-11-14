function changeTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem("savedTheme", themeName);
}

function playSound(name) {
    let audio = document.getElementById("audio-" + name);
    let slider = document.getElementById("vol-" + name);
    let btn = document.getElementById("btn-" + name);

    if (audio.paused) {
        if (slider.value == 0) {
            slider.value = 0.5;
        }

        audio.volume = slider.value;
        audio.play();
        btn.innerText = "Pause";
    } else {
        audio.pause();
        btn.innerText = "Play";
    }
}

function changeVol(name) {
    let audio = document.getElementById("audio-" + name);
    let slider = document.getElementById("vol-" + name);
    let btn = document.getElementById("btn-" + name);

    audio.volume = slider.value;

    if (slider.value > 0 && audio.paused) {
        audio.play();
        btn.innerText = "Pause";
    }

    if (slider.value == 0) {
        audio.pause();
        btn.innerText = "Play";
    }
}

let timeLeft = 1500;
let timer = null;

function showTime() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;

    if ( mins < 10) {
        mins = "0" + mins;
    }

    if ( secs < 10) {
        secs = "0" + secs;
    }

    document.getElementById("countdown").innerText = mins + ":" + secs;
}

function startTimer() {
    if (timer!= null) {
        return;
    }

    timer = setInterval(function(){
        if (timeLeft > 0) {
            timeLeft = timeLeft - 1;
            showTime();
        } else {
            clearInterval(timer);
            timer = null;
            alert("Timer is up! take a break now gng")
        }
    }, 1000)
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    pauseTimer();
    timeLeft = 1500;
    showTime();
}

function addTask() {
    let input = document.getElementById("task-input");
    
    let list = document.getElementById("todo-list");

    if (input.value == "") {
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text" onclick="this.classList.toggle('done'); saveTasks();" style="cursor: pointer;">${input.value}</span>
        <button class="task-btn" onclick="this.parentElement.remove(); saveTasks();">X</button>
    `;

    list.appendChild(li);
    input.value = "";
    saveTasks();
}

function saveTasks() {
    let listHtml = document.getElementById("todo-list").innerHTML;

    localStorage.setItem("savedTasks", listHtml)
}

function saveNotes() {
    let notesText = document.getElementById("sticky").value;
    localStorage.setItem("savedNotes", notesText);
}

// saving all the stuff in local storage

window.onload = function() {
    let savedTheme = localStorage.getItem("savedTheme");
    if ( savedTheme != null) {
        document.body.className = savedTheme;
    }

    let savedNotes = localStorage.getItem("savedNotes");
    if (savedNotes != null) {
        document.getElementById("sticky").value = savedNotes;
    }

    let savedTasks = localStorage.getItem("savedTasks");
    if (savedTasks != null) {
        document.getElementById("todo-list").innerHTML = savedTasks;
    }
}


// sessions streak thingy

let sessions = 0;

function setMode(minutes) {
    pauseTimer();
    timeLeft = minutes * 60;

    showTime();
}

function addSession() {
    sessions = sessions + 1;
    document.getElementById("sessions-count").innerText = sessions;

    localStorage.setItem("savedSessions", sessions);
}



// volume presets
function setPreset(rainVol, fireVol, keyVol, lofiVol) {
    document.getElementById("vol-rain").value = rainVol;
    changeVol("rain");

    document.getElementById("vol-fire").value = fireVol;
    changeVol("fire");

    document.getElementById("vol-keyboard").value = keyVol;
    changeVol("keyboard");

    document.getElementById("vol-lofi").value = lofiVol;
    changeVol("lofi");
}


// clock and quote scripts

function updateClock() {
    let now = new Date();
    document.getElementById("live-clock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);



let quotes = [
    "Focus now so you can game guilt-free later.",
    "One bug fixed is one step closer to done.",
    "Drink some water and fix your posture.",
    "Small progress is still progress.",
    "Dont stop until its done.",
    "Success is not achieved by winning all the time. Real success comes when we rise after we fall.",
    "Start where you are. Use what you have. Do what you can.",
    "Whatever the mind of man can conceive and believe, it can achieve.",
    "Strive not to be a success, but rather to be of value.",
    "You miss 100% of the  shots you dont take.",
    "The most difficult thing is the decision to act, the rest is just tenacity.",
    "Every strike will bring me to the next home run.",
    "The mind is everything. What you think you become.",
    "Eighty percent of success if showing up.",
    "Winning isnt everything, but wanting to win is.",
    "I am not a product of my circumstances. I am a product of my decisions.",
    "You can never cross the ocean until you have the courage to lose sight of the shore."
];

function newQuote() {
    let randomNum = Math.floor(Math.random() * quotes.length);

    document.getElementById("quote-text").innerText = "` " + quotes[randomNum] + " `";
}