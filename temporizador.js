let timer;
let seconds = 60; // 1 minuto = 60 segundos
const duration = 3; // Duración del sonido en segundos
let repeatCount = 0; // Contador de repeticiones
const maxRepeats = 6; // Número máximo de repeticiones

function updateTimerDisplay() {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    document.getElementById("timer").innerText = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timer) {
        clearInterval(timer); // Detener cualquier temporizador existente
    }
    seconds = 60; // Restablecer a 1 minuto
    updateTimerDisplay();

    timer = setInterval(() => {
        seconds--;
        updateTimerDisplay();

        if (seconds <= 0) {
            clearInterval(timer);
            let sound = document.getElementById("timerSound");
            sound.play();
            sound.currentTime = 0; // Asegurarse de empezar desde el inicio del audio

            sound.addEventListener('timeupdate', function() {
                if (sound.currentTime >= duration) {
                    sound.pause();

                    repeatCount++;
                    if (repeatCount < maxRepeats) {
                        startTimer(); // Reiniciar el temporizador si no se ha alcanzado el máximo de repeticiones
                    }
                }
            }, false);
        }
    }, 1000);
}

document.getElementById("startTimer").addEventListener("click", () => {
    repeatCount = 0; // Reiniciar el conteo de repeticiones
    startTimer();
});
