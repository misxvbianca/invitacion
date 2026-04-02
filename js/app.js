// js/app.js

// --- 1. CUENTA REGRESIVA ---
// Fecha exacta de la fiesta de Bianca
const fechaFiesta = new Date("May 02, 2026 20:00:00").getTime();

const intervalo = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaFiesta - ahora;

    // Cálculos matemáticos de tiempo
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Inyectamos los resultados en el HTML agregando un "0" si es menor a 10
    document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
    document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;

    // Si la fecha ya pasó
    if (distancia < 0) {
        clearInterval(intervalo);
        document.getElementById("countdown").innerHTML = "<h2>¡A disfrutar de la fiesta bajo las estrellas!</h2>";
    }
}, 1000);


// --- 2. REPRODUCTOR DE MÚSICA (HTML5 Audio) ---
const audioFondo = document.getElementById('bg-audio');
const musicBtn = document.getElementById('music-btn');

// Bajar el volumen al 50% para que no asuste al cargar
audioFondo.volume = 0.5;

// Truco para intentar reproducir la música al primer clic o toque en cualquier parte de la pantalla
window.addEventListener('click', () => {
    if(audioFondo.paused) {
        audioFondo.play().catch(error => {
            console.log("El navegador bloqueó la reproducción automática.");
        });
        musicBtn.innerText = "🎵 Pausar Música";
    }
}, { once: true }); // El evento global solo se ejecuta una vez

// Control manual del botón visible
musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita conflictos con el clic global de arriba
    
    if (audioFondo.paused) {
        audioFondo.play();
        musicBtn.innerText = "🎵 Pausar Música";
    } else {
        audioFondo.pause();
        musicBtn.innerText = "🔇 Reproducir Música";
    }
});
