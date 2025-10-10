
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js only if the container exists and the library is loaded
    try {
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer && window.particlesJS && typeof particlesJS.load === 'function') {
            particlesJS.load('particles-js', '/particles.json', function () {
                // eslint-disable-next-line no-console
                console.log('callback - particles.js config loaded');
            });
        }
    } catch (e) {
        // If particles library throws or is missing, fail silently.
    }

    // Typewriter Effect - initialize only when elements exist and library is present
    const infoEl = document.querySelector('#typewriter-info');
    const mainEl = document.querySelector('#typewriter-main');

    // noop stub for the info writer so we can safely call its methods when the element is absent
    const createNoopWriter = () => ({
        typeString: () => ({ start: () => { } }),
        deleteAll: () => ({ start: () => { } }),
    });

    if (typeof Typewriter === 'undefined') {
        console.warn('Typewriter library not found; skipping typewriter initialization.');
        return;
    }

    // We'll initialize Typewriter instances after we know settings (from /typewriter.json)
    let typewriterInfo = createNoopWriter();
    let typewriterMain = null;

    function writeText(title, data) {
        if (!typewriterMain) return;

        typewriterMain
            .callFunction(() => {
                if (infoEl) typewriterInfo.typeString(data).start();
            })
            .typeString(title)
            .pauseFor(2500)
            .callFunction(() => {
                if (infoEl) typewriterInfo.deleteAll(0).start();
            })
            .deleteAll();
    }

    // Normalize different shapes of entries and map JSON keys used in the example
    const enqueueFromEntry = (entry) => {
        if (!entry) return;
        if (typeof entry === 'object' && !Array.isArray(entry)) {
            // support both "subtitle" and "info" naming
            const title = entry.title || entry.text || entry.name || '';
            const info = entry.subtitle || entry.info || entry.description || '';
            writeText(String(title), String(info));
        } else if (Array.isArray(entry)) {
            writeText(String(entry[0] || ''), String(entry[1] || ''));
        } else if (typeof entry === 'string') {
            if (entry.includes('|')) {
                const parts = entry.split('|');
                writeText(parts[0].trim(), parts.slice(1).join('|').trim());
            } else {
                writeText(entry.trim(), '');
            }
        }
    };

    // Try to fetch phrases and settings from /typewriter.json and initialize accordingly.
    fetch('/typewriter.json', { cache: 'no-store' })
        .then((resp) => {
            if (!resp.ok) throw new Error('Failed to fetch typewriter.json: ' + resp.status);
            return resp.json();
        })
        .then((data) => {
            // data may be an array or an object with settings + array (example provided)
            let settings = {};
            let entries = [];

            if (Array.isArray(data)) {
                entries = data;
            } else if (typeof data === 'object' && data !== null) {
                // example file uses 'writter' (misspelled) with objects having title/subtitle
                settings.delay = data.delay;
                settings.deleteSpeed = data.deleteSpeed;
                if (typeof data.loop !== 'undefined') settings.loop = data.loop;
                // support multiple possible property names for the list
                entries = data.writter || data.writer || data.phrases || data.writes || [];
            }

            if (!entries || entries.length === 0) {
                entries = ['Welcome to my blog'];
            }

            // Initialize typewriter instances using settings (or defaults)
            const mainDelay = typeof settings.delay === 'number' ? settings.delay : 40;
            const infoDelay = typeof settings.infoDelay === 'number' ? settings.infoDelay : 1;
            const deleteSpeed = typeof settings.deleteSpeed === 'number' ? settings.deleteSpeed : 1;
            const loop = typeof settings.loop === 'boolean' ? settings.loop : true;

            typewriterInfo = infoEl ? new Typewriter(infoEl, { delay: infoDelay, deleteSpeed }) : createNoopWriter();
            typewriterMain = mainEl ? new Typewriter(mainEl, { loop, delay: mainDelay }) : null;

            // enqueue
            entries.forEach(enqueueFromEntry);
        })
        .catch((err) => {
            console.warn('Could not load /typewriter.json, using fallback. Error:', err);
            // Ensure instances are still created with defaults so fallback runs
            typewriterInfo = infoEl ? new Typewriter(infoEl, { delay: 1, deleteSpeed: 1 }) : createNoopWriter();
            typewriterMain = mainEl ? new Typewriter(mainEl, { loop: true, delay: 40 }) : null;
            enqueueFromEntry('Welcome to my blog');
        })
        .finally(() => {
            // start if we have a main writer
            try { if (typewriterMain) typewriterMain.start(); } catch (e) { /* ignore start errors */ }
        });
});
