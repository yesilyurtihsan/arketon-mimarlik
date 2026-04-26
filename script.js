// Hero Section Slideshow
// const heroBgImages = [
//     "images/YAPAY ZEKA YAPILAN/1-KONUT/15-İSTANBUL BAĞCILAR HARUN YILDIZ KONUT/ChatGPT Image 27 Mar 2026 14_39_16.png",
//     "images/YAPAY ZEKA YAPILAN/4-VİLLA/1-İZMİR URLA ER YAMAN EVLERİ/ChatGPT Image 27 Mar 2026 16_10_34.png",
//     "images/YAPAY ZEKA YAPILAN/5-SİTE/7-EMLAK KONUT ÜMRANİYE/ChatGPT Image 27 Mar 2026 10_35_19.png",
//     "images/YAPAY ZEKA YAPILAN/6-BUNGALOW/18-BUNGALOW TEKİRDAĞ/ChatGPT Image 27 Mar 2026 14_15_22.png",
//     "images/YAPAY ZEKA YAPILAN/ChatGPT Image 26 Mar 2026 16_07_12.png",
//     "images/YAPAY ZEKA YAPILAN/ChatGPT Image 27 Mar 2026 10_24_16.png"
// ];

const heroBgImages = [
    // "images/ana_ekran_döngüsü/1.png",
    // "images/ana_ekran_döngüsü/2.png",
    "images/ana_ekran_döngüsü/4.png",
    "images/ana_ekran_döngüsü/3.png",
    "images/ana_ekran_döngüsü/5.png",
    // "images/ana_ekran_döngüsü/6.png",
    // "images/ana_ekran_döngüsü/7.png",
    "images/ana_ekran_döngüsü/8.png",
    // "images/ana_ekran_döngüsü/9.png",
    "images/ana_ekran_döngüsü/10.png",
    "images/ana_ekran_döngüsü/11.png",
    // "images/ana_ekran_döngüsü/12.png"
];

let currentBgIndex = 0;
let heroSlideshowTimer = null;
let homeSlideshowStarted = false;
const heroBgPreloads = [];
let isTransitioning = false;

const loadingMessages = [
    "Temeller atılıyor…",
    "Planlar açılıyor…",
    "Kesitler çiziliyor…",
    "Işık içeri alınıyor…",
    "Strüktür yükseliyor…"
];

let loadingMessageIndex = 0;
let loadingInterval = null;

function isMobile() {
    return window.innerWidth < 768;
}

function preloadHeroBgImages() {
    if (heroBgPreloads.length > 0 || heroBgImages.length === 0) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        const numToPreload = isMobile() ? 2 : heroBgImages.length;
        let loadedCount = 0;

        const checkComplete = () => {
            loadedCount += 1;
            if (loadedCount >= numToPreload) {
                resolve();
            }
        };

        for (let i = 0; i < numToPreload; i++) {
            const src = heroBgImages[i];
            const url = resolveAssetUrl(src);
            const img = new Image();
            img.onload = checkComplete;
            img.onerror = checkComplete;
            img.src = url;
            heroBgPreloads[i] = img;
        }
    });
}

function updateLoadingMessage() {
    const messageEl = document.getElementById('loadingMessage');
    if (!messageEl) return;
    messageEl.textContent = loadingMessages[loadingMessageIndex];
}

