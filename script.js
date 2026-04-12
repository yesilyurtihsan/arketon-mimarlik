// Hero Section Slideshow
const heroBgImages = [
    "images/YAPAY ZEKA YAPILAN/1-KONUT/15-İSTANBUL BAĞCILAR HARUN YILDIZ KONUT/ChatGPT Image 27 Mar 2026 14_39_16.png",
    "images/YAPAY ZEKA YAPILAN/4-VİLLA/1-İZMİR URLA ER YAMAN EVLERİ/ChatGPT Image 27 Mar 2026 16_10_34.png",
    "images/YAPAY ZEKA YAPILAN/5-SİTE/7-EMLAK KONUT ÜMRANİYE/ChatGPT Image 27 Mar 2026 10_35_19.png",
    "images/YAPAY ZEKA YAPILAN/6-BUNGALOW/18-BUNGALOW TEKİRDAĞ/ChatGPT Image 27 Mar 2026 14_15_22.png",
    "images/YAPAY ZEKA YAPILAN/ChatGPT Image 26 Mar 2026 16_07_12.png",
    "images/YAPAY ZEKA YAPILAN/ChatGPT Image 27 Mar 2026 10_24_16.png"
];

let currentBgIndex = 0;
let heroSlideshowTimer = null;
let homeSlideshowStarted = false;
const heroBgPreloads = [];

function preloadHeroBgImages() {
    if (heroBgPreloads.length > 0 || heroBgImages.length === 0) return;

    heroBgImages.forEach((src, index) => {
        const url = resolveAssetUrl(src);
        const img = new Image();
        img.src = url;
        heroBgPreloads[index] = img;
    });
}

function resolveAssetUrl(relativePath) {
    const trimmed = relativePath.replace(/^\/+/, '');
    const encodedPath = trimmed.split('/').map(encodeURIComponent).join('/');
    try {
        return new URL(encodedPath, document.baseURI).href;
    } catch (e) {
        return encodedPath;
    }
}

function applyHomeBg(index) {
    const el = document.getElementById('homeSlideshowBg');
    if (!el) return;
    const n = heroBgImages.length;
    currentBgIndex = ((index % n) + n) % n;
    const url = resolveAssetUrl(heroBgImages[currentBgIndex]);
    el.style.backgroundImage = 'url(' + JSON.stringify(url) + ')';
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
}

function clearHomeSlideshowTimer() {
    if (heroSlideshowTimer) {
        clearTimeout(heroSlideshowTimer);
        heroSlideshowTimer = null;
    }
}

function scheduleHomeSlideshowTick() {
    clearHomeSlideshowTimer();
    if (!document.getElementById('homeSlideshowBg')) return;
    heroSlideshowTimer = setTimeout(function homeSlideTick() {
        applyHomeBg(currentBgIndex + 1);
        heroSlideshowTimer = setTimeout(homeSlideTick, 5000);
    }, 5000);
}

function startHeroSlideshow() {
    if (!document.getElementById('homeSlideshowBg') || heroBgImages.length === 0) return;
    preloadHeroBgImages();
    applyHomeBg(currentBgIndex);
    scheduleHomeSlideshowTick();
}

function ensureHomeSlideshow() {
    if (homeSlideshowStarted || !document.getElementById('homeSlideshowBg')) return;
    homeSlideshowStarted = true;
    startHeroSlideshow();
}

function stepHomeBg(delta) {
    if (!document.getElementById('homeSlideshowBg')) return;
    applyHomeBg(currentBgIndex + delta);
    scheduleHomeSlideshowTick();
}

