document.addEventListener("DOMContentLoaded", function(){

    
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(el => {
                el.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });



    const slider = document.querySelector('.mySwiper');
    if (slider) {
        const slidesCount = slider.querySelectorAll('.swiper-slide').length;
        let maxSlides;
        if (window.innerWidth <= 576) {
            maxSlides = 2;
        } else if (window.innerWidth <= 768) {
            maxSlides = 3;
        } else if (window.innerWidth <= 1024) {
            maxSlides = 4;
        } else if (window.innerWidth <= 1440) {
            maxSlides = 5;
        } else {
            maxSlides = 6;
        }
        const slidesPerView = slidesCount >= maxSlides ? maxSlides : slidesCount;
        new Swiper('.mySwiper', {
            slidesPerView,
            spaceBetween: 20,
        });
    }





    let adminSwiper = null;

    function initAdminSwiper() {
        const slider = document.querySelector('.admin__slider');
        if (!slider) return;

        if (window.innerWidth <= 768) {
            if (!adminSwiper) {
                adminSwiper = new Swiper('.admin__slider', {
                    slidesPerView: window.innerWidth <= 576 ? 'auto' : 2,
                    spaceBetween: 20,
                });
            }
        } else {
            if (adminSwiper) {
                adminSwiper.destroy(true, true);
                adminSwiper = null;
            }
        }
    }

    initAdminSwiper();
    window.addEventListener('resize', initAdminSwiper);









    gsap.registerPlugin(ScrollTrigger)
    gsap.utils.toArray(".anim").forEach(elem => {
        gsap.fromTo(elem, 
            { opacity: 0, y: 20 }, 
            { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });




    $(document).ready(function () {
        const burgerBtn = $('#nav-icon1');
        const burger = $('.burger');
        const overlay = $('.header__opacite');
        const body = $('body');
        const header = $('.header')

        function openBurger() {
            burgerBtn.addClass('open');
            burger.addClass('active');
            overlay.addClass('active');
            body.addClass('hidden');
            header.addClass('active')
        }

        function closeBurger() {
            burgerBtn.removeClass('open');
            burger.removeClass('active');
            overlay.removeClass('active');
            body.removeClass('hidden');
            header.removeClass('active')
        }

        burgerBtn.on('click', function (e) {
            e.stopPropagation();

            if (burgerBtn.hasClass('open')) {
                closeBurger();
            } else {
                openBurger();
            }
        });

        burger.on('click', function (e) {
            e.stopPropagation();
        });

        $(document).on('click', function () {
            closeBurger();
        });

        $('.burger a').on('click', function () {
            closeBurger();
        });
    });




})