function startLoadingMessages() {
    const overlay = document.getElementById('pageLoadingOverlay');
    if (!overlay) return;

    overlay.classList.remove('hidden');
    loadingMessageIndex = 0;
    updateLoadingMessage();

    loadingInterval = setInterval(() => {
        loadingMessageIndex = (loadingMessageIndex + 1) % loadingMessages.length;
        updateLoadingMessage();
    }, 1200);
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('pageLoadingOverlay');
    if (!overlay) return;

    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');

    if (loadingInterval) {
        clearInterval(loadingInterval);
        loadingInterval = null;
    }

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 450);
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
    
    // Use a crossfade effect with two layers
    const bgLayer = el.querySelector('.bg-layer-main') || createBgLayer(el, 'main');
    const bgLayerNext = el.querySelector('.bg-layer-next') || createBgLayer(el, 'next');
    
    // Check if this is the first image load (bgLayer has no image yet)
    const isFirstLoad = !bgLayer.style.backgroundImage || bgLayer.style.backgroundImage === '';
    
    if (isFirstLoad) {
        // First load: set image directly on main layer without transition
        bgLayer.style.backgroundImage = 'url(' + JSON.stringify(url) + ')';
        bgLayer.style.opacity = '1';
        // Add Ken Burns animation
        bgLayer.classList.add('active');
    } else {
        // Subsequent loads: crossfade transition
        // Remove Ken Burns animation from main layer
        bgLayer.classList.remove('active');
        
        // Set the new image on the next layer
        bgLayerNext.style.backgroundImage = 'url(' + JSON.stringify(url) + ')';
        
        // Force reflow to ensure smooth transition
        void bgLayerNext.offsetHeight;
        
        // Crossfade: fade out main, fade in next
        bgLayerNext.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)';
        bgLayer.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)';
        bgLayer.style.opacity = '0';
        bgLayerNext.style.opacity = '1';
        
        // After transition completes, swap layers
        setTimeout(() => {
            bgLayer.style.transition = 'none';
            bgLayerNext.style.transition = 'none';
            bgLayer.style.backgroundImage = 'url(' + JSON.stringify(url) + ')';
            bgLayer.style.opacity = '1';
            bgLayerNext.style.opacity = '0';
            // Add Ken Burns animation to the now-visible layer
            bgLayer.classList.add('active');
        }, 1200);
    }
}

function createBgLayer(container, type) {
    const layer = document.createElement('div');
    layer.className = `bg-layer bg-layer-${type}`;
    layer.style.backgroundSize = 'cover';
    layer.style.backgroundPosition = 'center';
    layer.style.backgroundRepeat = 'no-repeat';
    layer.style.opacity = '0';
    
    container.appendChild(layer);
    return layer;
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
        // 6s Ken Burns + 1.2s crossfade + 0.8s buffer = 8s per slide
        heroSlideshowTimer = setTimeout(homeSlideTick, 8000);
    }, 8000);
}

