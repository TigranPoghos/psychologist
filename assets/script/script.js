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

        if (window.innerWidth <= 768) {
            maxSlides = 3;
        } else if (window.innerWidth <= 1024) {
            maxSlides = 4;
        } else if (window.innerWidth <= 1440) {
            maxSlides = 5;
        } else {
            maxSlides = 6;
        }

        const slidesPerView =
            slidesCount >= maxSlides
                ? maxSlides
                : Math.max(3, slidesCount);

        new Swiper('.mySwiper', {
            slidesPerView,
            spaceBetween: 20,
        });
    }



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


})