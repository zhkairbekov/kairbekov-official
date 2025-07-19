const hamb = document.querySelector("#hamb"); const popup = document.querySelector("#popup"); const menu = document.querySelector("#menu").cloneNode(true); const header = document.querySelector("#header"); const wrapper = document.querySelector("#wrapper"); const top_logo = document.querySelector("#top_logo"); const top_zhan = document.querySelector("#top_zhan"); const body = document.body; function debounce(func, wait) { let timeout; return function (...args) { const context = this; clearTimeout(timeout); timeout = setTimeout(() => func.apply(context, args), wait) } } function handleResize() { const screenHeight = window.innerHeight; if (screenHeight < 590) { top_logo.classList.add("d-none"); top_zhan.classList.add("d-none") } else { top_logo.classList.remove("d-none"); top_zhan.classList.remove("d-none") } } window.addEventListener("resize", debounce(handleResize, 100)); let isScrolling = false; window.addEventListener("scroll", () => { if (!isScrolling) { requestAnimationFrame(() => { const scrollTop = window.scrollY || window.pageYOffset; if (scrollTop < window.innerHeight) { header.classList.remove("highlight") } else { header.classList.add("highlight") } isScrolling = false }); isScrolling = true } }); hamb.addEventListener("click", (e) => { e.preventDefault(); popup.classList.toggle("open"); hamb.classList.toggle("active"); wrapper.classList.toggle("noscroll"); header.classList.toggle("header-fixed"); renderPopup() }); function renderPopup() { if (!popup.contains(menu)) { popup.appendChild(menu) } } document.addEventListener("DOMContentLoaded", function () { document.addEventListener("click", function (event) { if (event.target.closest(".link")) { document.getElementById("popup")?.classList.remove("open"); document.getElementById("hamb")?.classList.remove("active"); document.getElementById("wrapper")?.classList.remove("noscroll"); document.querySelector("header")?.classList.remove("header-fixed") } }) }); function getYOffsetForScreenWidth() { const screenWidth = window.innerWidth; const headerHeight = document.getElementById("header").offsetHeight; if (screenWidth >= 1200) return -55; if (screenWidth > 768) return -78; return -53 } function scrollToAnchor(anchorId) { const element = document.getElementById(anchorId); if (element) { const yOffset = getYOffsetForScreenWidth(); const y = element.getBoundingClientRect().top + window.scrollY + yOffset; window.scrollTo({ top: y, behavior: "smooth" }) } } const links = document.querySelectorAll('a[href^="#"]'); links.forEach((link) => { link.addEventListener("click", (event) => { event.preventDefault(); const anchorId = link.getAttribute("href").substring(1); scrollToAnchor(anchorId) }) }); function disableBodyScroll() { body.classList.add("noscroll") } function enableBodyScroll() { body.classList.remove("noscroll") } const openModalLinks = document.getElementsByClassName("openModal"); Array.from(openModalLinks).forEach((link) => { link.onclick = function () { const modalId = this.getAttribute("data-modal-id"); document.getElementById(modalId).style.display = "block"; disableBodyScroll() } }); const closeModalSpans = document.querySelectorAll(".closeModal"); closeModalSpans.forEach((span) => { span.onclick = function () { const modalId = this.getAttribute("data-modal-id"); document.getElementById(modalId).style.display = "none"; enableBodyScroll() } }); window.addEventListener("click", (event) => { if (event.target.classList.contains("modal")) { event.target.style.display = "none"; enableBodyScroll() } });

const cursor = document.getElementById('cursor');
const cursorBg = document.getElementById('cursor-bg');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let bgX = 0, bgY = 0;

// Только сохраняем координаты при движении мыши
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Основной цикл движения — только через requestAnimationFrame
function animate() {
  // Мгновенно двигаем точку-курсор
  cursorX = mouseX;
  cursorY = mouseY;
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

  // Плавно двигаем подложку
  bgX += (mouseX - bgX) * 0.1;
  bgY += (mouseY - bgY) * 0.1;
  cursorBg.style.transform = `translate(${bgX}px, ${bgY}px) translate(-50%, -50%)`;

  requestAnimationFrame(animate);
}
animate();

// Клик
document.addEventListener('mousedown', () => {
  cursor.classList.add('clicked');
  cursorBg.classList.add('clicked');
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('clicked');
  cursorBg.classList.remove('clicked');
});

// Наведение на цели
const targets = document.querySelectorAll('.hover-target');
targets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    cursorBg.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    cursorBg.classList.remove('hovered');
  });
});
