// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor dengan efek glow
    const cursor = document.querySelector('.custom-cursor');
    const cursorSize = 20;
    
    // Gerakkan cursor custom
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Efek glow yang mengikuti gerakan mouse
        createCursorGlow(e.clientX, e.clientY);
    });
    
    // Fungsi untuk membuat efek glow di belakang cursor
    function createCursorGlow(x, y) {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
        document.body.appendChild(glow);
        
        // Hapus glow setelah animasi selesai
        setTimeout(() => {
            glow.remove();
        }, 500);
    }
    
    // Efek hover pada elemen interaktif
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .testimonial-card, .info-card, .nav-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Animasi mengetik
    const typewriterElement = document.querySelector('.typewriter');
    const texts = [
        'data entry yang akurat',
        'analisis data dasar',
        'visualisasi data yang menarik',
        'pembersihan dan validasi data'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Menghapus teks
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Mengetik teks
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Jika teks sudah selesai diketik
        if (!isDeleting && charIndex === currentText.length) {
            // Tunggu sebentar sebelum mulai menghapus
            isDeleting = true;
            typingSpeed = 1500;
        } 
        // Jika teks sudah selesai dihapus
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Mulai animasi mengetik
    setTimeout(typeWriter, 1000);
    
    // Animasi pada judul dan teks
    const animateTextElements = () => {
        const textElements = document.querySelectorAll('.section-title, .service-title, .feature-text h4, .author-info h4');
        
        textElements.forEach(el => {
            // Tambahkan efek warna berubah-ubah
            setInterval(() => {
                const hue = Math.floor(Math.random() * 360);
                el.style.filter = `hue-rotate(${hue}deg)`;
            }, 3000);
        });
    };
    
    animateTextElements();
    
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Tutup menu mobile saat klik link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil nilai form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Validasi sederhana
        if (!name || !email || !service || !message) {
            alert('Harap lengkapi semua field!');
            return;
        }
        
        // Simulasi pengiriman form (dalam implementasi nyata, ini akan dikirim ke server)
        console.log('Form Data:', { name, email, service, message });
        
        // Tampilkan pesan sukses
        alert('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Efek parallax pada shape
    window.addEventListener('scroll', () => {
        const shapes = document.querySelectorAll('.shape');
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
    });
    
    // Efek glow pada kolom saat hover
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.5)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    });
    
    // Inisialisasi animasi pada elemen saat scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Amati elemen yang ingin dianimasikan
    const elementsToAnimate = document.querySelectorAll('.service-card, .testimonial-card, .info-card, .feature');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Tambahkan style untuk glow effect sementara
    const style = document.createElement('style');
    style.textContent = `
        .cursor-glow {
            position: fixed;
            width: 0;
            height: 0;
            border-radius: 50%;
            box-shadow: 0 0 60px 30px var(--secondary-color);
            pointer-events: none;
            z-index: 9998;
            animation: glowFade 0.5s forwards;
            transform: translate(-50%, -50%);
        }
        
        @keyframes glowFade {
            0% { opacity: 0.7; width: 0; height: 0; }
            50% { opacity: 0.4; width: 100px; height: 100px; }
            100% { opacity: 0; width: 200px; height: 200px; }
        }
        
        .animated {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});