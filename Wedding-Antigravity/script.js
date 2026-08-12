/**
 * file: script.js
 * Deskripsi: Kumpulan interaksi Vanilla JavaScript untuk landing page Wedding Venue
 * - Sticky Navbar
 * - Mobile Menu Toggle
 * - Smooth Scrolling dengan kalkulasi tinggi header
 * - Validasi Formulir Kustom
 * - Fade-in Animasi saat scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. STICKY NAVBAR EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        // Jika posisi scroll lebih dari 50px dari atas, tambahkan class 'scrolled'
        // Class 'scrolled' diatur di CSS untuk memberikan box-shadow dan warna latar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });


    // ==========================================
    // 3. SMOOTH SCROLLING UNTUK NAVBAR LINKS
    // ==========================================
    // Mengambil semua tautan yang ada di dalam navigasi
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah lompatan default ke anchor
            
            // Tutup menu seluler (jika sedang terbuka di perangkat mobile)
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Ambil ID dari atribut href
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Kalkulasi posisi target dengan mengurangkan tinggi navbar
                // agar section tidak tertutup oleh navbar yang fixed/sticky
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Lakukan smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================
    // 4. FORM VALIDATION & HANDLING (WhatsApp Redirect)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah browser melakukan reload halaman
            
            const namaInput = document.getElementById('nama');
            const nomorWaInput = document.getElementById('nomor_wa');
            const tanggalInput = document.getElementById('tanggal');
            
            // Ambil value dan hapus whitespace berlebih
            const namaValue = namaInput.value.trim();
            const nomorWaValue = nomorWaInput.value.trim();
            const tanggalValue = tanggalInput.value.trim();
            
            // Validasi sederhana: jika ada field kosong
            if (!namaValue || !nomorWaValue || !tanggalValue) {
                alert('Peringatan: Semua kolom harus diisi!');
                return; // Hentikan eksekusi selanjutnya
            }
            
            // Susun pesan sesuai permintaan
            const pesan = `Halo, saya ${namaValue}. Saya ingin menanyakan paket pernikahan untuk tanggal ${tanggalValue}. Nomor WA saya: ${nomorWaValue}.`;
            
            // Encode pesan agar valid untuk URL
            const encodedPesan = encodeURIComponent(pesan);
            
            // Buka tab baru mengarah ke WhatsApp
            const waUrl = `https://wa.me/6285155177972?text=${encodedPesan}`;
            window.open(waUrl, '_blank');
        });
    }

    // ==========================================
    // 5. FADE-IN ANIMATION (Intersection Observer)
    // ==========================================
    // Memunculkan elemen dengan perlahan saat masuk ke area viewport (scroll)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Animasi mulai saat 15% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Berhenti melakukan observe jika elemen sudah muncul
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Terapkan observer ke semua elemen yang memiliki class 'fade-in'
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

});
