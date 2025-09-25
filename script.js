document.addEventListener("DOMContentLoaded", () => {
  const sidenavbar = document.querySelector(".sidenav");
  const menuIcon = document.querySelector(".menu-icon");
  const closeBtn = document.querySelector(".x");

  function shownavbar() {
    sidenavbar.style.left = "0%";
  }

  function closenavbar() {
    sidenavbar.style.left = "-100%";
  }

  menuIcon.addEventListener("click", shownavbar);
  closeBtn.addEventListener("click", closenavbar);
});
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let index = 0;

// Create dots dynamically
images.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    index = i;
    showSlide();
    resetAutoSlide();
  });
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dots span');

function showSlide() {
  slides.style.transform = `translateX(${-index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  index = (index + 1) % images.length;
  showSlide();
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide();
}

next.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

prev.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

// Swipe support (mobile)
let startX = 0;
slides.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slides.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX > endX + 50) {
    nextSlide();
  } else if (startX < endX - 50) {
    prevSlide();
  }
  resetAutoSlide();
});

// Auto slide (5s)
let autoSlide = setInterval(nextSlide, 5000);

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 5000);
}