function startHeroSlideshow() {
    if (!document.getElementById('homeSlideshowBg') || heroBgImages.length === 0) return;

    startLoadingMessages();
    preloadHeroBgImages().then(() => {
        applyHomeBg(currentBgIndex);
        scheduleHomeSlideshowTick();
        hideLoadingOverlay();
    });
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
        category: "gorsel-ticaret",
        images: [
            "images/YAPAY ZEKA YAPILAN/16-SAİD BEY RESTORAN/1.png",
            "images/YAPAY ZEKA YAPILAN/16-SAİD BEY RESTORAN/2.jpg",
            "images/YAPAY ZEKA YAPILAN/16-SAİD BEY RESTORAN/3.jpg",
            "images/YAPAY ZEKA YAPILAN/16-SAİD BEY RESTORAN/4.jpg"
        ]
    },
    {
        name: "Kuran Kursu",
        category: "gorsel-diniyapilar",
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
        category: "gorsel-akaryakit",
        images: [
            "images/YAPAY ZEKA YAPILAN/3-AKARYAKIT İSTASYONU/3-ESENLER SHELL BENZİN İSTASYONU/ChatGPT Image 26 Mar 2026 12_11_12.png",
            "images/YAPAY ZEKA YAPILAN/3-AKARYAKIT İSTASYONU/3-ESENLER SHELL BENZİN İSTASYONU/ChatGPT Image 26 Mar 2026 12_24_51.png"
        ]
    },
    {
        name: "Bungalov Tekirdağ 1",
        category: "gorsel-bungalov",
        images: [
            "images/YAPAY ZEKA YAPILAN/6-BUNGALOW/18-BUNGALOW TEKİRDAĞ/ChatGPT Image 27 Mar 2026 14_15_22.png",
            "images/YAPAY ZEKA YAPILAN/6-BUNGALOW/18-BUNGALOW TEKİRDAĞ/ChatGPT Image 27 Mar 2026 14_19_39.png"
        ]
    },
    {
        name: "Bungalov Tekirdağ 2",
        category: "gorsel-bungalov",
        images: [
            "images/YAPAY ZEKA YAPILAN/6-BUNGALOW/19-BUNGALOW TEKİRDAĞ 2/ChatGPT Image 27 Mar 2026 13_19_40.png",
            "images/YAPAY ZEKA YAPILAN/6-BUNGALOW/19-BUNGALOW TEKİRDAĞ 2/ChatGPT Image 27 Mar 2026 13_22_21.png"
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
    },
    {
        name: "Manisa Alaşehir Camii",
        category: "gorsel-diniyapilar",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/CAMİ/MANİSA ALAŞEHİR CAMİİ/ChatGPT Image 31 Mar 2026 21_38_15.png",
            "images/YAPAY ZEKA YAPILAN 2/CAMİ/MANİSA ALAŞEHİR CAMİİ/ChatGPT Image 31 Mar 2026 21_41_15.png",
            "images/YAPAY ZEKA YAPILAN 2/CAMİ/MANİSA ALAŞEHİR CAMİİ/ChatGPT Image 31 Mar 2026 21_43_30.png",
            "images/YAPAY ZEKA YAPILAN 2/CAMİ/MANİSA ALAŞEHİR CAMİİ/ChatGPT Image 31 Mar 2026 21_45_07.png",
            "images/YAPAY ZEKA YAPILAN 2/CAMİ/MANİSA ALAŞEHİR CAMİİ/ChatGPT Image 31 Mar 2026 22_00_36.png"
        ]
    },
    {
        name: "Antalya Havalimanı Petrol Ofisi",
        category: "gorsel-akaryakit",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/ANTALYA HAVALİMANI PETROL OFİSİ/ChatGPT Image 31 Mar 2026 21_22_45.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/ANTALYA HAVALİMANI PETROL OFİSİ/ChatGPT Image 31 Mar 2026 21_24_08.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/ANTALYA HAVALİMANI PETROL OFİSİ/ChatGPT Image 31 Mar 2026 21_27_57.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/ANTALYA HAVALİMANI PETROL OFİSİ/ChatGPT Image 31 Mar 2026 21_31_43.png"
        ]
    },
    {
        name: "Başakşehir Bayhas Petrol",
        category: "gorsel-akaryakit",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/BAŞAKŞEHİR BAYHAS PETROL/ChatGPT Image 31 Mar 2026 19_08_36.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/BAŞAKŞEHİR BAYHAS PETROL/ChatGPT Image 31 Mar 2026 19_10_10.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/BAŞAKŞEHİR BAYHAS PETROL/ChatGPT Image 31 Mar 2026 19_11_27.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/BAŞAKŞEHİR BAYHAS PETROL/ChatGPT Image 31 Mar 2026 19_15_45.png"
        ]
    },
    {
        name: "Esenyurt Silyon Shell Petrol",
        category: "gorsel-akaryakit",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/ESENYURT SİLYON SHELL PETROL/ChatGPT Image 31 Mar 2026 19_22_45.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/ESENYURT SİLYON SHELL PETROL/ChatGPT Image 31 Mar 2026 19_28_01.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/ESENYURT SİLYON SHELL PETROL/ChatGPT Image 31 Mar 2026 19_28_58.png"
        ]
    },
    {
        name: "Malkara Total Enerji",
        category: "gorsel-akaryakit",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/MALKARA TOTAL ENERJİ/ChatGPT Image 31 Mar 2026 16_27_14.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/MALKARA TOTAL ENERJİ/ChatGPT Image 31 Mar 2026 16_31_57.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/MALKARA TOTAL ENERJİ/ChatGPT Image 31 Mar 2026 16_37_09.png"
        ]
    },
    {
        name: "Tuzla İSSO Petrol",
        category: "gorsel-akaryakit",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/TUZLA İSSO PETROL/ChatGPT Image 31 Mar 2026 16_59_04.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/TUZLA İSSO PETROL/ChatGPT Image 31 Mar 2026 17_07_23.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/TUZLA İSSO PETROL/ChatGPT Image 31 Mar 2026 17_11_28.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/TUZLA İSSO PETROL/ChatGPT Image 31 Mar 2026 17_16_44.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/TUZLA İSSO PETROL/ChatGPT Image 31 Mar 2026 17_23_34.png"
        ]
    },
    {
        name: "Tuzla Ziyade",
        category: "gorsel-akaryakit",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/TUZLA ZİYADE/ChatGPT Image 31 Mar 2026 19_55_50.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/TUZLA ZİYADE/ChatGPT Image 31 Mar 2026 20_01_01.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/TUZLA ZİYADE/ChatGPT Image 31 Mar 2026 20_05_10.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/TUZLA ZİYADE/ChatGPT Image 31 Mar 2026 20_07_42.png"
        ]
    },
    {
        name: "Vega",
        category: "gorsel-akaryakit",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/VEGA/ChatGPT Image 31 Mar 2026 22_13_05.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/VEGA/ChatGPT Image 31 Mar 2026 22_22_31.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/VEGA/ChatGPT Image 31 Mar 2026 22_24_00.png",
            "images/YAPAY ZEKA YAPILAN 2/İSTASYON/VEGA/ChatGPT Image 31 Mar 2026 22_25_53.png"
        ]
    },
    {
        name: "Arıcı Konut",
        category: "gorsel-konut",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/KONUT/ARICI/ChatGPT Image 31 Mar 2026 23_04_12.png",
            "images/YAPAY ZEKA YAPILAN 2/KONUT/ARICI/ChatGPT Image 31 Mar 2026 23_04_25.png",
            "images/YAPAY ZEKA YAPILAN 2/KONUT/ARICI/ChatGPT Image 31 Mar 2026 23_13_09.png"
        ]
    },
    {
        name: "Kadıköy Auto Showroom",
        category: "gorsel-otogaleri",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/OTO GALERİ/KADIKÖY AUTO SHOWROOM/ChatGPT Image 31 Mar 2026 16_06_59.png",
            "images/YAPAY ZEKA YAPILAN 2/OTO GALERİ/KADIKÖY AUTO SHOWROOM/ChatGPT Image 31 Mar 2026 16_10_51.png",
            "images/YAPAY ZEKA YAPILAN 2/OTO GALERİ/KADIKÖY AUTO SHOWROOM/ChatGPT Image 31 Mar 2026 16_15_55.png"
        ]
    },
    {
        name: "Tuğçe Ecem B Blok",
        category: "gorsel-otogaleri",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/OTO GALERİ/TUĞÇE ECEM B BLOK/ChatGPT Image 31 Mar 2026 22_47_21.png",
            "images/YAPAY ZEKA YAPILAN 2/OTO GALERİ/TUĞÇE ECEM B BLOK/ChatGPT Image 31 Mar 2026 22_50_02.png",
            "images/YAPAY ZEKA YAPILAN 2/OTO GALERİ/TUĞÇE ECEM B BLOK/ChatGPT Image 31 Mar 2026 22_52_05.png",
            "images/YAPAY ZEKA YAPILAN 2/OTO GALERİ/TUĞÇE ECEM B BLOK/ChatGPT Image 31 Mar 2026 22_55_35.png"
        ]
    },
    {
        name: "Villa 12",
        category: "gorsel-villa",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/VİLLA/VİLLA 12/ChatGPT Image 31 Mar 2026 20_38_05.png",
            "images/YAPAY ZEKA YAPILAN 2/VİLLA/VİLLA 12/ChatGPT Image 31 Mar 2026 20_40_59.png",
            "images/YAPAY ZEKA YAPILAN 2/VİLLA/VİLLA 12/ChatGPT Image 31 Mar 2026 20_42_39.png",
            "images/YAPAY ZEKA YAPILAN 2/VİLLA/VİLLA 12/ChatGPT Image 31 Mar 2026 20_46_01.png"
        ]
    },
    {
        name: "Villa 13",
        category: "gorsel-villa",
        images: [
            "images/YAPAY ZEKA YAPILAN 2/VİLLA/VİLLA 13/ChatGPT Image 31 Mar 2026 20_22_25.png",
            "images/YAPAY ZEKA YAPILAN 2/VİLLA/VİLLA 13/ChatGPT Image 31 Mar 2026 20_29_03.png",
            "images/YAPAY ZEKA YAPILAN 2/VİLLA/VİLLA 13/ChatGPT Image 31 Mar 2026 20_30_15.png"
        ]
    },
    {
        name: "İzmir Karşıyaka Rezidans",
        category: "gorsel-site",
        images: [
            "images/YAPAY ZEKA YAPILAN/5-SİTE/22-İZMİR KARŞIYAKA REZİDANS/ChatGPT Image 27 Mar 2026 15_07_01.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/22-İZMİR KARŞIYAKA REZİDANS/ChatGPT Image 27 Mar 2026 15_07_03.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/22-İZMİR KARŞIYAKA REZİDANS/ChatGPT Image 27 Mar 2026 15_11_28.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/22-İZMİR KARŞIYAKA REZİDANS/ChatGPT Image 27 Mar 2026 15_17_54.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/22-İZMİR KARŞIYAKA REZİDANS/ChatGPT Image 27 Mar 2026 15_31_06.png"
        ]
    },
    {
        name: "Sultangazı Kentsel Dönüşüm",
        category: "gorsel-site",
        images: [
            "images/YAPAY ZEKA YAPILAN/5-SİTE/23-SULTANGAZİ KENTSEL DÖNÜŞÜM/ChatGPT Image 30 Mar 2026 21_10_30.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/23-SULTANGAZİ KENTSEL DÖNÜŞÜM/ChatGPT Image 30 Mar 2026 21_18_40.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/23-SULTANGAZİ KENTSEL DÖNÜŞÜM/ChatGPT Image 30 Mar 2026 22_14_33.png"
        ]
    },
    {
        name: "Emlak Konut Küçük Çekmece",
        category: "gorsel-site",
        images: [
            "images/YAPAY ZEKA YAPILAN/5-SİTE/5-EMLAK KONUT KÜÇÜK ÇEKMECE/ChatGPT Image 26 Mar 2026 13_48_35.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/5-EMLAK KONUT KÜÇÜK ÇEKMECE/ChatGPT Image 26 Mar 2026 13_59_58.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/5-EMLAK KONUT KÜÇÜK ÇEKMECE/4.jpg",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/5-EMLAK KONUT KÜÇÜK ÇEKMECE/y1_14 - Photo.jpg"
        ]
    },
    {
        name: "Emlak Konut Maraş 25 Bina",
        category: "gorsel-site",
        images: [
            "images/YAPAY ZEKA YAPILAN/5-SİTE/6-EMLAK KONUT MARAŞ 25 BİNA/ChatGPT Image 26 Mar 2026 14_35_30.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/6-EMLAK KONUT MARAŞ 25 BİNA/ChatGPT Image 26 Mar 2026 14_40_36.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/6-EMLAK KONUT MARAŞ 25 BİNA/ChatGPT Image 26 Mar 2026 14_53_51.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/6-EMLAK KONUT MARAŞ 25 BİNA/ChatGPT Image 26 Mar 2026 15_18_48.png"
        ]
    },
    {
        name: "Emlak Konut Ümraniye",
        category: "gorsel-site",
        images: [
            "images/YAPAY ZEKA YAPILAN/5-SİTE/7-EMLAK KONUT ÜMRANİYE/ChatGPT Image 27 Mar 2026 10_35_19.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/7-EMLAK KONUT ÜMRANİYE/ChatGPT Image 27 Mar 2026 10_36_48.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/7-EMLAK KONUT ÜMRANİYE/ChatGPT Image 27 Mar 2026 11_11_05.png",
            "images/YAPAY ZEKA YAPILAN/5-SİTE/7-EMLAK KONUT ÜMRANİYE/ChatGPT Image 27 Mar 2026 11_14_53.png"
        ]
    },
    {
        name: "Ümraniye Konut",
        category: "mimarlik-konut",
        images: [
            "images/mimarlik/umraniye/1+1 TİP A.jpg",
            "images/mimarlik/umraniye/1+1 TİP B.jpg",
            "images/mimarlik/umraniye/2+1 KÖŞE.jpg",
            "images/mimarlik/umraniye/3+1 KÖŞE.jpg",
            "images/mimarlik/umraniye/A BLOK NK.jpg",
            "images/mimarlik/umraniye/B BLOK NK.jpg",
            "images/mimarlik/umraniye/C BLOK NK.jpg"
        ]
    },
    {
        name: "1491780 EKB",
        category: "enerji",
        images: ["images/ekb/1491780-0001.jpg"]
    },
    {
        name: "Amerikan Hastanesi EKB",
        category: "enerji",
        images: ["images/ekb/AMERİKAN HASTANESİ EKB-0001.jpg"]
    },
    {
        name: "Arketon EKB",
        category: "enerji",
        images: ["images/ekb/Arketon Ekb2.jpg"]
    },
    {
        name: "Ersoy Bina Yatırım EKB",
        category: "enerji",
        images: ["images/ekb/ERSOY BİNA YAT. EKB ÖN SONUÇ-0001.jpg"]
    },
    {
        name: "Medeniyет EKB Güneş Enerjili",
        category: "enerji",
        images: ["images/ekb/MEDENİYET EKB GÜNEŞ ENERJİLİ.jpg"]
    },
    {
        name: "Okul EKB",
        category: "enerji",
        images: ["images/ekb/OKUL EKB İMZASIZ-0001.jpg"]
    },
    {
        name: "Onur Petrol B Blok EKB",
        category: "enerji",
        images: ["images/ekb/ONUR PETROL b blok-0001.jpg"]
    },
    {
        name: "OPET Aygaz Ankara EKB",
        category: "enerji",
        images: ["images/ekb/OPET AYGAZ ANKARA EKB-0001.jpg"]
    },
    {
        name: "TSK AVM EKB",
        category: "enerji",
        images: ["images/ekb/tsk avm ekb-0001.jpg"]
    },
    {
        name: "İDL Otel EKB",
        category: "enerji",
        images: ["images/ekb/İDL OTEL EKB-0001.jpg"]
    },
    {
        name: "Bakırköy Konut",
        category: "mimarlik-konut",
        images: [
            "images/mimarlik/bakirkoy/1.bodrum kat.jpg",
            "images/mimarlik/bakirkoy/normal kat.jpg",
            "images/mimarlik/bakirkoy/zemin kat.jpg"
        ]
    },
    {
        name: "Akustik Proje 1",
        category: "akustik",
        images: ["images/akustik/1.jpg"]
    },
    {
        name: "Akustik Proje 2",
        category: "akustik",
        images: ["images/akustik/2.jpg"]
    },
    {
        name: "Akustik Proje 3",
        category: "akustik",
        images: ["images/akustik/3.png"]
    },
    {
        name: "Akustik Proje 4",
        category: "akustik",
        images: ["images/akustik/4.jpg"]
    },
    {
        name: "Akustik Proje 5",
        category: "akustik",
        images: ["images/akustik/6.jpg"]
    },
    {
        name: "Akustik Proje 6",
        category: "akustik",
        images: ["images/akustik/7.jpg"]
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
                <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%221%22%20height%3D%221%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3C/svg%3E" 
                     data-src="${firstImage}" 
                     alt="${project.name}" 
                     class="project-image lazyload" 
                     loading="lazy" 
                     decoding="async" 
                     data-project-index="${index}">
            </div>
            <h3>${project.name}</h3>
        `;

    projectEl.addEventListener('click', function () {
        openModal(index);
    });

    return projectEl;
}

function initProjectImageObserver() {
    const lazyImages = document.querySelectorAll('img.project-image.lazyload[data-src]');
    if (!lazyImages.length) return;

    const loadImage = (img) => {
        const src = img.getAttribute('data-src');
        if (!src) return;
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.remove('lazyload');
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const img = entry.target;
                loadImage(img);
                obs.unobserve(img);
            });
        }, {
            rootMargin: '200px 0px',
            threshold: 0.1
        });

        lazyImages.forEach((img) => observer.observe(img));
    } else {
        lazyImages.forEach((img) => loadImage(img));
    }
}

// Load and render projects (portfolio page)
function loadProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    container.innerHTML = '';
    getFilteredProjectIndices().forEach((index) => {
        container.appendChild(createProjectElement(index));
    });
    initProjectImageObserver();
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
    initProjectImageObserver();
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
    const urlParams = new URLSearchParams(window.location.search);
    const currentFilter = urlParams.get('filter');
    const navLinks = document.querySelectorAll('.menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkFilter = href.includes('?filter=') ? href.split('?filter=')[1] : null;

        // Check if this is the current page
        if (href === currentPage || (href === '' && currentPage === '')) {
            link.classList.add('active');
        }

        // Check if this filter matches the current filter
        if (currentFilter && linkFilter === currentFilter) {
            link.classList.add('active');
        }
    });

    // Keep subtopics open based on current filter or page
    const detailsElements = document.querySelectorAll('.menu details');

    detailsElements.forEach(details => {
        const links = details.querySelectorAll('a');

        // Check if any link in this details section matches the current filter or page
        let shouldOpen = false;
        links.forEach(link => {
            const href = link.getAttribute('href');
            const linkFilter = href.includes('?filter=') ? href.split('?filter=')[1] : null;

            // Check for filter match
            if (currentFilter && linkFilter === currentFilter) {
                shouldOpen = true;
            }

            // Check for page match
            if (href === currentPage || (href === '' && currentPage === '')) {
                shouldOpen = true;
            }
        });

        if (shouldOpen) {
            details.setAttribute('open', '');
        }
    });
});

ensureHomeSlideshow();

// E-posta validasyonu
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
