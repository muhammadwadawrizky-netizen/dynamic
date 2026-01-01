/**
 * Sistem Pengalihan Kontak untuk DYNMC
 * File ini menambahkan fungsionalitas pengalihan ke WhatsApp, Instagram, dan Email
 * tanpa mengubah kode HTML, CSS, atau JavaScript yang sudah ada
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistem Pengalihan Kontak DYNMC diaktifkan');
    
    // Data kontak perusahaan
    const contactData = {
        instagram: 'ry_tracing',
        whatsapp: '08882136110',
        email: 'dynamictechcollaborator@gmail.com',
        whatsappInternational: '628882136110' // Format internasional tanpa 0
    };
    
    // 1. Sistem untuk bagian "Hubungi Kami" (Contact Section)
    const setupContactSection = () => {
        const contactInfo = document.querySelector('.contact-info');
        if (!contactInfo) return;
        
        // Simpan konten asli untuk backup
        const originalContactHTML = contactInfo.innerHTML;
        
        // Ganti konten dengan data yang baru
        contactInfo.innerHTML = `
            <div class="info-card clickable-contact" data-type="instagram">
                <div class="info-icon">
                    <i class="fab fa-instagram"></i>
                </div>
                <div class="info-text">
                    <h4>Instagram</h4>
                    <p>@${contactData.instagram}</p>
                    <small class="contact-hint">Klik untuk langsung ke Instagram</small>
                </div>
                <div class="contact-glow"></div>
            </div>
            
            <div class="info-card clickable-contact" data-type="whatsapp">
                <div class="info-icon">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <div class="info-text">
                    <h4>WhatsApp Business</h4>
                    <p>${contactData.whatsapp}</p>
                    <small class="contact-hint">Klik untuk chat di WhatsApp</small>
                </div>
                <div class="contact-glow"></div>
            </div>
            
            <div class="info-card clickable-contact" data-type="email">
                <div class="info-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="info-text">
                    <h4>Email</h4>
                    <p>${contactData.email}</p>
                    <small class="contact-hint">Klik untuk mengirim email</small>
                </div>
                <div class="contact-glow"></div>
            </div>
        `;
        
        // Tambahkan event listener untuk kartu kontak
        document.querySelectorAll('.clickable-contact').forEach(card => {
            card.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                redirectToContact(type);
            });
            
            // Efek hover tambahan
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(15px) scale(1.05)';
                this.style.boxShadow = '0 10px 30px rgba(138, 43, 226, 0.4)';
                
                const glow = this.querySelector('.contact-glow');
                if (glow) {
                    glow.style.opacity = '1';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(10px) scale(1)';
                this.style.boxShadow = '0 5px 20px rgba(138, 43, 226, 0.2)';
                
                const glow = this.querySelector('.contact-glow');
                if (glow) {
                    glow.style.opacity = '0';
                }
            });
        });
        
        // Tambahkan style untuk elemen baru
        addContactStyles();
        
        // Simpan referensi ke konten asli jika perlu dikembalikan
        window.originalContactContent = originalContactHTML;
    };
    
    // 2. Sistem untuk footer (social links)
    const setupFooterLinks = () => {
        const socialLinks = document.querySelector('.social-links');
        if (!socialLinks) return;
        
        // Update link sosial media
        const links = socialLinks.querySelectorAll('a');
        
        if (links.length >= 2) {
            // Instagram
            links[0].href = `https://www.instagram.com/${contactData.instagram}`;
            links[0].setAttribute('target', '_blank');
            links[0].setAttribute('title', 'Ikuti kami di Instagram');
            
            // WhatsApp
            links[1].href = `https://wa.me/${contactData.whatsappInternational}`;
            links[1].setAttribute('target', '_blank');
            links[1].setAttribute('title', 'Hubungi kami via WhatsApp');
            
            // Tambahkan tooltip
            links.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    const title = this.getAttribute('title');
                    if (title) {
                        showTooltip(this, title);
                    }
                });
                
                link.addEventListener('mouseleave', function() {
                    hideTooltip();
                });
            });
        }
    };
    
    // 3. Sistem untuk form kontak
    const setupContactForm = () => {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        // Tambahkan pesan bahwa form akan dikirim via WhatsApp/Email
        const formNote = document.createElement('div');
        formNote.className = 'form-note';
        formNote.innerHTML = `
            <p><i class="fas fa-info-circle"></i> Pesan Anda akan dikirim ke WhatsApp dan Email kami secara langsung.</p>
        `;
        
        // Sisipkan sebelum tombol submit
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            contactForm.insertBefore(formNote, submitBtn);
        }
        
        // Modifikasi form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil data form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Validasi
            if (!name || !email || !service || !message) {
                showNotification('Harap lengkapi semua field!', 'error');
                return;
            }
            
            // Buat pesan untuk WhatsApp
            const whatsappMessage = `Halo DYNMC, saya ${name}%0A` +
                                   `Email: ${email}%0A` +
                                   `Layanan yang diminati: ${service}%0A` +
                                   `Pesan: ${message}`;
            
            // Buat pesan untuk Email
            const emailSubject = `Pesan dari ${name} - Layanan ${service}`;
            const emailBody = `Nama: ${name}%0D%0A` +
                             `Email: ${email}%0D%0A` +
                             `Layanan: ${service}%0D%0A` +
                             `Pesan:%0D%0A${message}`;
            
            // Tampilkan pilihan pengiriman
            showContactOptions(name, email, service, message, whatsappMessage, emailSubject, emailBody);
        });
    };
    
    // 4. Fungsi untuk menampilkan pilihan kontak
    const showContactOptions = (name, email, service, message, whatsappMessage, emailSubject, emailBody) => {
        // Buat modal untuk pilihan kontak
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Pilih Cara Menghubungi</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Pesan Anda telah siap dikirim. Pilih salah satu cara di bawah:</p>
                    
                    <div class="contact-options">
                        <div class="contact-option" data-action="whatsapp">
                            <div class="option-icon">
                                <i class="fab fa-whatsapp"></i>
                            </div>
                            <div class="option-text">
                                <h4>Via WhatsApp</h4>
                                <p>Kirim pesan langsung ke WhatsApp Business kami</p>
                            </div>
                        </div>
                        
                        <div class="contact-option" data-action="email">
                            <div class="option-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="option-text">
                                <h4>Via Email</h4>
                                <p>Kirim email ke alamat kami</p>
                            </div>
                        </div>
                        
                        <div class="contact-option" data-action="both">
                            <div class="option-icon">
                                <i class="fas fa-paper-plane"></i>
                            </div>
                            <div class="option-text">
                                <h4>Keduanya</h4>
                                <p>Kirim pesan ke WhatsApp dan Email</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-review">
                        <h4>Pratinjau Pesan:</h4>
                        <p><strong>Nama:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Layanan:</strong> ${service}</p>
                        <p><strong>Pesan:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event untuk tutup modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Event untuk pilihan kontak
        modal.querySelectorAll('.contact-option').forEach(option => {
            option.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                
                if (action === 'whatsapp') {
                    window.open(`https://wa.me/${contactData.whatsappInternational}?text=${whatsappMessage}`, '_blank');
                    showNotification('Membuka WhatsApp...', 'success');
                } 
                else if (action === 'email') {
                    window.location.href = `mailto:${contactData.email}?subject=${emailSubject}&body=${emailBody}`;
                    showNotification('Membuka aplikasi email...', 'success');
                }
                else if (action === 'both') {
                    window.open(`https://wa.me/${contactData.whatsappInternational}?text=${whatsappMessage}`, '_blank');
                    setTimeout(() => {
                        window.location.href = `mailto:${contactData.email}?subject=${emailSubject}&body=${emailBody}`;
                    }, 500);
                    showNotification('Membuka WhatsApp dan Email...', 'success');
                }
                
                // Reset form
                document.getElementById('contactForm').reset();
                
                // Tutup modal setelah 1.5 detik
                setTimeout(() => {
                    modal.remove();
                }, 1500);
            });
        });
        
        // Tutup modal saat klik di luar
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Tambahkan style untuk modal
        addModalStyles();
    };
    
    // 5. Fungsi untuk redirect ke kontak
    const redirectToContact = (type) => {
        switch(type) {
            case 'instagram':
                window.open(`https://www.instagram.com/${contactData.instagram}`, '_blank');
                showNotification(`Membuka Instagram @${contactData.instagram}`, 'info');
                break;
                
            case 'whatsapp':
                window.open(`https://wa.me/${contactData.whatsappInternational}`, '_blank');
                showNotification('Membuka WhatsApp Business', 'info');
                break;
                
            case 'email':
                window.location.href = `mailto:${contactData.email}`;
                showNotification('Membuka aplikasi email', 'info');
                break;
        }
    };
    
    // 6. Fungsi untuk menampilkan notifikasi
    const showNotification = (message, type = 'info') => {
        // Hapus notifikasi sebelumnya
        const existingNotif = document.querySelector('.contact-notification');
        if (existingNotif) {
            existingNotif.remove();
        }
        
        // Buat notifikasi baru
        const notification = document.createElement('div');
        notification.className = `contact-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Tampilkan notifikasi
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Sembunyikan setelah 3 detik
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };
    
    // 7. Fungsi untuk menampilkan tooltip
    const showTooltip = (element, text) => {
        // Hapus tooltip sebelumnya
        hideTooltip();
        
        // Buat tooltip baru
        const tooltip = document.createElement('div');
        tooltip.className = 'contact-tooltip';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        // Posisikan tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.transform = 'translateX(-50%)';
        
        // Tampilkan tooltip
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);
        
        // Simpan referensi tooltip
        window.currentTooltip = tooltip;
    };
    
    const hideTooltip = () => {
        if (window.currentTooltip) {
            window.currentTooltip.remove();
            window.currentTooltip = null;
        }
    };
    
    // 8. Tambahkan style untuk elemen baru
    const addContactStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            /* Style untuk kartu kontak yang dapat diklik */
            .clickable-contact {
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                position: relative;
                overflow: hidden;
            }
            
            .clickable-contact::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, transparent, rgba(138, 43, 226, 0.1), transparent);
                transform: translateX(-100%);
                transition: transform 0.6s;
            }
            
            .clickable-contact:hover::after {
                transform: translateX(100%);
            }
            
            .contact-hint {
                display: block;
                margin-top: 5px;
                font-size: 0.8rem;
                color: var(--secondary-color);
                opacity: 0.8;
            }
            
            .contact-glow {
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(0, 255, 127, 0.2) 0%, transparent 70%);
                opacity: 0;
                transition: opacity 0.5s ease;
                pointer-events: none;
                z-index: -1;
            }
            
            /* Style untuk form note */
            .form-note {
                background: rgba(138, 43, 226, 0.1);
                border-left: 4px solid var(--secondary-color);
                padding: 12px 15px;
                margin-bottom: 20px;
                border-radius: 0 8px 8px 0;
                font-size: 0.9rem;
            }
            
            .form-note i {
                color: var(--secondary-color);
                margin-right: 8px;
            }
        `;
        document.head.appendChild(style);
    };
    
    // 9. Tambahkan style untuk modal
    const addModalStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            /* Style untuk modal kontak */
            .contact-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 15, 26, 0.9);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal-content {
                background: rgba(30, 30, 46, 0.95);
                border-radius: 15px;
                width: 90%;
                max-width: 600px;
                border: 1px solid rgba(138, 43, 226, 0.3);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                overflow: hidden;
                animation: slideUp 0.4s ease;
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .modal-header {
                padding: 20px 30px;
                border-bottom: 1px solid rgba(138, 43, 226, 0.2);
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(15, 15, 26, 0.8);
            }
            
            .modal-header h3 {
                color: var(--white-color);
                font-size: 1.5rem;
                background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--white-color);
                font-size: 2rem;
                cursor: pointer;
                line-height: 1;
                transition: color 0.3s;
            }
            
            .modal-close:hover {
                color: var(--secondary-color);
            }
            
            .modal-body {
                padding: 30px;
            }
            
            .modal-body > p {
                color: #cccccc;
                margin-bottom: 25px;
            }
            
            .contact-options {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .contact-option {
                background: rgba(15, 15, 26, 0.7);
                border: 1px solid rgba(138, 43, 226, 0.3);
                border-radius: 10px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
            }
            
            .contact-option:hover {
                transform: translateY(-5px);
                border-color: var(--secondary-color);
                box-shadow: 0 10px 25px rgba(0, 255, 127, 0.2);
                background: rgba(0, 255, 127, 0.05);
            }
            
            .option-icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 15px;
                font-size: 1.5rem;
                color: var(--white-color);
            }
            
            .option-text h4 {
                color: var(--white-color);
                margin-bottom: 8px;
                font-size: 1.1rem;
            }
            
            .option-text p {
                color: #aaaaaa;
                font-size: 0.9rem;
            }
            
            .form-review {
                background: rgba(15, 15, 26, 0.7);
                border-radius: 10px;
                padding: 20px;
                border-left: 4px solid var(--primary-color);
            }
            
            .form-review h4 {
                color: var(--white-color);
                margin-bottom: 15px;
                font-size: 1.1rem;
            }
            
            .form-review p {
                color: #cccccc;
                margin-bottom: 8px;
                font-size: 0.95rem;
            }
            
            /* Style untuk notifikasi */
            .contact-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: rgba(30, 30, 46, 0.95);
                border-radius: 10px;
                padding: 15px 20px;
                border-left: 4px solid var(--primary-color);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                transform: translateX(150%);
                transition: transform 0.4s ease;
                z-index: 10001;
                max-width: 350px;
                backdrop-filter: blur(10px);
            }
            
            .contact-notification.show {
                transform: translateX(0);
            }
            
            .contact-notification.success {
                border-left-color: var(--secondary-color);
            }
            
            .contact-notification.error {
                border-left-color: #ff4757;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification-content i {
                font-size: 1.2rem;
            }
            
            .notification-content i.fa-check-circle {
                color: var(--secondary-color);
            }
            
            .notification-content i.fa-exclamation-circle {
                color: #ff4757;
            }
            
            .notification-content i.fa-info-circle {
                color: var(--primary-color);
            }
            
            .notification-content span {
                color: var(--white-color);
                font-size: 0.95rem;
            }
            
            /* Style untuk tooltip */
            .contact-tooltip {
                position: fixed;
                background: rgba(30, 30, 46, 0.95);
                color: var(--white-color);
                padding: 8px 15px;
                border-radius: 6px;
                font-size: 0.85rem;
                white-space: nowrap;
                z-index: 10002;
                opacity: 0;
                transform: translate(-50%, 10px);
                transition: opacity 0.3s, transform 0.3s;
                pointer-events: none;
                border: 1px solid rgba(138, 43, 226, 0.3);
                backdrop-filter: blur(10px);
            }
            
            .contact-tooltip.show {
                opacity: 1;
                transform: translate(-50%, -10px);
            }
            
            .contact-tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border-width: 6px;
                border-style: solid;
                border-color: rgba(30, 30, 46, 0.95) transparent transparent transparent;
            }
        `;
        document.head.appendChild(style);
    };
    
    // 10. Inisialisasi semua sistem
    const initContactSystem = () => {
        // Tunggu sebentar untuk memastikan DOM siap
        setTimeout(() => {
            setupContactSection();
            setupFooterLinks();
            setupContactForm();
            
            // Tampilkan notifikasi sistem aktif
            setTimeout(() => {
                showNotification('Sistem kontak DYNMC aktif! Klik kartu kontak untuk langsung terhubung.', 'info');
            }, 1000);
        }, 500);
    };
    
    // 11. Jalankan sistem kontak
    initContactSystem();
    
    // 12. Tambahkan tombol toggle untuk beralih antara sistem lama dan baru (opsional)
    const addToggleButton = () => {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'contact-toggle-btn';
        toggleBtn.innerHTML = '<i class="fas fa-exchange-alt"></i>';
        toggleBtn.title = 'Toggle Sistem Kontak';
        
        document.body.appendChild(toggleBtn);
        
        let useNewSystem = true;
        
        toggleBtn.addEventListener('click', () => {
            const contactInfo = document.querySelector('.contact-info');
            
            if (useNewSystem) {
                // Kembali ke sistem lama
                if (window.originalContactContent) {
                    contactInfo.innerHTML = window.originalContactContent;
                }
                toggleBtn.innerHTML = '<i class="fas fa-bolt"></i>';
                toggleBtn.title = 'Aktifkan Sistem Kontak Baru';
                showNotification('Sistem kontak lama diaktifkan', 'info');
            } else {
                // Kembali ke sistem baru
                setupContactSection();
                toggleBtn.innerHTML = '<i class="fas fa-exchange-alt"></i>';
                toggleBtn.title = 'Aktifkan Sistem Kontak Lama';
                showNotification('Sistem kontak baru diaktifkan', 'success');
            }
            
            useNewSystem = !useNewSystem;
        });
        
        // Style untuk toggle button
        const toggleStyle = document.createElement('style');
        toggleStyle.textContent = `
            .contact-toggle-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                z-index: 9999;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .contact-toggle-btn:hover {
                transform: scale(1.1) rotate(90deg);
                box-shadow: 0 10px 30px rgba(138, 43, 226, 0.5);
            }
        `;
        document.head.appendChild(toggleStyle);
    };
    
    // 13. Aktifkan toggle button (opsional, bisa dikomentari)
    // addToggleButton();
});