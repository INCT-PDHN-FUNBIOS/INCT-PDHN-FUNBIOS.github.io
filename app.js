document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const themeBtn = document.getElementById('theme-btn');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const navGroupBtns = document.querySelectorAll('.nav-group-btn');
    const container = document.getElementById('markdown-container');
    const loader = document.getElementById('loading');

    // --- Theme Toggle ---
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeBtn.innerHTML = '<i class="ph ph-sun"></i> Light Mode';
        } else {
            themeBtn.innerHTML = '<i class="ph ph-moon"></i> Dark Mode';
        }
    }

    // --- Mobile Menu Toggle ---
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Close sidebar on click outside in mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // --- Collapsible Groups ---
    navGroupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.parentElement;
            group.classList.toggle('open');
        });
    });

    // --- Marked.js Configuration ---
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            } else {
                return hljs.highlightAuto(code).value;
            }
        },
        breaks: true,
        gfm: true
    });

    // --- Routing & Markdown Fetching ---
    async function loadContent() {
        // Get hash from URL, default to #home
        let hash = window.location.hash || '#home';
        
        // Find corresponding nav item
        const activeLink = document.querySelector(`.nav-item[href="${hash}"]`);
        
        if (!activeLink) {
            container.innerHTML = '<h1>404 - Página não encontrada</h1>';
            return;
        }

        // Update active state in sidebar
        navItems.forEach(item => item.classList.remove('active'));
        activeLink.classList.add('active');
        
        // Open parent group if it's a sub-item
        const parentGroup = activeLink.closest('.nav-group');
        if (parentGroup) {
            parentGroup.classList.add('open');
        }

        // Close mobile sidebar
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }

        // Load markdown
        const fileUrl = activeLink.getAttribute('data-file');
        
        try {
            // Show loader, hide container
            container.style.display = 'none';
            loader.style.display = 'flex';
            
            // Re-trigger animation
            container.style.animation = 'none';
            container.offsetHeight; // trigger reflow
            
            const response = await fetch(fileUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            let markdownText = await response.text();
            
            // Fix relative image paths so they load correctly from the root index.html
            const basePath = fileUrl.includes('/') ? fileUrl.substring(0, fileUrl.lastIndexOf('/') + 1) : '';
            
            // Rewrite markdown images: ![alt](path) -> ![alt](basePath/path)
            markdownText = markdownText.replace(/!\[([^\]]*)\]\((?!http|\/|data:)(.*?)\)/g, `![$1](${basePath}$2)`);
            
            // Rewrite HTML images: <img src="path"> -> <img src="basePath/path">
            markdownText = markdownText.replace(/<img([^>]+)src=["'](?!http|\/|data:)(.*?)["']/g, `<img$1src="${basePath}$2"`);
            
            // Render HTML
            container.innerHTML = marked.parse(markdownText);
            
        } catch (error) {
            console.error('Error fetching markdown:', error);
            container.innerHTML = `
                <div style="text-align:center; padding: 2rem;">
                    <i class="ph ph-warning-circle" style="font-size: 4rem; color: var(--color-primary);"></i>
                    <h2>Erro ao carregar o conteúdo</h2>
                    <p>Não foi possível carregar ${fileUrl}.</p>
                    <p style="font-size: 0.9em; color: var(--text-muted); margin-top: 1rem;">
                        Certifique-se de que está rodando um servidor local (ex: <code>python -m http.server</code>).
                    </p>
                </div>
            `;
        } finally {
            // Hide loader, show container with animation
            loader.style.display = 'none';
            container.style.display = 'block';
            container.style.animation = 'fadeUp 0.5s forwards';
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }

    // Listen to hash changes
    window.addEventListener('hashchange', loadContent);
    
    // Initial load
    loadContent();
});
