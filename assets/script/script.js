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

        const slidesPerView =
            slidesCount >= 6
                ? 6
                : Math.max(3, slidesCount);

        new Swiper('.mySwiper', {
            slidesPerView,
            spaceBetween: 20,
        });
    }



})