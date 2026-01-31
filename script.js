document.addEventListener('DOMContentLoaded', function() {
    console.log('🦈 SharkParty cargado - Diseño futurista 2000s');
    
    // ===== MENÚ MÓVIL =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // ===== CALENDARIO DE DISPONIBILIDAD =====
    function generateCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;
        
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        // Nombres de días de la semana
        const weekdays = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
        
        // Crear encabezados de días
        weekdays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day weekday';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });
        
        // Obtener primer día del mes
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        
        // Espacios vacíos para alinear
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Obtener días del mes
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Generar días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Marcar día actual
            if (day === today.getDate() && currentMonth === today.getMonth()) {
                dayElement.classList.add('current-day');
                dayElement.innerHTML = `${day}<br><small>HOY</small>`;
            } else {
                dayElement.textContent = day;
            }
            
            // Determinar disponibilidad (simulación)
            const date = new Date(currentYear, currentMonth, day);
            const isPast = date < today;
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            
            if (isPast) {
                dayElement.classList.add('booked');
            } else {
                // 70% de probabilidad de disponible, 30% reservado
                const isAvailable = Math.random() > 0.3;
                
                if (isAvailable) {
                    dayElement.classList.add('available');
                    if (isWeekend) {
                        dayElement.innerHTML += '<br><small>DISP</small>';
                    }
                    
                    // Al hacer clic en día disponible
                    dayElement.addEventListener('click', function() {
                        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                                          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                        alert(`📅 ${day} de ${monthNames[currentMonth]} ${currentYear} DISPONIBLE\n\nPara reservar esta fecha, completa el formulario de contacto.`);
                    });
                } else {
                    dayElement.classList.add('booked');
                    dayElement.innerHTML += '<br><small>RESERV</small>';
                }
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    generateCalendar();
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button');
            const originalText = button.innerHTML;
            
            // Mostrar estado de envío
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            button.disabled = true;
            
            // Simular envío (2 segundos)
            setTimeout(() => {
                // Mostrar mensaje de éxito
                alert('✅ ¡Consulta enviada con éxito!\n\nTe contactaremos en 24-48 horas vía WhatsApp o email.\n\nMientras tanto, puedes llamarnos al +34 612 345 678');
                
                // Restaurar botón
                button.innerHTML = originalText;
                button.disabled = false;
                
                // Limpiar formulario
                contactForm.reset();
            }, 2000);
        });
    }
    
    // ===== SCROLL SUAVE =====
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
    
    // ===== EFECTOS DE ANIMACIÓN AL SCROLL =====
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
    
    // Observar elementos para animación
    document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // ===== CONTADOR DE EVENTOS (simulado) =====
    function animateCounter() {
        const counterElement = document.querySelector('.events-counter');
        if (!counterElement) return;
        
        let count = 0;
        const target = 47; // Eventos realizados
        
        const interval = setInterval(() => {
            if (count < target) {
                count++;
                counterElement.textContent = count + '+';
            } else {
                clearInterval(interval);
            }
        }, 30);
    }
    
    // Iniciar efectos cuando la página cargue
    setTimeout(animateCounter, 1000);
    
    // ===== EFECTO DE BURBUJAS EN FONDO =====
    function createBubbles() {
        const waterBg = document.querySelector('.water-bg');
        if (!waterBg) return;
        
        for (let i = 0; i < 15; i++) {
            const bubble = document.createElement('div');
            bubble.style.position = 'absolute';
            bubble.style.width = Math.random() * 20 + 5 + 'px';
            bubble.style.height = bubble.style.width;
            bubble.style.background = 'radial-gradient(circle, rgba(0,243,255,0.3) 0%, rgba(0,243,255,0.1) 70%, transparent 100%)';
            bubble.style.borderRadius = '50%';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.top = '100%';
            bubble.style.zIndex = '-1';
            
            // Animación
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            bubble.style.animation = `bubble-rise ${duration}s linear ${delay}s infinite`;
            
            waterBg.appendChild(bubble);
        }
        
        // Agregar keyframes para burbujas
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes bubble-rise {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 0.5;
                }
                100% {
                    transform: translateY(-100vh) scale(1.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    createBubbles();
    
    // ===== CAMBIAR COLOR DE FONDO AL SCROLL =====
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const waterBg = document.querySelector('.water-bg');
        
        if (waterBg) {
            // Cambiar opacidad basado en scroll
            const opacity = 0.7 - (scrollPosition / 3000);
            waterBg.style.opacity = Math.max(0.3, opacity);
        }
    });
    
    // ===== VALIDACIÓN DE FORMULARIO EN TIEMPO REAL =====
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#00ff9d';
                this.style.boxShadow = '0 0 10px rgba(0, 255, 157, 0.3)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#ff0066';
                this.style.boxShadow = '0 0 10px rgba(255, 0, 102, 0.3)';
            }
        });
    });
    
    // ===== EFECTO GLITCH ALEATORIO EN LOGO =====
    function randomGlitch() {
        const glitch = document.querySelector('.glitch');
        if (!glitch) return;
        
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% de probabilidad
                glitch.style.transform = 'translateX(' + (Math.random() * 4 - 2) + 'px)';
                setTimeout(() => {
                    glitch.style.transform = 'translateX(0)';
                }, 100);
            }
        }, 2000);
    }
    
    randomGlitch();
});