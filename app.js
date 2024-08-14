let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    currentSlide += direction;

    // Зацикливание слайдера
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    // Сдвиг слайдов
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}
const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('nav');

burgerMenu.addEventListener('click', function() {
    nav.classList.toggle('active');
    burgerMenu.classList.toggle('active'); // Меняем состояние бургер-меню
});

// Закрываем меню при клике вне него
document.addEventListener('click', function(event) {
    if (!burgerMenu.contains(event.target) && !nav.contains(event.target)) {
        nav.classList.remove('active');
        burgerMenu.classList.remove('active');
    }
});

function openProductDetail(product) {
    const detailView = document.querySelector('.product-detail');
    const mainImage = detailView.querySelector('.main-image');
    const gallery = detailView.querySelector('.gallery');
    const productTitle = detailView.querySelector('.product-detail-title');
    const detailsList = detailView.querySelector('.product-details-list');

    // Устанавливаем данные товара
    const productImageSrc = product.querySelector('.product-image').src;
    mainImage.src = productImageSrc;
    productTitle.textContent = product.querySelector('.product-title').textContent;
    
    // Список характеристик товара
    const descriptionText = product.querySelector('.description-text').innerHTML;
    const details = descriptionText.split('<br>').map(line => line.trim()).filter(line => line);

    // Заполняем список характеристик
    detailsList.innerHTML = '';
    details.forEach(function(detail) {
        const listItem = document.createElement('li');
        listItem.textContent = detail;
        detailsList.appendChild(listItem);
    });

    // Копируем изображения из галереи товара
    const galleryImages = [];
    gallery.innerHTML = '';
    product.querySelectorAll('.gallery-image').forEach(function(img) {
        const galleryImage = document.createElement('img');
        galleryImage.src = img.src;
        galleryImage.alt = img.alt;
        galleryImage.classList.add('gallery-image');
        galleryImage.addEventListener('click', function() {
            mainImage.src = this.src;
        });
        gallery.appendChild(galleryImage);
        galleryImages.push(img.src);
    });

    detailView.style.display = 'flex';

    // Настраиваем функциональность для полноэкранного режима
    mainImage.addEventListener('click', function() {
        openFullscreenImage(mainImage.src, galleryImages);
    });
}

function closeProductDetail() {
    document.querySelector('.product-detail').style.display = 'none';
}

function openFullscreenImage(src, images) {
    const fullscreen = document.querySelector('.fullscreen-image');
    const fullscreenImg = fullscreen.querySelector('img');
    let currentIndex = images.indexOf(src);

    function updateImage(index) {
        fullscreenImg.src = images[index];
    }

    updateImage(currentIndex);

    fullscreen.style.display = 'flex';

    function onPrevClick() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateImage(currentIndex);
    }

    function onNextClick() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateImage(currentIndex);
    }

    fullscreen.querySelector('.prev-button').addEventListener('click', onPrevClick);
    fullscreen.querySelector('.next-button').addEventListener('click', onNextClick);

    fullscreen.querySelector('.close-fullscreen').addEventListener('click', function() {
        fullscreen.style.display = 'none';
    });
}

// Пример функции для открытия детального просмотра по клику на изображение товара
document.querySelectorAll('.product-block').forEach(block => {
    block.addEventListener('click', function() {
        openProductDetail(this);
    });
});

// Функция для закрытия детального просмотра
document.querySelector('.close-button').addEventListener('click', closeProductDetail);

// Открываем каталог
const catalogButton = document.querySelector('#catalogButton');
const katalog = document.querySelector('.katalog');
const btnClose = document.querySelector('.btnClose');
const btnOpen = document.querySelector('.btnOpen');

function openCatalog() {
    katalog.classList.add('open');
    btnOpen.style.display = 'none';
    btnClose.style.display = 'block';
}

function closeCatalog() {
    katalog.classList.remove('open');
    btnOpen.style.display = 'block';
    btnClose.style.display = 'none';
}

// Обработчик клика для кнопки "Показать каталог"
catalogButton.addEventListener('click', openCatalog);

// Добавляем обработчик клика для кнопки закрытия каталога
btnClose.addEventListener('click', closeCatalog);

// Добавляем обработчик клика для кнопки открытия каталога (если она необходима)
if (btnOpen) {
    btnOpen.addEventListener('click', openCatalog);
}

// Функция для отображения/скрытия кнопки в зависимости от прокрутки
function handleScroll() {
    if (window.scrollY > 500) {
        catalogButton.classList.add('show');
    } else {
        catalogButton.classList.remove('show');
    }
}

// Обработчик события скролла
window.addEventListener('scroll', handleScroll);

// Функция для открытия каталога
function openCatalog() {
    katalog.classList.add('open');
    btnOpen.style.display = 'none';
    btnClose.style.display = 'block';
}

// Функция для закрытия каталога
function closeCatalog() {
    katalog.classList.remove('open');
    btnOpen.style.display = 'block';
    btnClose.style.display = 'none';
}

// Добавляем обработчик клика для кнопки открытия каталога
if (catalogButton) {
    catalogButton.addEventListener('click', openCatalog);
}

// Обработчик клика для кнопки закрытия каталога
if (btnClose) {
    btnClose.addEventListener('click', closeCatalog);
}

document.addEventListener("DOMContentLoaded", function() {
    const catalogButton = document.querySelector('#catalogButton');
    const katalog = document.querySelector('.katalog');
    const btnClose = document.querySelector('.btnClose');
    const btnOpen = document.querySelector('.btnOpen');

    // Функция для открытия каталога
    function openCatalog() {
        katalog.classList.add('open');
        katalog.style.left = '0'; // Убедитесь, что каталог выезжает
   
    }

    // Функция для закрытия каталога
    function closeCatalog() {
        katalog.classList.remove('open');
        katalog.style.left = '-300px'; // Скрываем каталог
        document.body.style.overflow = 'auto'; // Восстановление прокрутки страницы при закрытии
    }

    // Обработчики кликов для открытия и закрытия каталога
    if (catalogButton) {
        catalogButton.addEventListener('click', openCatalog);
    }

    if (btnClose) {
        btnClose.addEventListener('click', closeCatalog);
    }

    if (btnOpen) {
        btnOpen.addEventListener('click', openCatalog);
    }

    // Функция для показа/скрытия контента
    function toggleContent(event) {
        const targetId = event.currentTarget.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
            if (targetContent.classList.contains('hidden')) {
                // Скрыть все другие контенты
                document.querySelectorAll('.contentToShow').forEach(content => {
                    if (content !== targetContent) {
                        content.classList.remove('show');
                        content.classList.add('hidden');
                    }
                });

                // Показать целевой контент
                targetContent.classList.remove('hidden');
                targetContent.classList.add('show');
            } else {
                // Скрыть контент, если он уже виден
                targetContent.classList.remove('show');
                targetContent.classList.add('hidden');
            }
        }
    }

    // Добавление обработчиков кликов для кнопок
    document.querySelectorAll('.katalog_button.lightProduct').forEach(button => {
        button.addEventListener('click', toggleContent);
    });

    // Функция для показа кнопки при скролле
    function handleScroll() {
        if (window.scrollY > 500) {
            catalogButton.classList.add('show');
        } else {
            catalogButton.classList.remove('show');
        }
    }

    window.addEventListener('scroll', handleScroll);
});

