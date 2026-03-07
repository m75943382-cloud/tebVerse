document.addEventListener("DOMContentLoaded", () => {
    const langToggleBtn = document.getElementById("lang-toggle");
    let currentLang = "ar"; // Default language

    // Function to apply translations
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

        // Update Button Text
        langToggleBtn.textContent = lang === 'ar' ? "English" : "العربية";
        currentLang = lang;
    }

    // Initialize with default Language
    applyTranslations('ar');

    // Toggle button listener
    langToggleBtn.addEventListener("click", () => {
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        applyTranslations(newLang);
    });

    // Simple scroll animation for glass-cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});
