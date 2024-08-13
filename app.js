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
}, 5000);
  





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

