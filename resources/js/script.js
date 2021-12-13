$(document).ready(function() {
    $(".js--section-feature").waypoint(
        function(direction) {
            if (direction == "down") {
                $("nav").addClass("sticky");
                $(".fa--up").addClass("uparrow");
                $(".fa--up").css("display", "flex");
            } else {
                $("nav").removeClass("sticky");
                $(".fa--up").removeClass("uparrow");
                $(".fa--up").css("display", "none");
            }
        }, {
            offset: "150px",
        }
    );


    // Scroll nav effect
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ?
                    target :
                    $("[name=" + this.hash.slice(1) + "]");
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $("html, body").animate({
                            scrollTop: target.offset().top,
                        },
                        100,
                        function() {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) {
                                // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            }
                        }
                    );
                }
            }
        });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.to-top').css({ 'opacity': '1', 'bottom': '20px' });
        } else {
            $('.to-top').css({ 'opacity': '0', 'bottom': '0px' });
        }
    })
    $(".to-top").click(function() {
        $('html ,body').animate({ scrollTop: 0 }, 300);
    })







});

const navLinks = document.querySelectorAll(".navlink");
const navToggler = document.querySelector(".navtogglerbtn");
const navTogglerChildClass = navToggler.children[0].classList;
const max995px = window.matchMedia("(max-width:995px)"); //media query
const preloader = document.querySelector(".preloader");


const galleryLightbox = GLightbox({
    selector: ".gallery-lightbox",
});

// animation on scroll
AOS.init({
    duration: 500,
    easing: "ease-in-out",
    once: true,
    mirror: false,
});

window.onload = () => {

    preloader.style.opacity = "0";
    setTimeout(() => {
        preloader.style.display = "none";
    }, 1000);
}



const changemenubtn = () => {
    if (navTogglerChildClass.value == "bx bx-menu") {
        navTogglerChildClass.value = "bx bxs-chevron-up";
    } else {
        navTogglerChildClass.value = "bx bx-menu";
    }
};
navToggler.addEventListener("click", () => {
    changemenubtn();
});
let click = 0;
for (let i = 0; i <= navLinks.length; i++) {
    navToggler.addEventListener("click", () => {
        navLinks[i].removeAttribute("data-bs-toggle", "collapse");
        navLinks[i].removeAttribute("data-bs-target", "#navbarSupportedContent");
    });
    navLinks[i].addEventListener("click", () => {
        click = 0;
        if (
            max995px.matches //media query is true of false
        ) {
            setTimeout(() => {
                navLinks[i].setAttribute("data-bs-toggle", "collapse");
                navLinks[i].setAttribute("data-bs-target", "#navbarSupportedContent");
                if (click < 1) {
                    changemenubtn();
                    navLinks[i].click();
                }
                click++;
            }, 300);
        }
        //width change listener
        max995px.addListener(() => {
            navLinks[i].removeAttribute("data-bs-toggle", "collapse");
            navLinks[i].removeAttribute("data-bs-target", "#navbarSupportedContent");
        });

        for (let j = 0; j <= navLinks.length; j++) {

            navLinks[j].classList.remove('active');
            if (navLinks[j] == navLinks[i]) {
                navLinks[i].classList.add('active');
            }
        };
    });
}

// back to top

// window.addEventListener("scroll", () => {
//     console.log(window.scrollY);
//     if (window.scrollY > 10) {
//         toTop.classList.toggle("activet");
//     }
// })