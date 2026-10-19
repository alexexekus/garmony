document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.gallery-track');
    if (track) {
        const slides = track.querySelectorAll('img');
        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');
        const dotsContainer = document.querySelector('.gallery-dots');
        let index = 0;

        slides.forEach(function (_, i) {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', 'Фото ' + (i + 1));
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function () {
                goTo(i);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('button');

        function goTo(i) {
            index = (i + slides.length) % slides.length;
            track.style.transform = 'translateX(-' + index * 100 + '%)';
            dots.forEach(function (d, j) {
                d.classList.toggle('active', j === index);
            });
        }

        if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); });

        setInterval(function () {
            goTo(index + 1);
        }, 6000);
    }

    const forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const required = form.querySelectorAll('[required]');
            let ok = true;
            required.forEach(function (field) {
                if (!field.value.trim()) {
                    ok = false;
                    field.style.borderBottomColor = '#c0392b';
                } else {
                    field.style.borderBottomColor = '';
                }
            });
            if (ok) {
                alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
                form.reset();
            } else {
                alert('Пожалуйста, заполните все обязательные поля.');
            }
        });
    });
});