// Project Data with all projects and their images
const projectsData = [
    {
        name: "Deliballı Konut",
        category: "gorsel-konut",
        images: [
            "images/YAPAY ZEKA YAPILAN/1-KONUT/1-DELİBALLI/ChatGPT Image 24 Mar 2026 12_33_12.png",
            "images/YAPAY ZEKA YAPILAN/1-KONUT/1-DELİBALLI/cephe_pafta.png",
            "images/YAPAY ZEKA YAPILAN/1-KONUT/1-DELİBALLI/Mimarı planlar.png"
        ]
    },
    {
        name: "İstanbul Bağcılar Harun Yıldız Konut",
        category: "gorsel-konut",
        images: [
            "images/YAPAY ZEKA YAPILAN/1-KONUT/15-İSTANBUL BAĞCILAR HARUN YILDIZ KONUT/ChatGPT Image 27 Mar 2026 14_42_01.png",
            "images/YAPAY ZEKA YAPILAN/1-KONUT/15-İSTANBUL BAĞCILAR HARUN YILDIZ KONUT/ChatGPT Image 27 Mar 2026 14_43_55.png",
            "images/YAPAY ZEKA YAPILAN/1-KONUT/15-İSTANBUL BAĞCILAR HARUN YILDIZ KONUT/ChatGPT Image 27 Mar 2026 14_39_16.png"
        ]
    },
    {
        name: "İzmir Karşıyaka Nezih Kuru Konut",
        category: "gorsel-konut",
        images: [
            "images/YAPAY ZEKA YAPILAN/1-KONUT/21-İZMİR KARŞIYAKA NEZİH KURU KONUT/ChatGPT Image 27 Mar 2026 15_42_56.png",
            "images/YAPAY ZEKA YAPILAN/1-KONUT/21-İZMİR KARŞIYAKA NEZİH KURU KONUT/ChatGPT Image 27 Mar 2026 15_49_39.png"
        ]
    },
    {
        name: "Said Bey Restoran",
        category: "mimarlik-ticari",
        images: [
            "images/YAPAY ZEKA YAPILAN/16-SAİD BEY RESTORAN/1.png",
            "images/YAPAY ZEKA YAPILAN/16-SAİD BEY RESTORAN/2.jpg",
            "images/YAPAY ZEKA YAPILAN/16-SAİD BEY RESTORAN/3.jpg",
            "images/YAPAY ZEKA YAPILAN/16-SAİD BEY RESTORAN/4.jpg"
        ]
    },
    {
        name: "Kuran Kursu",
        category: "mimarlik-ticari",
        images: [
            "images/YAPAY ZEKA YAPILAN/2-KURAN KURSU/WhatsApp Image 2026-02-19 at 20.01.36.jpeg",
            "images/YAPAY ZEKA YAPILAN/2-KURAN KURSU/WhatsApp Image 2026-02-19 at 20.11.38.jpeg",
            "images/YAPAY ZEKA YAPILAN/2-KURAN KURSU/WhatsApp Image 2026-02-19 at 19.46.24.jpeg",
            "images/YAPAY ZEKA YAPILAN/2-KURAN KURSU/WhatsApp Image 2026-02-19 at 20.19.18.jpeg",
            "images/YAPAY ZEKA YAPILAN/2-KURAN KURSU/bina_16k_upscaled.png"
        ]
    },
    {
        name: "Esenler AVM",
        category: "gorsel-ticaret",
        images: [
            "images/YAPAY ZEKA YAPILAN/2-TİCARET/4-ESENLER AVM/ChatGPT Image 26 Mar 2026 13_17_12.png",
            "images/YAPAY ZEKA YAPILAN/2-TİCARET/4-ESENLER AVM/ChatGPT Image 26 Mar 2026 13_23_37.png"
        ]
    },
    {
        name: "Esenler Shell Benzin İstasyonu",
        category: "mimarlik-akaryakit",
        images: [
            "images/YAPAY ZEKA YAPILAN/3-AKARYAKIT İSTASYONU/3-ESENLER SHELL BENZİN İSTASYONU/ChatGPT Image 26 Mar 2026 12_11_12.png",
            "images/YAPAY ZEKA YAPILAN/3-AKARYAKIT İSTASYONU/3-ESENLER SHELL BENZİN İSTASYONU/ChatGPT Image 26 Mar 2026 12_24_51.png"
        ]
    },
    {
        name: "İzmir Urla Er Yaman Evleri",
        category: "gorsel-villa",
        images: [
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/1-İZMİR URLA ER YAMAN EVLERİ/ChatGPT Image 27 Mar 2026 16_47_52.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/1-İZMİR URLA ER YAMAN EVLERİ/ChatGPT Image 27 Mar 2026 16_13_45.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/1-İZMİR URLA ER YAMAN EVLERİ/ChatGPT Image 27 Mar 2026 16_29_45.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/1-İZMİR URLA ER YAMAN EVLERİ/ChatGPT Image 27 Mar 2026 16_41_26.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/1-İZMİR URLA ER YAMAN EVLERİ/ChatGPT Image 27 Mar 2026 16_39_35.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/1-İZMİR URLA ER YAMAN EVLERİ/ChatGPT Image 27 Mar 2026 16_10_34.png"
        ]
    },
    {
        name: "Karaburun Villa Tekno İnşaat",
        category: "gorsel-villa",
        images: [
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/2-KARABURUN VİLLA TEKNO İNŞAAT/ChatGPT Image 27 Mar 2026 12_32_11.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/2-KARABURUN VİLLA TEKNO İNŞAAT/1.jpg",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/2-KARABURUN VİLLA TEKNO İNŞAAT/2.jpg",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/2-KARABURUN VİLLA TEKNO İNŞAAT/ChatGPT Image 30 Mar 2026 22_21_56.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/2-KARABURUN VİLLA TEKNO İNŞAAT/4.jpg",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/2-KARABURUN VİLLA TEKNO İNŞAAT/ChatGPT Image 27 Mar 2026 12_29_41.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/2-KARABURUN VİLLA TEKNO İNŞAAT/ChatGPT Image 30 Mar 2026 22_29_50.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/2-KARABURUN VİLLA TEKNO İNŞAAT/ChatGPT Image 30 Mar 2026 22_27_09.png"
        ]
    },
    {
        name: "Villa 1",
        category: "gorsel-villa",
        images: [
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/8-VİLLA 1/ChatGPT Image 26 Mar 2026 16_25_30.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/8-VİLLA 1/ChatGPT Image 26 Mar 2026 16_32_21.png"
        ]
    },
    {
        name: "ODTİM İnşaat Sasali Villa Paradise",
        category: "gorsel-villa",
        images: [
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/12-ODTİM İNŞAAT SASALI VİLLA PARADİSE/ChatGPT Image 27 Mar 2026 13_00_26.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/12-ODTİM İNŞAAT SASALI VİLLA PARADİSE/ChatGPT Image 27 Mar 2026 12_36_49.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/12-ODTİM İNŞAAT SASALI VİLLA PARADİSE/ChatGPT Image 27 Mar 2026 14_51_20.png"
        ]
    },
    {
        name: "Yapıcıoğlu İnşaat Nazilli",
        category: "gorsel-villa",
        images: [
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/13-YAPICIOĞLU İNŞAAT NAZİLLİ/ChatGPT Image 27 Mar 2026 13_08_38.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/13-YAPICIOĞLU İNŞAAT NAZİLLİ/ChatGPT Image 27 Mar 2026 13_10_14.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/13-YAPICIOĞLU İNŞAAT NAZİLLİ/ChatGPT Image 27 Mar 2026 13_11_47.png"
        ]
    },
    {
        name: "Villa 2",
        category: "gorsel-villa",
        images: [
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/9-VİLLA 2/Y2.jpg",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/9-VİLLA 2/Y3.jpg",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/9-VİLLA 2/ChatGPT Image 27 Mar 2026 10_06_11.png",
            "images/YAPAY ZEKA YAPILAN/4-VİLLA/9-VİLLA 2/ChatGPT Image 27 Mar 2026 10_07_39.png"
        ]
    }
];

