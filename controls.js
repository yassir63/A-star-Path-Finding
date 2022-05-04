let paused = false;
document.addEventListener('keypress', (e) => {
    if (e.key == "P" || e.key == "p") {
        if (!paused) {
            noLoop()
            paused = true;
        } else {
            loop();
            paused = false;
        }
    }
})

function stop() {

    noLoop()
    paused = true;

}

function run() {

    loop();
    paused = false;

}




document.addEventListener('keypress', (s) => {
    if (s.key == " ") {
        if (!paused) {
            loop();
            paused = false;
        }
    }
})



document.addEventListener('keypress', (x) => {
    if (x.key == "S" || x.key == "s") {
        if (!setUp) {
            setUp = true;
            loop();
        } else {
            setUp = false;
            noLoop();

        }
    }
})