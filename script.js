const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const menu = document.querySelector("#menu").cloneNode(true);
const header = document.querySelector("#header");
const wrapper = document.querySelector("#wrapper");
const wrapperr = document.querySelector("#wrapperr");
const top_logo = document.querySelector("#top_logo");
const top_zhan = document.querySelector("#top_zhan");
const body = document.body;

// Debounce function for better performance
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Resize handler with debounce
function handleResize() {
    const screenHeight = window.innerHeight;
    if (screenHeight < 590) {
        top_logo.classList.add("d-none");
        top_zhan.classList.add("d-none");
    } else {
        top_logo.classList.remove("d-none");
        top_zhan.classList.remove("d-none");
    }
}

window.addEventListener("resize", debounce(handleResize, 100));

// Scroll handler with requestAnimationFrame
let isScrolling = false;

window.addEventListener("scroll", () => {
    if (!isScrolling) {
        requestAnimationFrame(() => {
            const scrollTop = window.scrollY || window.pageYOffset;
            if (scrollTop < window.innerHeight) {
                header.classList.remove("highlight");
            } else {
                header.classList.add("highlight");
            }
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Hamburger menu toggle
hamb.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.toggle("open");
    hamb.classList.toggle("active");
    wrapper.classList.toggle("noscroll");
    header.classList.toggle("header-fixed");
    renderPopup();
});

function renderPopup() {
    if (!popup.contains(menu)) {
        popup.appendChild(menu);
    }
}

// Close popup on link click using jQuery
jQuery(function($) {
    $(document).on("click", ".link", function() {
        $("#popup").removeClass("open");
        $("#hamb").removeClass("active");
        $("#wrapper").removeClass("noscroll");
        $("header").removeClass("header-fixed");
    });
});

// Smooth scroll to anchor
function getYOffsetForScreenWidth() {
    const screenWidth = window.innerWidth;
    const headerHeight = document.getElementById("header").offsetHeight;
    if (screenWidth >= 1200) return -55;
    if (screenWidth > 768) return -78;
    return -53;
}

function scrollToAnchor(anchorId) {
    const element = document.getElementById(anchorId);
    if (element) {
        const yOffset = getYOffsetForScreenWidth();
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
    }
}

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const anchorId = link.getAttribute("href").substring(1);
        scrollToAnchor(anchorId);
    });
});

// Modal handling
function disableBodyScroll() {
    body.classList.add("noscroll");
    wrapperr.classList.add("noscroll");
}

function enableBodyScroll() {
    body.classList.remove("noscroll");
    wrapperr.classList.remove("noscroll");
}

const openModalLinks = document.getElementsByClassName("openModal");
Array.from(openModalLinks).forEach((link) => {
    link.onclick = function() {
        const modalId = this.getAttribute("data-modal-id");
        document.getElementById(modalId).style.display = "block";
        disableBodyScroll();
    };
});

const closeModalSpans = document.querySelectorAll(".closeModal");
closeModalSpans.forEach((span) => {
    span.onclick = function() {
        const modalId = this.getAttribute("data-modal-id");
        document.getElementById(modalId).style.display = "none";
        enableBodyScroll();
    };
});

window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
        enableBodyScroll();
    }
});