function getFilteredProjectIndices() {
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    const indices = [];
    projectsData.forEach((project, index) => {
        if (!filter || project.category === filter) {
            indices.push(index);
        }
    });
    return indices;
}

function createProjectElement(index) {
    const project = projectsData[index];
    const projectEl = document.createElement('div');
    projectEl.className = 'project';
    projectEl.setAttribute('data-category', project.category);
    projectEl.setAttribute('data-project-index', String(index));

    const firstImage = project.images[0];

    projectEl.innerHTML = `
            <div class="project-image-container">
                <img src="${firstImage}" alt="${project.name}" class="project-image" data-project-index="${index}">
            </div>
            <h3>${project.name}</h3>
        `;

    projectEl.addEventListener('click', function () {
        openModal(index);
    });

    return projectEl;
}

// Load and render projects (portfolio page)
function loadProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    container.innerHTML = '';
    getFilteredProjectIndices().forEach((index) => {
        container.appendChild(createProjectElement(index));
    });
}

const HOME_PROJECTS_INITIAL = 6;
const HOME_PROJECTS_STEP = 6;
let homeProjectsDisplayed = 0;

function getHomeProjectIndices() {
    return projectsData.map((_, i) => i);
}

function updateHomeLoadMoreButton() {
    const btn = document.getElementById('homeProjectsLoadMore');
    if (!btn) return;
    const total = getHomeProjectIndices().length;
    btn.hidden = homeProjectsDisplayed >= total;
}

