// Catalog.js - Sistema de catálogo basado en objetos JSON
class CatalogRenderer {
    constructor() {
        this.data = null;
        this.currentSection = 'cuadros';
        this.filters = {
            autor: '',
            tecnica: ''
        };
    }

    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
            this.renderSection(this.currentSection);
            this.setupFilters();
            this.initGallery();
            this.initLightbox();
        } catch (error) {
            console.error('Error initializing catalog:', error);
        }
    }

    async loadData() {
        const response = await fetch('Articulos.json');
        this.data = await response.json();
        
        console.log('Cuadros cargados:', this.data.cuadros?.length || 0);
        console.log('Artículos cargados:', this.data.articulos?.length || 0);
    }

    setupEventListeners() {
        // Event listeners para las pestañas de sección
        document.querySelectorAll('.section-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.switchSection(section);
            });
        });

        // Event listeners para filtros
        document.getElementById('filterAutor').addEventListener('change', (e) => {
            this.filters.autor = e.target.value;
            this.applyFilters();
        });

        document.getElementById('filterTecnica').addEventListener('change', (e) => {
            this.filters.tecnica = e.target.value;
            this.applyFilters();
        });

        document.getElementById('filterClear').addEventListener('click', () => {
            this.clearFilters();
        });
    }

    switchSection(section) {
        this.currentSection = section;
        
        // Actualizar pestañas activas
        document.querySelectorAll('.section-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.section-tab[data-section="${section}"]`).classList.add('active');
        
        // Mostrar/ocultar secciones
        document.getElementById('cuadros-section').style.display = section === 'cuadros' ? 'block' : 'none';
        document.getElementById('varios-section').style.display = section === 'articulos' ? 'block' : 'none';
        
        this.renderSection(section);
    }

    renderSection(section) {
        const container = section === 'cuadros' 
            ? document.querySelector('#cuadros-section main')
            : document.querySelector('#varios-section main');
        
        const items = this.data[section] || [];
        container.innerHTML = this.renderItems(items, section);
        
        // Re-inicializar funcionalidades después de renderizar
        this.initGallery();
        this.addStatusIndicators();
        this.addAdButtons();
    }

    renderItems(items, section) {
        return items.map(item => this.renderItem(item, section)).join('');
    }

    renderItem(item, section) {
        const priceText = item.precioDes || (item.precio > 0 ? `${item.precio}€` : 'Consultar');
        const imagesData = item.imagenes.join(',');
        const reservedAttr = item.reservado ? 'data-reserved="true"' : '';
        const soldAttr = item.vendido ? 'data-sold="true"' : '';
        const adUrlAttr = item.adUrl ? `data-ad-url="${item.adUrl}"` : '';
        
        if (section === 'cuadros') {
            return `
                <div class="bg-white rounded-lg shadow-md overflow-hidden" ${reservedAttr} ${soldAttr} ${adUrlAttr}>
                    <img src="${item.imagenes[0]}" 
                        alt="${item.alt}" 
                        class="product-image" 
                        loading="lazy"
                        data-images="${imagesData}">
                    <div class="p-4">
                        <h2 class="text-xl font-bold mb-2">${item.titulo}</h2>
                        <p class="text-gray-700 text-sm mb-2">${item.descripcion}</p>
                        <ul class="text-sm text-gray-500">
                            ${item.autor ? `<li><strong>Autor:</strong> ${item.autor}</li>` : ''}
                            ${item.tecnica ? `<li><strong>Técnica:</strong> ${item.tecnica}</li>` : ''}
                            ${item.medidas ? `<li><strong>Medidas:</strong> ${item.medidas}</li>` : ''}
                            ${item.precio > 0 || item.precioDes ? `<li><strong>Precio:</strong> ${priceText}</li>` : ''}
                        </ul>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="bg-white rounded-lg shadow-md overflow-hidden" ${reservedAttr} ${soldAttr} ${adUrlAttr}>
                    <img src="${item.imagenes[0]}" 
                        alt="${item.alt}" 
                        class="product-image" 
                        loading="lazy"
                        ${item.imagenes.length > 1 ? `data-images="${imagesData}"` : ''}>
                    <div class="p-4">
                        <h2 class="text-xl font-bold mb-2">${item.titulo}</h2>
                        <p class="text-gray-700 text-sm mb-2">${item.descripcion}</p>
                        <ul class="text-sm text-gray-500">
                            <li><strong>Categoría:</strong> ${item.categoria}</li>
                            ${item.material ? `<li><strong>Material:</strong> ${item.material}</li>` : ''}
                            ${item.medidas ? `<li><strong>Medidas:</strong> ${item.medidas}</li>` : ''}
                            ${item.precio > 0 || item.precioDes ? `<li><strong>Precio:</strong> ${priceText}</li>` : ''}
                        </ul>
                    </div>
                </div>
            `;
        }
    }

    setupFilters() {
        const cuadros = this.data.cuadros || [];
        
        // Llenar filtro de autores
        const autores = [...new Set(cuadros.map(item => item.autor).filter(Boolean))].sort();
        const autorSelect = document.getElementById('filterAutor');
        autorSelect.innerHTML = '<option value="">Todos</option>' + 
            autores.map(autor => `<option value="${autor}">${autor}</option>`).join('');
        
        // Llenar filtro de técnicas
        const tecnicas = [...new Set(cuadros.map(item => item.tecnica).filter(Boolean))].sort();
        const tecnicaSelect = document.getElementById('filterTecnica');
        tecnicaSelect.innerHTML = '<option value="">Todas</option>' + 
            tecnicas.map(tecnica => `<option value="${tecnica}">${tecnica}</option>`).join('');
    }

    applyFilters() {
        if (this.currentSection !== 'cuadros') return;
        
        let filteredItems = this.data.cuadros;
        
        if (this.filters.autor) {
            filteredItems = filteredItems.filter(item => item.autor === this.filters.autor);
        }
        
        if (this.filters.tecnica) {
            filteredItems = filteredItems.filter(item => item.tecnica === this.filters.tecnica);
        }
        
        const container = document.querySelector('#cuadros-section main');
        container.innerHTML = this.renderItems(filteredItems, 'cuadros');
        
        // Re-inicializar funcionalidades
        this.initGallery();
        this.addStatusIndicators();
        this.addAdButtons();
    }

    clearFilters() {
        this.filters = { autor: '', tecnica: '' };
        document.getElementById('filterAutor').value = '';
        document.getElementById('filterTecnica').value = '';
        this.applyFilters();
    }

    // Configurar galerías - solo usar las imágenes que están en el JSON
    initGallery() {
        function unique(arr) {
            return Array.from(new Set(arr.filter(Boolean)));
        }

        function preload(src) {
            const im = new Image();
            im.decoding = 'async';
            im.loading = 'eager';
            im.src = src;
            return im;
        }

        async function setupGallery(img) {
            const dataImages = img.getAttribute('data-images');
            let list = dataImages ? 
                dataImages.split(',').map(s => s.trim()).filter(Boolean) : 
                [img.src];

            // Solo usar las imágenes que están definidas en el JSON
            list = unique(list);

            if (list.length <= 1) return;

            list.forEach(src => preload(src));

            let currentIndex = 0;
            let dots = [];
            let touchStartX = 0;
            let touchEndX = 0;

            const container = img.closest('.bg-white.rounded-lg');
            if (!container || container.querySelector('.gallery-dots')) return;

            // Crear contenedor de imagen con controles
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-gallery-container';
            imageContainer.style.cssText = 'position: relative; overflow: hidden;';

            // Envolver la imagen
            img.parentNode.insertBefore(imageContainer, img);
            imageContainer.appendChild(img);

            // Crear controles de navegación (flechas)
            const prevBtn = document.createElement('button');
            prevBtn.className = 'gallery-nav gallery-prev';
            prevBtn.innerHTML = '&#8249;';
            prevBtn.style.cssText = 'position: absolute; left: 8px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-size: 18px; font-weight: bold; z-index: 5; opacity: 0; transition: opacity 0.3s;';

            const nextBtn = document.createElement('button');
            nextBtn.className = 'gallery-nav gallery-next';
            nextBtn.innerHTML = '&#8250;';
            nextBtn.style.cssText = 'position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-size: 18px; font-weight: bold; z-index: 5; opacity: 0; transition: opacity 0.3s;';

            // Crear dots
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'gallery-dots';
            dotsContainer.style.cssText = 'position:absolute; bottom:8px; left:50%; transform:translateX(-50%); display:flex; gap:4px; background:rgba(255,255,255,0.9); padding:4px 8px; border-radius:999px; backdrop-filter:blur(4px); z-index: 5;';

            // Añadir controles al contenedor
            imageContainer.appendChild(prevBtn);
            imageContainer.appendChild(nextBtn);
            imageContainer.appendChild(dotsContainer);

            // Mostrar/ocultar controles al hacer hover
            imageContainer.addEventListener('mouseenter', () => {
                prevBtn.style.opacity = '1';
                nextBtn.style.opacity = '1';
            });

            imageContainer.addEventListener('mouseleave', () => {
                prevBtn.style.opacity = '0';
                nextBtn.style.opacity = '0';
            });

            // Crear dots
            dots = list.map((_, i) => {
                const dot = document.createElement('button');
                dot.style.cssText = 'width:8px; height:8px; border-radius:50%; border:none; cursor:pointer; transition:background 0.2s;';
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = i;
                    updateGallery();
                });
                dotsContainer.appendChild(dot);
                return dot;
            });

            // Funciones de navegación
            function prevImage() {
                currentIndex = (currentIndex - 1 + list.length) % list.length;
                updateGallery();
            }

            function nextImage() {
                currentIndex = (currentIndex + 1) % list.length;
                updateGallery();
            }

            function updateGallery() {
                img.src = list[currentIndex];
                dots.forEach((dot, i) => {
                    dot.style.background = i === currentIndex ? '#facc15' : '#d1d5db';
                });
            }

            // Event listeners para botones
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevImage();
            });

            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextImage();
            });

            // Soporte táctil (touch/swipe)
            imageContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            imageContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const swipeThreshold = 50; // mínimo de píxeles para considerar un swipe
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe izquierda (siguiente imagen)
                        nextImage();
                    } else {
                        // Swipe derecha (imagen anterior)
                        prevImage();
                    }
                }
            }

            // Soporte para teclado cuando el contenedor tiene foco
            imageContainer.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.stopPropagation();
                    prevImage();
                } else if (e.key === 'ArrowRight') {
                    e.stopPropagation();
                    nextImage();
                }
            });

            // Hacer el contenedor focusable
            imageContainer.setAttribute('tabindex', '0');

            updateGallery();
        }

        document.querySelectorAll('.product-image').forEach(setupGallery);
    }

    // Lightbox (adaptado del código original)
    initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lbImage = document.getElementById('lbImage');
        const lbClose = document.getElementById('lbClose');
        const lbPrev = document.getElementById('lbPrev');
        const lbNext = document.getElementById('lbNext');
        const lbDots = document.getElementById('lbDots');

        let currentImages = [];
        let currentIndex = 0;

        function openLightbox(images, index = 0) {
            currentImages = images;
            currentIndex = index;
            updateLightbox();
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }

        function updateLightbox() {
            if (!currentImages.length) return;
            
            lbImage.src = currentImages[currentIndex];
            
            // Actualizar dots
            lbDots.innerHTML = '';
            if (currentImages.length > 1) {
                currentImages.forEach((_, i) => {
                    const dot = document.createElement('button');
                    dot.style.cssText = `width:10px; height:10px; border-radius:50%; border:none; cursor:pointer; margin:0 2px; background:${i === currentIndex ? '#facc15' : 'rgba(255,255,255,0.5)'};`;
                    dot.addEventListener('click', () => {
                        currentIndex = i;
                        updateLightbox();
                    });
                    lbDots.appendChild(dot);
                });
            }
            
            // Mostrar/ocultar controles
            const showControls = currentImages.length > 1;
            lbPrev.style.display = showControls ? 'block' : 'none';
            lbNext.style.display = showControls ? 'block' : 'none';
        }

        function prevImage() {
            if (currentImages.length > 1) {
                currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
                updateLightbox();
            }
        }

        function nextImage() {
            if (currentImages.length > 1) {
                currentIndex = (currentIndex + 1) % currentImages.length;
                updateLightbox();
            }
        }

        // Event listeners
        lbClose.addEventListener('click', closeLightbox);
        lbPrev.addEventListener('click', prevImage);
        lbNext.addEventListener('click', nextImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'block') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'ArrowRight') nextImage();
            }
        });

        // Agregar event listeners a las imágenes
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('product-image')) {
                const dataImages = e.target.getAttribute('data-images');
                const images = dataImages ? 
                    dataImages.split(',').map(s => s.trim()).filter(Boolean) : 
                    [e.target.src];
                openLightbox(images);
            }
        });
    }

    // Indicadores de estado (adaptado del código original)
    addStatusIndicators() {
        document.querySelectorAll('main > div.bg-white.rounded-lg').forEach(card => {
            if (card.querySelector('.status-indicator')) return;

            const isReserved = card.hasAttribute('data-reserved') && card.getAttribute('data-reserved') === 'true';
            const isSold = card.hasAttribute('data-sold') && card.getAttribute('data-sold') === 'true';
            
            // Determinar el estado prioritario (vendido > reservado > disponible)
            let status, statusText, statusClass;
            
            if (isSold) {
                status = 'sold';
                statusText = 'VENDIDO';
                statusClass = 'product-card sold';
            } else if (isReserved) {
                status = 'reserved';
                statusText = 'RESERVADO';
                statusClass = 'product-card reserved';
            } else {
                status = 'available';
                statusText = 'DISPONIBLE';
                statusClass = 'product-card available';
            }
            
            // Aplicar clases CSS
            card.className = card.className.replace(/product-card\s*(sold|reserved|available)?/g, '').trim();
            card.classList.add(...statusClass.split(' '));

            // Crear indicador de estado
            const statusIndicator = document.createElement('div');
            statusIndicator.className = `status-indicator ${status}`;
            statusIndicator.textContent = statusText;
            card.appendChild(statusIndicator);
        });
    }

    // Botones de anuncios (adaptado del código original)
    addAdButtons() {
        document.querySelectorAll('main > div.bg-white.rounded-lg').forEach(card => {
            if (card.querySelector('.ad-actions')) return;

            const url = card.getAttribute('data-ad-url');
            const body = card.querySelector('.p-4');
            if (!body) return;

            const actions = document.createElement('div');
            actions.className = 'ad-actions';
            actions.style.cssText = 'margin-top:8px; display:flex; justify-content:flex-end;';
            
            const btn = document.createElement('a');
            btn.textContent = 'Ver anuncio';
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
            btn.href = url || '#';
            btn.style.cssText = `background:#facc15;color:#111;padding:8px 12px;border-radius:8px;font-weight:600;text-decoration:none;opacity:${url ? '1' : '0.6'}; pointer-events:${url ? 'auto' : 'none'};`;
            
            actions.appendChild(btn);
            body.appendChild(actions);
        });
    }
}

// Inicializar el catálogo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const catalog = new CatalogRenderer();
    catalog.init();
});
