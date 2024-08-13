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

// Автоматическое пролистывание каждые 5 секунд
setInterval(() => {
    moveSlide(1);
}, 10000);
  





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
        galleryImages.push(this.src);
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
document.querySelector('.btnOpen').addEventListener('click', function() {
    document.querySelector('.katalog').classList.add('open');
    document.querySelector('.btnOpen').style.display = 'none';
    document.querySelector('.btnClose').style.display = 'block';
});

// Закрываем каталог
document.querySelector('.btnClose').addEventListener('click', function() {
    document.querySelector('.katalog').classList.remove('open');
    document.querySelector('.btnOpen').style.display = 'block';
    document.querySelector('.btnClose').style.display = 'none';
});


// Получаем ссылку на кнопку "Показать каталог" и другие элементы
const catalogButton = document.getElementById('catalogButton');
const katalog = document.querySelector('.katalog');
const btnOpen = document.querySelector('.btnOpen');
const btnClose = document.querySelector('.btnClose');

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

// Добавляем обработчик клика для кнопки "Показать каталог"
catalogButton.addEventListener('click', openCatalog);

// Добавляем обработчик клика для кнопки закрытия каталога
btnClose.addEventListener('click', closeCatalog);

// Добавляем обработчик клика для кнопки открытия каталога (если она необходима)
if (btnOpen) {
    btnOpen.addEventListener('click', openCatalog);
}


document.addEventListener("DOMContentLoaded", function() {
    const lightProductButtons = document.querySelectorAll(".lightProduct");
    const contentSections = document.querySelectorAll(".contentToShow");
    const btnOpen = document.getElementById("btnOpen");
    const buttonClose = document.querySelector(".btnClose");
    const katalog = document.querySelector(".katalog");

    function toggleSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.toggle("hidden");
            targetSection.classList.toggle("show");
        }
    }

    lightProductButtons.forEach(button => {
        button.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");
            toggleSection(targetId);
        });
    });

    buttonClose.addEventListener("click", function() {
        katalog.classList.remove("open");
        document.body.style.overflow = "auto"; // Восстановление прокрутки страницы при закрытии
    });

    btnOpen.addEventListener("click", function() {
        katalog.classList.add("open");
        document.body.style.overflow = "hidden"; // Скрытие прокрутки страницы при открытии каталога
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.querySelector(".burger-menu");
    const mobileMenu = document.querySelector("nav.mobile-menu");
    const catalogButton = document.querySelector(".catalog-button");
    const katalog = document.querySelector(".katalog");
    const btnClose = document.querySelector(".btnClose");

    burgerMenu.addEventListener("click", function() {
        mobileMenu.classList.toggle("show");
    });

    catalogButton.addEventListener("click", function() {
        katalog.classList.toggle("open");
    });

    btnClose.addEventListener("click", function() {
        katalog.classList.remove("open");
    });

    window.addEventListener("scroll", function() {
        if (window.scrollY > 200) {
            catalogButton.classList.add("show");
        } else {
            catalogButton.classList.remove("show");
        }
    });
});