function loadMoreHomeProjects() {
    const container = document.getElementById('homeProjectsContainer');
    if (!container) return;

    const all = getHomeProjectIndices();
    const target =
        homeProjectsDisplayed === 0
            ? Math.min(HOME_PROJECTS_INITIAL, all.length)
            : Math.min(homeProjectsDisplayed + HOME_PROJECTS_STEP, all.length);

    for (let i = homeProjectsDisplayed; i < target; i++) {
        container.appendChild(createProjectElement(all[i]));
    }
    homeProjectsDisplayed = target;
    updateHomeLoadMoreButton();
}

function initHomeProjects() {
    const container = document.getElementById('homeProjectsContainer');
    if (!container) return;

    homeProjectsDisplayed = 0;
    container.innerHTML = '';
    loadMoreHomeProjects();

    const btn = document.getElementById('homeProjectsLoadMore');
    if (btn) {
        btn.addEventListener('click', loadMoreHomeProjects);
    }
}

// Modal functionality
let currentProjectIndex = 0;
let currentImageIndex = 0;

function openModal(projectIndex) {
    const modal = document.getElementById('imageModal');
    if (!modal) return;

    currentProjectIndex = projectIndex;
    currentImageIndex = 0;
    modal.style.display = 'block';
    showImage();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) modal.style.display = 'none';
}

function showImage() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.querySelector('.modal-image');
    if (!modal || !modalImg) return;

    const project = projectsData[currentProjectIndex];
    const image = project.images[currentImageIndex];

    modalImg.src = image;
    document.getElementById('imageCounter').textContent = 
        `${currentImageIndex + 1} / ${project.images.length}`;

    // Hide prev button on first image
    document.getElementById('prevBtn').style.display = 
        currentImageIndex === 0 ? 'none' : 'block';
    
    // Hide next button on last image
    document.getElementById('nextBtn').style.display = 
        currentImageIndex === project.images.length - 1 ? 'none' : 'block';
}

function nextImage() {
    const project = projectsData[currentProjectIndex];
    if (currentImageIndex < project.images.length - 1) {
        currentImageIndex++;
        showImage();
    }
}

function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        showImage();
    }
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    ensureHomeSlideshow();

    const homePrev = document.getElementById('homeHeroPrevBtn');
    const homeNext = document.getElementById('homeHeroNextBtn');
    if (homePrev) homePrev.addEventListener('click', () => stepHomeBg(-1));
    if (homeNext) homeNext.addEventListener('click', () => stepHomeBg(1));

    if (document.getElementById('projectsContainer')) {
        loadProjects();
    }

    if (document.getElementById('homeProjectsContainer')) {
        initHomeProjects();
    }

    // Modal close button
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Modal navigation buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);

    // Close modal when clicking outside the image
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('imageModal');
        if (modal && modal.style.display === 'block') {
            if (event.key === 'ArrowRight') nextImage();
            if (event.key === 'ArrowLeft') prevImage();
            if (event.key === 'Escape') closeModal();
        }
    });

    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Lütfen tüm alanları doldurun.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Lütfen geçerli bir e-posta adresi girin.');
                return;
            }

            alert('Mesajınız gönderildi. Teşekkür ederiz!');
            contactForm.reset();
        });
    }

    // Navigation active state
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || link.getAttribute('href') === '') {
            link.classList.add('active');
        }
    });
});

ensureHomeSlideshow();

// E-posta validasyonu
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
