const cards = document.querySelectorAll(".card");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let index = 0;

function updateSlider() {
    cards.forEach(card => {
        card.classList.remove("active", "prev", "next");
    });

    const total = cards.length;

    cards[index].classList.add("active");
    cards[(index + 1) % total].classList.add("next");
    cards[(index - 1 + total) % total].classList.add("prev");
}

let isAnimating = false;

function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;

    index = (index + 1) % cards.length;
    updateSlider();

    setTimeout(() => isAnimating = false, 500);
}

function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;

    index = (index - 1 + cards.length) % cards.length;
    updateSlider();

    setTimeout(() => isAnimating = false, 500);
}

// Buttons
next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

// Keyboard
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
});

// Mouse drag (laptop)
let startX = 0;

const slider = document.querySelector(".slider");

slider.addEventListener("mousedown", (e) => {
    startX = e.clientX;
});

slider.addEventListener("mouseup", (e) => {
    let endX = e.clientX;

    if (startX > endX + 50) nextSlide();
    else if (startX < endX - 50) prevSlide();
});

// Touch swipe
slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX > endX + 50) nextSlide();
    else if (startX < endX - 50) prevSlide();
});

// Auto slide
setInterval(nextSlide, 3000);

// Init
updateSlider();

function sendToWhatsApp(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;

    let number = "918320816161";

    let text = `Hello, I want to book a ride.%0A
Name: ${name}%0A
Phone: ${phone}%0A
Details: ${message}`;

    window.open(`https://wa.me/${number}?text=${text}`, "_blank");
}