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

// Load and render projects
function loadProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    container.innerHTML = '';

    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');

    projectsData.forEach((project, index) => {
        // Skip if filter is applied and doesn't match
        if (filter && project.category !== filter) {
            return;
        }

        const projectEl = document.createElement('div');
        projectEl.className = 'project';
        projectEl.setAttribute('data-category', project.category);
        projectEl.setAttribute('data-project-index', index);

        const firstImage = project.images[0];
        
        projectEl.innerHTML = `
            <div class="project-image-container">
                <img src="${firstImage}" alt="${project.name}" class="project-image" data-project-index="${index}">
            </div>
            <h3>${project.name}</h3>
        `;

        projectEl.addEventListener('click', function() {
            openModal(index);
        });

        container.appendChild(projectEl);
    });
}

// Modal functionality
let currentProjectIndex = 0;
let currentImageIndex = 0;

function openModal(projectIndex) {
    currentProjectIndex = projectIndex;
    currentImageIndex = 0;
    const modal = document.getElementById('imageModal');
    modal.style.display = 'block';
    showImage();
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

function showImage() {
    const modal = document.getElementById('imageModal');
    const project = projectsData[currentProjectIndex];
    const image = project.images[currentImageIndex];
    
    document.querySelector('.modal-image').src = image;
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
    // Load projects on portfolio page
    if (document.getElementById('projectsContainer')) {
        loadProjects();
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

// E-posta validasyonu
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
