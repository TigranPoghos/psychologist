document.addEventListener("DOMContentLoaded", function () {
    const moreCards = document.querySelectorAll('[data-more-card="true"]');
    const moreButton = document.querySelector('.events-upcoming__more');
    if (moreButton) {
        if (!moreCards.length) {
            moreButton.style.display = 'none';
        } else {
            moreCards.forEach(card => card.style.display = 'none');
            moreButton.addEventListener('click', () => {
                moreCards.forEach(card => card.style.display = '');
                moreButton.style.display = 'none';
            });
        }
    }
});
