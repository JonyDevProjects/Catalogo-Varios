// Galería: elimina miniaturas y usa puntos indicadores bajo la imagen; mantiene pre-carga y variantes automáticas (_1, _2, ...)
(function(){
    const MAX_VARIANTS = 12; // soporta hasta _12 por cuadro

    function parseBase(src){
        // Extrae base sin sufijo _n y extensión
        const m = src.match(/^(.*?)(?:_(\d+))?(\.[a-zA-Z0-9]+)$/);
        if(m){
            return { base: m[1], ext: m[3] };
        }
        // Si no matchea, intenta dividir por última.
        const lastDot = src.lastIndexOf('.');
        if(lastDot > -1){ return { base: src.slice(0,lastDot), ext: src.slice(lastDot) }; }
        return { base: src, ext: '' };
    }

    function unique(arr){
        return Array.from(new Set(arr.filter(Boolean)));
    }

    function preload(src){
        const im = new Image();
        im.decoding = 'async';
        im.loading = 'eager';
        im.src = src;
        return im;
    }

    function checkExists(src){
        return new Promise((resolve)=>{
            const im = new Image();
            im.onload = ()=> resolve(true);
            im.onerror = ()=> resolve(false);
            im.src = src;
        });
    }

    async function discoverVariants(initialList){
        // A partir del primer elemento, intenta _1.._MAX_VARIANTS
        if(!initialList.length) return [];
        const first = initialList[0];
        const { base, ext } = parseBase(first);
        const candidates = [];
        for(let i=1;i<=MAX_VARIANTS;i++){
            const cand = `${base}_${i}${ext}`;
            if(!initialList.includes(cand)) candidates.push(cand);
        }
        const results = await Promise.all(candidates.map(src=>checkExists(src)));
        return candidates.filter((_,i)=>results[i]);
    }

    function setupGallery(card){
        const img = card.querySelector('img.product-image');
        if(!img) return;

        // Construir lista inicial a partir de data-images o del src actual
        const fromAttr = (img.getAttribute('data-images')||'')
            .split(',').map(s=>s.trim()).filter(Boolean);
        if(!fromAttr.length){ fromAttr.push(img.currentSrc || img.src); }
    let list = unique(fromAttr);
    let index = 0;

        // Estructura contenedora
        const container = document.createElement('div');
        container.style.position = 'relative';

        const controls = document.createElement('div');
        controls.className = 'gallery-controls';
        Object.assign(controls.style, {
            position: 'absolute', top: '50%', left: '0', right: '0',
            display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)', padding: '0 8px'
        });
        const btnStyle = 'background: rgba(0,0,0,0.5); color: #fff; border: none; width: 32px; height: 32px; border-radius: 999px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
        const prev = document.createElement('button'); prev.type='button'; prev.style.cssText = btnStyle; prev.textContent = '‹';
        const next = document.createElement('button'); next.type='button'; next.style.cssText = btnStyle; next.textContent = '›';
        controls.append(prev, next);

        // Indicadores (puntos) bajo la imagen
        const dotsWrap = document.createElement('div');
        dotsWrap.className = 'gallery-dots';
        Object.assign(dotsWrap.style, {
            position:'absolute', bottom:'8px', left:'50%', transform:'translateX(-50%)',
            display:'flex', gap:'8px', alignItems:'center', justifyContent:'center',
            padding:'4px 8px', borderRadius:'999px', background:'rgba(0,0,0,0.25)'
        });
        let dots = [];

    function setImage(i){
            index = (i + list.length) % list.length;
            img.src = list[index];
            updateDots();
        }

        function buildDots(){
            dotsWrap.innerHTML = '';
            dots = list.map((_, i) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.setAttribute('aria-label', `Ir a imagen ${i+1}`);
                b.style.cssText = 'width:8px;height:8px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.6);padding:0;';
                b.addEventListener('click', ()=> setImage(i));
                dotsWrap.appendChild(b);
                return b;
            });
            controls.style.display = (list.length > 1 ? 'flex' : 'none');
            dotsWrap.style.display = (list.length > 1 ? 'flex' : 'none');
            updateDots();
        }

        function updateDots(){
            dots.forEach((d, i)=>{
                const active = (i === index);
                d.style.opacity = active ? '1' : '0.6';
                d.style.transform = active ? 'scale(1.25)' : 'scale(1)';
                d.style.background = active ? '#ffffff' : 'rgba(255,255,255,0.6)';
            });
        }

        // Insertar estructura
        const imgParent = img.parentElement;
        imgParent.insertBefore(container, img);
        container.appendChild(img);
    container.appendChild(controls);
    container.appendChild(dotsWrap);

        // Pre-carga de todas las imágenes actuales
    list.forEach(preload);
    buildDots();
    setImage(0);

    prev.addEventListener('click', ()=> setImage(index-1));
    next.addEventListener('click', ()=> setImage(index+1));

        // Descubrir y añadir variantes automáticamente (_1..)
        discoverVariants(list).then(found=>{
            if(found && found.length){
                // evitar duplicados
                const existing = new Set(list);
                const extras = found.filter(f=>!existing.has(f));
                if(extras.length){
                    extras.forEach(preload);
                    list = list.concat(extras);
            buildDots();
                }
            }
        });

        // Exponer estado para lightbox
        const api = {
            get list(){ return list; },
            get index(){ return index; },
            setIndex(i){ setImage(i); }
        };
        card.__gallery = api;
        return api;
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        const galleries = [];
        document.querySelectorAll('main > div').forEach(card => {
            const g = setupGallery(card);
            if (g) galleries.push(g);
        });

        // Lightbox
        const lb = document.getElementById('lightbox');
        const lbImg = document.getElementById('lbImage');
        const lbDots = document.getElementById('lbDots');
        const lbClose = document.getElementById('lbClose');
        const lbPrev = document.getElementById('lbPrev');
        const lbNext = document.getElementById('lbNext');

        let active = null; // { list, index, setIndex }

        function renderLbDots(){
            lbDots.innerHTML = '';
            if(!active) return;
            active.list.forEach((_, i)=>{
                const b = document.createElement('button');
                b.type='button';
                b.style.cssText = 'width:8px;height:8px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.7);padding:0;opacity:0.8;';
                if(i === active.index){ b.style.background = '#fff'; b.style.opacity = '1'; b.style.transform = 'scale(1.25)'; }
                b.addEventListener('click', ()=> setLbIndex(i));
                lbDots.appendChild(b);
            });
        }

        function setLbIndex(i){
            if(!active) return;
            active.index = (i + active.list.length) % active.list.length;
            lbImg.src = active.list[active.index];
            renderLbDots();
        }

        function openLb(list, index){
            active = { list: list.slice(), index: index|0 };
            lb.style.display = 'block';
            setLbIndex(active.index);
        }

        function closeLb(){
            lb.style.display = 'none';
            active = null;
        }

        lbClose.addEventListener('click', closeLb);
        lb.addEventListener('click', (e)=>{
            // cerrar al clicar en overlay fuera de la imagen
            if(e.target === lb) closeLb();
        });
        lbPrev.addEventListener('click', ()=> active && setLbIndex(active.index-1));
        lbNext.addEventListener('click', ()=> active && setLbIndex(active.index+1));
        document.addEventListener('keydown', (e)=>{
            if(lb.style.display !== 'block') return;
            if(e.key === 'Escape') closeLb();
            else if(e.key === 'ArrowLeft') setLbIndex(active.index-1);
            else if(e.key === 'ArrowRight') setLbIndex(active.index+1);
        });

        // Abrir lightbox al hacer clic sobre cualquier imagen del carrusel
        document.querySelectorAll('img.product-image').forEach((im)=>{
            im.style.cursor = 'zoom-in';
            im.addEventListener('click', ()=>{
                const card = im.closest('div.bg-white');
                // Recuperar la lista que usa esa tarjeta
                const g = card && card.__gallery;
                if(g){ openLb(g.list, g.index); }
                else { openLb([im.src], 0); }
            });
        });
    });
})();

