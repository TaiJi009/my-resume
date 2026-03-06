// 回到顶部按钮功能
const backToTopButton = document.createElement('a');
backToTopButton.href = '#';
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopButton);

// 监听滚动事件，控制回到顶部按钮的显示/隐藏
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// 平滑滚动到顶部
backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 导航栏平滑滚动
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 滚动动画效果
const sections = document.querySelectorAll('.section');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// 响应式导航栏
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');

if (navList) {
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            navList.style.flexDirection = 'column';
            navList.style.alignItems = 'center';
        } else {
            navList.style.flexDirection = 'row';
            navList.style.alignItems = 'center';
        }
    });

    if (window.innerWidth <= 768) {
        navList.style.flexDirection = 'column';
        navList.style.alignItems = 'center';
    }
}

// 导航栏固定效果
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            nav.style.padding = '0';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '0';
        }
    });
}

// 为页面添加一些交互效果
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(5px)';
        item.style.transition = 'transform 0.3s ease';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// 技能卡片交互效果
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'translateY(-5px)';
        category.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.1)';
        category.style.transition = 'all 0.3s ease';
    });
    category.addEventListener('mouseleave', () => {
        category.style.transform = 'translateY(0)';
        category.style.boxShadow = 'none';
    });
});

// 证书卡片交互效果
const certificateItems = document.querySelectorAll('.certificate-item');
certificateItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.1)';
        item.style.transition = 'all 0.3s ease';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = 'none';
    });
});

// 体验项目交互效果
const experienceItems = document.querySelectorAll('.experience-item, .campus-item');
experienceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(5px)';
        item.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.1)';
        item.style.transition = 'all 0.3s ease';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
        item.style.boxShadow = 'none';
    });
});

// 主题切换功能
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

// 检查本地存储或系统偏好
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// 应用主题
const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
};

// 初始化主题
const initTheme = () => {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);
};

// 切换主题事件
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// 页面加载时初始化
initTheme();
