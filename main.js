// Loading Screen - Espera a que TODO cargue
let loaderShown = false;

window.addEventListener('load', () => {
    // Esperar a que las imágenes se carguen
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
        // Si no hay imágenes, mostrar después de 6 segundos
        showMainContent(6000);
    } else {
        // Contar imágenes cargadas
        images.forEach(img => {
            if (img.complete) {
                imagesLoaded++;
            } else {
                img.addEventListener('load', () => {
                    imagesLoaded++;
                    checkAllLoaded();
                });
                img.addEventListener('error', () => {
                    imagesLoaded++;
                    checkAllLoaded();
                });
            }
        });
        checkAllLoaded();
    }

    function checkAllLoaded() {
        if (imagesLoaded >= totalImages && !loaderShown) {
            // Todas las imágenes cargadas, esperar mínimo 6 segundos
            showMainContent(6000);
        }
    }
});

function showMainContent(minTime) {
    if (loaderShown) return;
    loaderShown = true;
    
    setTimeout(() => {
        document.getElementById('loader').classList.add('fade-out');
        document.getElementById('mainWrapper').classList.add('visible');
    }, minTime);
}

// Countdown Timer
const countdownDate = new Date('December 25, 2025 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar elementos del DOM
    document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.mini-countdown').innerHTML = "¡Feliz Navidad!";
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Llamada inicial

// Mejorado efecto de nieve
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

class Snowflake {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.swing = 0;
        this.swingSpeed = Math.random() * 0.02;
    }

    update() {
        this.swing += this.swingSpeed;
        this.x += Math.sin(this.swing) * 0.5 + this.wind;
        this.y += this.speed;

        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

const snowflakes = [];
const SNOW_COUNT = 150;

// Inicializar copos de nieve mejorados
for (let i = 0; i < SNOW_COUNT; i++) {
    snowflakes.push(new Snowflake());
}

// Función de animación mejorada
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
    });
    
    requestAnimationFrame(animate);
}

// Event Listeners
window.addEventListener('resize', () => {
    resizeCanvas();
});

// Iniciar animación
animate();

const audio = document.getElementById("bg-audio");
const soundBtn = document.getElementById("sound-btn");

let audioActivated = false;

// Función para activar el audio
function activarAudio() {
    if (!audioActivated) {
        audio.muted = false;
        audio.volume = 1;
        audio.play();
        soundBtn.classList.remove("sound-off");
        soundBtn.classList.add("sound-on");
        audioActivated = true;
    }
}

// Activar audio con interacción del usuario (tap, clic, scroll)
document.addEventListener("click", activarAudio, { once: true });
document.addEventListener("touchstart", activarAudio, { once: true });
document.addEventListener("scroll", activarAudio, { once: true });

// Activar o mutear con el botón
soundBtn.addEventListener("click", () => {
    if (audio.muted) {
        activarAudio(); // si está desactivado, lo activa
    } else {
        audio.muted = true;
        soundBtn.classList.remove("sound-on");
        soundBtn.classList.add("sound-off");
        audioActivated = false;
    }
});