// Filtros por Autor y Técnica (auto-detecta desde el contenido de cada tarjeta)
(function(){
    function normalize(s){
        return (s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
    }

    function extractMeta(card){
        const lis = Array.from(card.querySelectorAll('ul li'));
        let autor='', tecnica='';
        for(const li of lis){
            const txt = li.textContent || '';
            const low = normalize(txt);
            if(low.startsWith('autor:')){
                autor = txt.split(':')[1]?.trim() || '';
            } else if(low.startsWith('tecnica:') || low.startsWith('técnica:')){
                tecnica = txt.split(':')[1]?.trim() || '';
            }
        }
        // Guardar en dataset para acceso rápido
        card.dataset.autorRaw = autor;
        card.dataset.autor = normalize(autor);
        card.dataset.tecnicaRaw = tecnica;
        card.dataset.tecnica = normalize(tecnica);
        return { autor, tecnica };
    }

    function populate(select, values){
        // Orden alfabético por presentación (raw), dejar "Todos/as" primero
        const frag = document.createDocumentFragment();
        values.sort((a,b)=> a.localeCompare(b, 'es', { sensitivity:'base' }));
        for(const v of values){
            const opt = document.createElement('option');
            opt.value = v; opt.textContent = v;
            frag.appendChild(opt);
        }
        select.appendChild(frag);
    }

    function init(){
        const cards = Array.from(document.querySelectorAll('main > div'));
        const setAutor = new Map(); // normalized -> raw
        const setTecnica = new Map();
        for(const c of cards){
            const { autor, tecnica } = extractMeta(c);
            const na = normalize(autor);
            const nt = normalize(tecnica);
            // Omitir N/A o vacíos
            if(autor && na !== 'n/a' && na !== 'na' && na !== 'n a') setAutor.set(na, autor);
            if(tecnica && nt !== 'n/a' && nt !== 'na' && nt !== 'n a') setTecnica.set(nt, tecnica);
        }

        const autores = Array.from(setAutor.values());
        const tecnicas = Array.from(setTecnica.values());

        const selAutor = document.getElementById('filterAutor');
        const selTecnica = document.getElementById('filterTecnica');
        const btnClear = document.getElementById('filterClear');
        populate(selAutor, autores);
        populate(selTecnica, tecnicas);

        function apply(){
            const a = normalize(selAutor.value);
            const t = normalize(selTecnica.value);
            for(const c of cards){
                const okAutor = !a || c.dataset.autor === a;
                const okTecnica = !t || c.dataset.tecnica === t;
                c.style.display = (okAutor && okTecnica) ? '' : 'none';
            }
        }
        selAutor.addEventListener('change', apply);
        selTecnica.addEventListener('change', apply);
        btnClear.addEventListener('click', ()=>{
            selAutor.value = '';
            selTecnica.value = '';
            apply();
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();

// Añade botón "Ver anuncio" a cada tarjeta, usando data-ad-url si se define
(function(){
    // Mapa de enlaces por número de cuadro o por clave 'marco'
    const adMap = {
        '1': 'https://es.wallapop.com/item/cuadro-pintura-al-oleo-1162278763',
        '2': 'https://es.wallapop.com/item/acuarela-avenida-constitucion-1165947466',
        '3': 'https://es.wallapop.com/item/oleo-paisaje-montana-colomina-1165949442',
        '4': 'https://es.wallapop.com/item/cuadro-calle-padre-damian-1165950622',
        '5': 'https://es.wallapop.com/item/cuadro-virgen-fuensalila-oleo-s-xx-1165952653',
        '6': 'https://es.wallapop.com/item/cuadro-oleo-flores-lienzo-1166022294',
        '7': 'https://es.wallapop.com/item/cuadro-oleo-flores-lienzo-1166022294',
        '8': 'https://es.wallapop.com/item/cuadro-oleo-lienzo-muelle-1166023641',
        '9': 'https://es.wallapop.com/item/oleo-sobre-tabla-paisaje-1166025125',
        'marco': 'https://es.wallapop.com/item/marco-dorado-antiguo-1166026612',
        '10': 'https://es.wallapop.com/item/cuadro-al-oleo-sobre-tabla-1166027599',
        '11': 'https://es.wallapop.com/item/cuadro-al-oleo-paisaje-campestre-1166029879',
        '12': 'https://es.wallapop.com/item/oleo-s-lienzo-muelle-chipiona-1166031850',
        '13': 'https://es.wallapop.com/item/papiro-egipcio-enmarcado-1166033689',
        '14': 'https://es.wallapop.com/item/cuadro-oleo-sobre-lienzo-vista-de-puerto-1166131679',
        '15': 'https://es.wallapop.com/item/oleo-sobre-tabla-paisaje-campestre-1166131861',
        '16': 'https://es.wallapop.com/item/oleo-sobre-lienzo-patio-tradicional-canario-1166132471',
        '17': 'https://es.wallapop.com/item/cuadro-mosaico-enmarcado-artesanal-1166132627',
        '18': 'https://es.wallapop.com/item/cuadro-punto-de-cruz-alfabeto-1166132703',
        '19': 'https://es.wallapop.com/item/cuadro-puerto-sevilla-1166132867',
        '20': 'https://es.wallapop.com/item/oleo-anciano-balines-sobre-hojas-1166133033',
        '21': 'https://es.wallapop.com/item/grabado-torre-del-oro-cuadro-1166133148',
        '22': 'https://es.wallapop.com/item/grabado-puente-triana-1166133397',
        '23': 'https://es.wallapop.com/item/acuarela-patio-sevillano-1166133486',
        '24': 'https://es.wallapop.com/item/acuarela-urbana-enmarcada-1166133591',
        '25': 'https://es.wallapop.com/item/oleo-sobre-lienzo-con-espatula-paisaje-campestre-1166134636',
        '26': 'https://es.wallapop.com/item/cuadro-seda-bali-arte-tradicional-1166134800',
        '27': 'https://es.wallapop.com/item/grabado-lance-taurino-1166134903',
        '28': 'https://es.wallapop.com/item/cuadro-seda-balinesa-arte-asiatico-1166134945',
        '29': 'https://es.wallapop.com/item/oleo-s-xx-escena-costera-1166135031',
        '30': 'https://es.wallapop.com/item/oleo-anciana-balinesa-1166135255',
        '31': 'https://es.wallapop.com/item/cuadro-flores-oleo-sobre-cobre-1166654098',
        '32': 'https://es.wallapop.com/item/cuadro-oleo-paisaje-holandes-1166655273',
        '33': 'https://es.wallapop.com/item/aguafuerte-enmarcado-e-huck-1166656516',
        '34': 'https://es.wallapop.com/item/acuarela-cohetero-en-pueblo-blanco-1166785553',
        '35': 'https://es.wallapop.com/item/laminas-bajamar-enmarcadas-1166792012',
        '36': 'https://es.wallapop.com/item/laminas-bajamar-enmarcadas-1166792012',
        '37': 'https://es.wallapop.com/item/laminas-bajamar-enmarcadas-1166792012',
        '38': 'https://es.wallapop.com/item/laminas-bajamar-enmarcadas-1166792012',
        '39': 'https://es.wallapop.com/item/pintura-seda-bali-arte-unico-1166795063',
        '40': 'https://es.wallapop.com/item/pintura-seda-balinesa-aves-exoticas-una-llena-1166796916',
        '41': 'https://es.wallapop.com/item/pintura-seda-bali-naturaleza-vibrante-1166797705',
        '42': 'https://es.wallapop.com/item/dibujo-nino-betun-sobre-lamina-1166798382'
    };

    function enhance(){
        document.querySelectorAll('main > div.bg-white.rounded-lg').forEach(card => {
            // Evitar duplicar si ya existe
            if(card.querySelector('.ad-actions')) return;
            // Detectar número de cuadro o si es Marco
            const title = card.querySelector('h2')?.textContent || '';
            let key = null;
            const m = title.match(/Cuadro\s+(\d+)/i);
            if(m) key = m[1];
            else if(/^\s*Marco\b/i.test(title)) key = 'marco';

            const url = card.getAttribute('data-ad-url') || (key ? adMap[key] : undefined);
            const body = card.querySelector('.p-4');
            if(!body) return;
            const actions = document.createElement('div');
            actions.className = 'ad-actions';
            actions.style.cssText = 'margin-top:8px; display:flex; justify-content:flex-end;';
            const btn = document.createElement('a');
            btn.textContent = 'Ver anuncio';
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
            btn.href = url || '#';
            btn.style.cssText = 'background:#facc15;color:#111;padding:8px 12px;border-radius:8px;font-weight:600;text-decoration:none;opacity:' + (url? '1' : '0.6') + '; pointer-events:' + (url? 'auto' : 'none') + ';';
            actions.appendChild(btn);
            body.appendChild(actions);
        });
    }
    document.addEventListener('DOMContentLoaded', enhance);
})();

// Añade marcas de estado (RESERVADO/DISPONIBLE) a cada tarjeta
(function(){
    function addStatusIndicators(){
        document.querySelectorAll('main > div.bg-white.rounded-lg').forEach(card => {
            // Evitar duplicar si ya existe
            if(card.querySelector('.status-indicator')) return;

            // Verificar si el producto está marcado como reservado
            const isReserved = card.hasAttribute('data-reserved') && card.getAttribute('data-reserved') === 'true';
            
            // Agregar clase al contenedor principal
            if(isReserved) {
                card.classList.add('product-card', 'reserved');
            } else {
                card.classList.add('product-card');
            }

            // Crear el indicador de estado en la parte inferior derecha
            const statusIndicator = document.createElement('div');
            statusIndicator.className = `status-indicator ${isReserved ? 'reserved' : 'available'}`;
            statusIndicator.textContent = isReserved ? 'RESERVADO' : 'DISPONIBLE';
            
            // Posicionar el indicador sobre la imagen
            const imageContainer = card.querySelector('img').parentElement;
            imageContainer.style.position = 'relative';
            imageContainer.appendChild(statusIndicator);

            // Si está reservado, también agregar una marca más visible en la esquina superior
            // if(isReserved) {
            //     const reservedBadge = document.createElement('div');
            //     reservedBadge.className = 'reserved-badge';
            //     reservedBadge.textContent = 'RESERVADO';
            //     imageContainer.appendChild(reservedBadge);
            // }
        });
    }

    document.addEventListener('DOMContentLoaded', addStatusIndicators);
})();

// Manejo de pestañas de sección (Cuadros / Artículos Varios)
(function(){
    let currentSection = 'cuadros'; // Sección activa por defecto

    function initSectionTabs(){
        const tabs = document.querySelectorAll('.section-tab');
        const cuadrosSection = document.getElementById('cuadros-section');
        const variosSection = document.getElementById('varios-section');

        function switchSection(sectionName) {
            currentSection = sectionName;
            
            // Actualizar estado visual de las pestañas
            tabs.forEach(tab => {
                const tabSection = tab.getAttribute('data-section');
                if(tabSection === sectionName) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });

            // Mostrar/ocultar secciones
            if(sectionName === 'cuadros') {
                if(cuadrosSection) cuadrosSection.style.display = 'block';
                if(variosSection) variosSection.style.display = 'none';
            } else {
                if(cuadrosSection) cuadrosSection.style.display = 'none';
                if(variosSection) variosSection.style.display = 'block';
            }
            
            // Actualizar título de la página
            document.title = sectionName === 'cuadros' 
                ? 'Catálogo de Cuadros - Industrias Ariova'
                : 'Catálogo de Artículos Varios - Industrias Ariova';
        }

        // Agregar event listeners a las pestañas
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const sectionName = tab.getAttribute('data-section');
                switchSection(sectionName);
            });
        });

        // Inicializar con la sección de cuadros activa
        switchSection('cuadros');
    }

    document.addEventListener('DOMContentLoaded', initSectionTabs);
})();
