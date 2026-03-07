document.addEventListener("DOMContentLoaded", () => {
    const langToggleBtn = document.getElementById("lang-toggle");
    let currentLang = "ar";

    function applyTranslations(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        langToggleBtn.textContent = lang === 'ar' ? "English" : "العربية";
        currentLang = lang;
    }

    applyTranslations('ar');

    langToggleBtn.addEventListener("click", () => {
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        applyTranslations(newLang);
    });

    // ——— Staggered Scroll Reveal Animation ———
    const observerOptions = {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all .anim-item and stagger siblings within the same parent grid
    const animItems = document.querySelectorAll('.anim-item');
    
    // Group items by parent to stagger
    const parentGroups = new Map();
    animItems.forEach(item => {
        const parent = item.parentElement;
        if (!parentGroups.has(parent)) {
            parentGroups.set(parent, []);
        }
        parentGroups.get(parent).push(item);
    });

    parentGroups.forEach((items, parent) => {
        items.forEach((item, index) => {
            // Add stagger delay per group
            item.style.transitionDelay = `${index * 0.08}s`;
            observer.observe(item);
        });
    });

    // Also observe glass-cards without anim-item (hero etc.)
    document.querySelectorAll('.glass-card:not(.anim-item)').forEach(card => {
        card.classList.add('anim-item');
        observer.observe(card);
    });
});
