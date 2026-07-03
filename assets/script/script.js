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






    function toggleHeaderScroll() {
        if ($(window).scrollTop() > 0) {
            $('.header').addClass('scroll');
        } else {
            $('.header').removeClass('scroll');
        }
    }
    toggleHeaderScroll();
    $(window).on('scroll', function () {
        toggleHeaderScroll();
    });





    document.querySelectorAll('.filter__select').forEach(select => {
        const button = select.querySelector('.filter__select-button');
        const buttonText = button.querySelector('span');
        const options = select.querySelectorAll('.filter__select-dropdown button');
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.filter__select').forEach(item => {
                if (item !== select) item.classList.remove('active');
            });
            select.classList.toggle('active');
        });
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const optionText = option.querySelector('span');
                const currentValue = buttonText.textContent.trim();
                const newValue = optionText.textContent.trim();
                buttonText.textContent = newValue;
                optionText.textContent = currentValue;
                select.classList.remove('active');
            });
        });
    });
    document.addEventListener('click', () => {
        document.querySelectorAll('.filter__select').forEach(select => {
            select.classList.remove('active');
        });
    });
    const resetButton = document.querySelector('.filter__button');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            document.querySelectorAll('.filter__select').forEach(select => {
                const defaultValue = select.dataset.default;
                const buttonText = select.querySelector('.filter__select-button span');
                const options = select.querySelectorAll('.filter__select-dropdown button span');
                if (buttonText.textContent.trim() === defaultValue) return;
                options.forEach(option => {
                    if (option.textContent.trim() === defaultValue) {
                        const currentValue = buttonText.textContent.trim();

                        buttonText.textContent = defaultValue;
                        option.textContent = currentValue;
                    }
                });
                select.classList.remove('active');
            });
        });
    }



    const filterBlocks = document.querySelectorAll('.filter__block');
    const showMoreButton = document.querySelector('.filter__right-button');
    const visibleCount = 4;
    if (filterBlocks.length <= visibleCount) {
        showMoreButton.style.display = 'none';
    } else {
        filterBlocks.forEach((block, index) => {
            if (index >= visibleCount) {
                block.style.display = 'none';
            }
        });
        showMoreButton.addEventListener('click', () => {
            filterBlocks.forEach(block => {
                block.style.display = '';
            });
            showMoreButton.style.display = 'none';
        });
    }








})