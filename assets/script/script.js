document.addEventListener("DOMContentLoaded", function () {

    // FAQ
    const faqItems = document.querySelectorAll('.faq__item');
    if (faqItems.length) {
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                faqItems.forEach(el => el.classList.remove('active'));

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }


    // Partner Swiper
    const partnerSection = document.querySelector('.partner');
    if (partnerSection && typeof Swiper !== 'undefined') {
        const slider = partnerSection.querySelector('.mySwiper');
        const prevButton = partnerSection.querySelector('.swiper__button-prev');
        const nextButton = partnerSection.querySelector('.swiper__button-next');

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

            const slidesPerView = Math.min(slidesCount, maxSlides);

            const swiperOptions = {
                slidesPerView,
                spaceBetween: 20,
            };

            if (prevButton && nextButton) {
                swiperOptions.navigation = {
                    prevEl: prevButton,
                    nextEl: nextButton,
                };
            }

            new Swiper(slider, swiperOptions);
        }
    }

    // Admin Swiper
    const adminSlider = document.querySelector('.admin__slider');
    if (adminSlider) {
        let adminSwiper = null;

        function initAdminSwiper() {
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
    }


    // GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const animItems = document.querySelectorAll('.anim');

        if (animItems.length) {
            gsap.registerPlugin(ScrollTrigger);

            gsap.utils.toArray(".anim").forEach(elem => {
                gsap.fromTo(
                    elem,
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
        }
    }


    // Burger
    if (typeof $ !== 'undefined') {
        const burgerBtn = $('#nav-icon1');
        const burger = $('.burger');
        const overlay = $('.header__opacite');
        const body = $('body');
        const header = $('.header');

        if (burgerBtn.length && burger.length) {
            function openBurger() {
                burgerBtn.addClass('open');
                burger.addClass('active');
                overlay.addClass('active');
                body.addClass('hidden');
                header.addClass('active');
            }

            function closeBurger() {
                burgerBtn.removeClass('open');
                burger.removeClass('active');
                overlay.removeClass('active');
                body.removeClass('hidden');
                header.removeClass('active');
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
                if (burgerBtn.hasClass('open')) {
                    closeBurger();
                }
            });

            $('.burger a').on('click', function () {
                closeBurger();
            });
        }


        // Header Scroll
        const headerBlock = $('.header');

        if (headerBlock.length) {
            function toggleHeaderScroll() {
                if ($(window).scrollTop() > 0) {
                    headerBlock.addClass('scroll');
                } else {
                    headerBlock.removeClass('scroll');
                }
            }

            toggleHeaderScroll();

            $(window).on('scroll', function () {
                toggleHeaderScroll();
            });
        }
    }


    // Filter Selects
    const filterSelects = document.querySelectorAll('.filter__select');
    if (filterSelects.length) {
        filterSelects.forEach(select => {
            const button = select.querySelector('.filter__select-button');
            const buttonText = button?.querySelector('span');
            const options = select.querySelectorAll('.filter__select-dropdown button');

            if (!button || !buttonText || !options.length) return;

            button.addEventListener('click', (e) => {
                e.stopPropagation();

                filterSelects.forEach(item => {
                    if (item !== select) item.classList.remove('active');
                });

                select.classList.toggle('active');
            });

            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();

                    const optionText = option.querySelector('span');
                    if (!optionText) return;

                    const currentValue = buttonText.textContent.trim();
                    const newValue = optionText.textContent.trim();

                    buttonText.textContent = newValue;
                    optionText.textContent = currentValue;

                    select.classList.remove('active');
                });
            });
        });

        document.addEventListener('click', () => {
            filterSelects.forEach(select => {
                select.classList.remove('active');
            });
        });
    }


    // Reset Filters
    const resetButton = document.querySelector('.filter__button');
    if (resetButton && filterSelects.length) {
        resetButton.addEventListener('click', () => {
            filterSelects.forEach(select => {
                const defaultValue = select.dataset.default;
                const buttonText = select.querySelector('.filter__select-button span');
                const options = select.querySelectorAll('.filter__select-dropdown button span');

                if (!defaultValue || !buttonText || !options.length) return;

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


    // Filter Show More
    const filterBlocks = document.querySelectorAll('.filter__block');
    const showMoreButton = document.querySelector('.filter__right-button');
    if (filterBlocks.length && showMoreButton) {
        const visibleCount = window.innerWidth <= 1024 ? 2 : 4;

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
    }


    // Contact Select
    const contactSelects = document.querySelectorAll('.contact__field-select');
    if (contactSelects.length) {
        contactSelects.forEach(select => {
            const button = select.querySelector('.contact__field-button');
            const value = select.querySelector('.contact__field-value');
            const options = select.querySelectorAll('.contact__field-dropdown button');
            const hiddenInput = select.querySelector('input[type="hidden"]');

            if (!button || !value || !options.length) return;

            button.addEventListener('click', (e) => {
                e.stopPropagation();

                contactSelects.forEach(item => {
                    if (item !== select) {
                        item.classList.remove('active');
                    }
                });

                select.classList.toggle('active');
            });

            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();

                    const selectedText = option.textContent.trim();
                    const currentText = value.textContent.trim();

                    value.textContent = selectedText;
                    option.textContent = currentText;

                    if (hiddenInput) {
                        hiddenInput.value = selectedText;
                    }

                    select.classList.remove('active');
                });
            });
        });

        document.addEventListener('click', () => {
            contactSelects.forEach(select => {
                select.classList.remove('active');
            });
        });
    }



    const moreCards = document.querySelectorAll('[data-more-card="true"]');
    const moreButton = document.querySelector('.events-upcoming__more');
    if (moreButton && moreCards.length) {
        moreCards.forEach(card => {
            card.style.display = 'none';
        });

        moreButton.addEventListener('click', () => {
            moreCards.forEach(card => {
                card.style.display = '';
            });

            moreButton.style.display = 'none';
        });
    } else if (moreButton) {
        moreButton.style.display = 'none';
    }




    const modal = document.querySelector('[data-modal="partner"]');
    const modalContent = modal?.querySelector('.contact__form');
    const modalClose = modal?.querySelector('.modal__close');
    const opacite = document.querySelector('.opacite');
    const openButtons = document.querySelectorAll('[data-modal-open="partner"]');

    if (modal && modalContent && opacite && openButtons.length) {
        const openModal = () => {
            modal.classList.add('active');
            opacite.classList.add('active');
            document.body.classList.add('hidden');
        };

        const closeModal = () => {
            modal.classList.remove('active');
            opacite.classList.remove('active');
            document.body.classList.remove('hidden');
        };

        openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openModal();
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (!modalContent.contains(e.target)) {
                closeModal();
            }
        });

        opacite.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }






});