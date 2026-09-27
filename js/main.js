document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-link:not(.external-link)');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle current accordion
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Particle Background Effect
    initParticles();
});

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    
    // Resize canvas
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
            this.color = Math.random() > 0.5 ? 'rgba(0, 243, 255, 0.3)' : 'rgba(188, 19, 254, 0.3)';
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles based on screen size (less particles on mobile)
    const particleCount = width < 768 ? 30 : 70;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw connection lines
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}


// ==========================================
// CURRENCY SWITCHER
// ==========================================
const currencyBtns = document.querySelectorAll('.currency-btn');
const priceVals = document.querySelectorAll('.price-val');
const currencyLabels = document.querySelectorAll('.currency-label');

let currentCurrency = localStorage.getItem('currency') || 'USDT';

function updatePrices() {
    // Update active button
    currencyBtns.forEach(btn => {
        if(btn.dataset.currency === currentCurrency) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update values
    priceVals.forEach(el => {
        if(currentCurrency === 'LKR') {
            el.textContent = el.dataset.lkr;
        } else {
            el.textContent = '$' + el.dataset.usdt;
        }
    });
    
    // Update labels
    currencyLabels.forEach(el => {
        el.textContent = currentCurrency;
    });
    
    // Save preference
    localStorage.setItem('currency', currentCurrency);
}

currencyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentCurrency = e.target.dataset.currency;
        updatePrices();
    });
});

// Initialize on load
updatePrices();

// ==========================================
// MODAL LOGIC
// ==========================================
function openProjectModal(e) {
    if(e) e.preventDefault();
    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openContactModal(e) {
    if(e) e.preventDefault();
    document.getElementById('contactModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Close on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
});

// Close on outside click
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModals();
    });
});

function openGoogleForm() {
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSftkMnV7eah1K96QRrRHn_4GCK_r__93d4GC2K3izyzd7wMcA/viewform?usp=preview"; 
    if(GOOGLE_FORM_URL.includes("PASTE_GOOGLE_FORM_URL_HERE")) {
        alert("Google Form link is pending setup. Please configure GOOGLE_FORM_URL in js/main.js.");
    } else {
        window.open(GOOGLE_FORM_URL, '_blank');
    }
}

// ==========================================
// CONTACT ACTIONS
// ==========================================
function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'COPIED';
        btn.classList.add('glow-btn');
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('glow-btn');
        }, 2000);
    });
}

function openGmail() {
    const email = 'thecryptomarket0@gmail.com';
    const subject = encodeURIComponent('Website Project Inquiry — Crypto Raviya');
    const body = encodeURIComponent(`Hello Crypto Raviya,

I would like to discuss a website project.

I found your website packages at:
https://package.cryptoraviya.com/

Thank you.`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
}

function openWhatsApp() {
    const phone = '94740693312';
    const body = encodeURIComponent(`Hello Crypto Raviya,

I would like to discuss a website project.

I found your website packages at:
https://package.cryptoraviya.com/

Thank you.`);
    window.open(`https://wa.me/${phone}?text=${body}`, '_blank');
}
