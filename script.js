document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Close mobile menu if active
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Gallery Data - Enriched for professional look
    const paintings = [
        {
            id: 1,
            title: 'El sabor del corazón',
            price: '$350.000',
            image: 'extracted_img_1.png',
            category: 'mediano',
            technique: 'Óleo sobre lienzo',
            dimensions: '60 x 60 cm',
            year: '2025',
            status: 'Disponible'
        },
        {
            id: 2,
            title: 'Pensamientos en las yemas',
            price: '$350.000',
            image: 'extracted_img_2.png',
            category: 'mediano',
            technique: 'Óleo sobre lienzo',
            dimensions: '60 x 60 cm',
            year: '2025',
            status: 'Disponible'
        },
        {
            id: 3,
            title: 'DNA del deseo',
            price: '$350.000',
            image: 'extracted_img_3.png',
            category: 'mediano',
            technique: 'Óleo sobre lienzo',
            dimensions: '60 x 60 cm',
            year: '2025',
            status: 'Disponible'
        },
        {
            id: 4,
            title: 'El placer del control',
            price: '$500.000',
            image: 'extracted_img_4.png',
            category: 'grande',
            technique: 'Óleo sobre lienzo',
            dimensions: '90 x 70 cm',
            year: '2025',
            status: 'Disponible'
        },
        {
            id: 5,
            title: 'Me pertenece',
            price: '$500.000',
            image: 'extracted_img_5.png',
            category: 'grande',
            technique: 'Óleo sobre lienzo',
            dimensions: '80 x 50 cm',
            year: '2025',
            status: 'Disponible'
        },
        {
            id: 6,
            title: 'Anhelo Carmesí',
            price: '$500.000',
            image: 'extracted_img_6.png',
            category: 'grande',
            technique: 'Óleo sobre lienzo',
            dimensions: '80 x 50 cm',
            year: '2025',
            status: 'Disponible'
        },
        {
            id: 7,
            title: 'Sombra Seductora',
            price: '$500.000',
            image: 'extracted_img_7.png',
            category: 'grande',
            technique: 'Óleo sobre lienzo',
            dimensions: '130 x 80 cm',
            year: '2024',
            status: 'Disponible'
        },
        {
            id: 8,
            title: 'Abrigo para el Alma',
            price: '$500.000',
            image: 'extracted_img_8.png',
            category: 'mediano',
            technique: 'Óleo sobre lienzo',
            dimensions: '60 x 50 cm',
            year: '2023',
            status: 'Disponible'
        },
        {
            id: 9,
            title: 'Sin disculpas',
            price: 'Vendido',
            image: 'extracted_img_9.png',
            category: 'privada',
            technique: 'Óleo sobre tela',
            dimensions: '80 x 40 cm',
            year: '2025',
            status: 'Colección Privada'
        }
    ];

    const galleryGrid = document.getElementById('gallery-grid');

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Lightbox / Modal elements
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxTech = document.getElementById('lightbox-tech');
    const lightboxDims = document.getElementById('lightbox-dims');
    const lightboxYear = document.getElementById('lightbox-year');
    const lightboxPrice = document.getElementById('lightbox-price');
    const lightboxStatus = document.getElementById('lightbox-status');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxInquireBtn = document.getElementById('lightbox-inquire-btn');

    let activePainting = null;

    // Open Lightbox
    function openLightbox(painting) {
        if (!lightbox) return;
        activePainting = painting;
        lightboxImg.src = painting.image;
        lightboxImg.alt = painting.title;
        lightboxTitle.textContent = painting.title;
        lightboxTech.textContent = painting.technique;
        lightboxDims.textContent = painting.dimensions;
        lightboxYear.textContent = painting.year;
        lightboxPrice.textContent = painting.price;
        lightboxStatus.textContent = painting.status;

        // Reset status classes
        lightboxStatus.className = 'lightbox-status';
        if (painting.status === 'Disponible') {
            lightboxStatus.classList.add('status-available');
            lightboxInquireBtn.style.display = 'block';
        } else {
            lightboxStatus.classList.add('status-private');
            lightboxInquireBtn.style.display = 'none';
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
    }

    // Close Lightbox
    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
        if (magnifierLens) {
            magnifierLens.style.opacity = '0';
        }
        activePainting = null;
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Magnifier Lens Logic
    const magnifierLens = document.getElementById('magnifier-lens');

    if (lightboxImg && magnifierLens) {
        lightboxImg.addEventListener('mousemove', (e) => {
            const rect = lightboxImg.getBoundingClientRect();
            
            // Mouse position relative to image bounds
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Position lens relative to parent container (.lightbox-left)
            const parentRect = lightboxImg.parentElement.getBoundingClientRect();
            const lensX = (rect.left - parentRect.left) + x - 75; // 75 is half lens width
            const lensY = (rect.top - parentRect.top) + y - 75; // 75 is half lens height
            
            magnifierLens.style.left = lensX + 'px';
            magnifierLens.style.top = lensY + 'px';
            
            // Calculate percentage positions for zoom focus
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            // Apply zoom styling to the lens
            magnifierLens.style.backgroundImage = `url('${lightboxImg.src}')`;
            magnifierLens.style.backgroundSize = `${rect.width * 2.5}px ${rect.height * 2.5}px`; // 2.5x Zoom factor
            magnifierLens.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
            magnifierLens.style.opacity = '1';
        });
        
        lightboxImg.addEventListener('mouseleave', () => {
            magnifierLens.style.opacity = '0';
        });
    }

    // Inquire Button interaction
    if (lightboxInquireBtn) {
        lightboxInquireBtn.addEventListener('click', () => {
            if (!activePainting) return;
            const contactSection = document.getElementById('contact');
            const messageField = document.getElementById('message');

            if (contactSection && messageField) {
                messageField.value = `Hola Sasha,\n\nEstoy interesado/a en tu obra "${activePainting.title}" (${activePainting.technique}, ${activePainting.dimensions}, ${activePainting.year}). Me gustaría consultar disponibilidad, precios de envío y detalles de adquisición.\n\nSaludos.`;
                closeLightbox();
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Focus on name input for better UX
                const nameField = document.getElementById('name');
                if (nameField) {
                    setTimeout(() => nameField.focus(), 800);
                }
            }
        });
    }

    // Render Gallery function
    function renderGallery(filterCategory = 'all') {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';

        const filtered = filterCategory === 'all'
            ? paintings
            : paintings.filter(p => p.category === filterCategory);

        filtered.forEach(painting => {
            const card = document.createElement('div');
            card.classList.add('painting-card', 'reveal');
            card.setAttribute('data-category', painting.category);

            card.innerHTML = `
                <div class="painting-image-container">
                    <img src="${painting.image}" alt="${painting.title}" class="painting-image" loading="lazy">
                    <div class="painting-overlay">
                        <span class="view-details-btn">Detalles de Obra</span>
                    </div>
                </div>
                <div class="painting-info">
                    <h3 class="painting-title">${painting.title}</h3>
                    <div class="painting-meta-short">
                        <span class="painting-tech">${painting.technique.split(' ')[0]}</span>
                        <span class="painting-dot">•</span>
                        <span class="painting-status ${painting.status === 'Disponible' ? 'status-available' : 'status-private'}">${painting.status}</span>
                    </div>
                    <p class="painting-price">${painting.price}</p>
                </div>
            `;

            card.addEventListener('click', () => openLightbox(painting));
            galleryGrid.appendChild(card);
            observer.observe(card);
        });

        // Update custom cursor listeners for newly created elements
        updateCursorListeners();
    }

    // Filter Buttons logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const category = e.currentTarget.getAttribute('data-filter');
            renderGallery(category);
        });
    });

    // Custom Cursor logic
    const cursor = document.createElement('div');
    cursor.classList.add('kursor');
    document.body.appendChild(cursor);

    let catX = 0;
    let catY = 0;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        catX = e.clientX;
        catY = e.clientY;
    });

    // Interactive Mouse Toy (Escapes from the cat cursor)
    const raton = document.createElement('div');
    raton.classList.add('raton');
    document.body.appendChild(raton);

    // Initial position
    let mouseX = Math.random() * (window.innerWidth - 100) + 50;
    let mouseY = Math.random() * (window.innerHeight - 100) + 50;
    let targetX = mouseX;
    let targetY = mouseY;
    let currentX = mouseX;
    let currentY = mouseY;
    let mouseAngle = 0;
    let lastDisturbed = Date.now();

    function updateMouse() {
        const dx = targetX - catX;
        const dy = targetY - catY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Escape behavior: if cat cursor is closer than 140px
        if (distance < 140) {
            lastDisturbed = Date.now();
            
            // Calculate force (stronger when closer)
            const force = (140 - distance) / 140; 
            let escapeAngle = Math.atan2(dy, dx);
            
            // Add a little organic random jitter
            escapeAngle += (Math.random() - 0.5) * 0.4;

            // Push target position away from the cat
            targetX += Math.cos(escapeAngle) * 90 * force;
            targetY += Math.sin(escapeAngle) * 90 * force;

            // Constrain mouse within visible screen margins
            const margin = 40;
            targetX = Math.max(margin, Math.min(window.innerWidth - margin, targetX));
            targetY = Math.max(margin, Math.min(window.innerHeight - margin, targetY));
        } else {
            // Idle behavior: take a small random step if ignored for 4+ seconds
            if (Date.now() - lastDisturbed > 4000) {
                if (Math.random() < 0.015) {
                    targetX = Math.max(60, Math.min(window.innerWidth - 60, targetX + (Math.random() - 0.5) * 120));
                    targetY = Math.max(60, Math.min(window.innerHeight - 60, targetY + (Math.random() - 0.5) * 120));
                    lastDisturbed = Date.now() - 2500; // soft throttle
                }
            }
        }

        // Smooth glide interpolation (lerp)
        const interpolationSpeed = 0.12;
        const prevX = currentX;
        const prevY = currentY;
        currentX += (targetX - currentX) * interpolationSpeed;
        currentY += (targetY - currentY) * interpolationSpeed;

        // Calculate heading angle for rotation
        const vx = currentX - prevX;
        const vy = currentY - prevY;
        const movement = Math.sqrt(vx * vx + vy * vy);

        if (movement > 0.4) {
            // Rotate mouse to face direction of travel (+90 deg to align SVG top)
            mouseAngle = Math.atan2(vy, vx) * 180 / Math.PI + 90;
        }

        // Apply positions
        raton.style.left = currentX + 'px';
        raton.style.top = currentY + 'px';
        raton.style.transform = `translate(-50%, -50%) rotate(${mouseAngle}deg)`;

        requestAnimationFrame(updateMouse);
    }

    // Start interactive mouse loop
    requestAnimationFrame(updateMouse);

    function updateCursorListeners() {
        const interactiveElements = document.querySelectorAll('a, button, .painting-card, .filter-btn, input, textarea, #lightbox-close');
        interactiveElements.forEach(el => {
            // Remove first to avoid duplicate listeners
            el.removeEventListener('mouseenter', addCursorHover);
            el.removeEventListener('mouseleave', removeCursorHover);
            el.addEventListener('mouseenter', addCursorHover);
            el.addEventListener('mouseleave', removeCursorHover);
        });
    }

    function addCursorHover() {
        cursor.classList.add('hovered');
    }

    function removeCursorHover() {
        cursor.classList.remove('hovered');
    }

    // Initial Render
    renderGallery();

    // Select non-gallery elements to animate
    const elementsToReveal = document.querySelectorAll('.hero-content, .section-title, .about-grid, .contact-intro, .contact-form');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Contact Form Handling (Web3Forms Integration)
    const contactForm = document.querySelector('.contact-form');
    // Pegar aquí la clave de acceso de Web3Forms para recibir correos reales:
    const WEB3FORMS_ACCESS_KEY = "19fef3d9-96fb-41b4-9dbf-f72bc073e779"; 

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Enviando...';
            btn.disabled = true;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simulación fallback si no hay clave cargada todavía
            if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
                console.log("Mock submission (no key config):", { name, email, message });
                setTimeout(() => {
                    btn.innerText = 'Mensaje Enviado (Demo)';
                    btn.style.backgroundColor = '#10B981';
                    contactForm.reset();
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                        btn.style.backgroundColor = '';
                    }, 3000);
                }, 1000);
                return;
            }

            // Envío real a través de Web3Forms
            const formData = {
                access_key: WEB3FORMS_ACCESS_KEY,
                name: name,
                email: email,
                message: message,
                subject: "Nuevo Mensaje de Contacto - SashArt Estudio"
            };

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.status === 200) {
                    btn.innerText = 'Mensaje Enviado';
                    btn.style.backgroundColor = '#10B981';
                    contactForm.reset();
                } else {
                    console.error("Web3Forms Error:", result);
                    btn.innerText = 'Error al enviar';
                    btn.style.backgroundColor = '#ef4444';
                }
            } catch (error) {
                console.error("Error de red:", error);
                btn.innerText = 'Error de conexión';
                btn.style.backgroundColor = '#ef4444';
            } finally {
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
});
