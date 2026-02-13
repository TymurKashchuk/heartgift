document.addEventListener('DOMContentLoaded', function() {
    const heart = document.getElementById('heart');
    const sparkles = document.querySelectorAll('.sparkle');
    const title = document.querySelector('h1');
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartbeat {
            0%, 100% { transform: rotate(-45deg) scale(1); }
            25% { transform: rotate(-45deg) scale(1.12); }
            40% { transform: rotate(-45deg) scale(0.98); }
            60% { transform: rotate(-45deg) scale(1.08); }
            75% { transform: rotate(-45deg) scale(0.99); }
        }
        
        @keyframes fastHeartbeat {
            0%, 100% { transform: rotate(-45deg) scale(1); }
            20% { transform: rotate(-45deg) scale(1.2); }
            40% { transform: rotate(-45deg) scale(1.05); }
            60% { transform: rotate(-45deg) scale(1.15); }
            80% { transform: rotate(-45deg) scale(1.08); }
        }
        
        @keyframes sparkleAnim {
            0% { transform: scale(0) translateY(0); opacity: 1; }
            100% { transform: scale(1) translateY(-50px); opacity: 0; }
        }

        .heartbeat { 
            animation: heartbeat 2.2s infinite ease-in-out; 
        }
        .fast-heartbeat { 
            animation: fastHeartbeat 1.2s infinite ease-in-out; 
        }
        
        .sparkle-anim { 
            animation: sparkleAnim 1.5s ease-out forwards; 
        }

        .heart.pink::before,
        .heart.pink::after {
            background-color: #ff69b4 !important;
        }
    `;

    document.head.appendChild(style);

    heart.classList.add('heartbeat');

    heart.addEventListener('mouseenter', function() {
        heart.style.transition = 'all 0.6s ease';
        heart.style.backgroundColor = '#ff69b4';
        heart.classList.add('pink');
        heart.style.boxShadow = '0 0 50px rgba(255, 105, 180, 1)';
        heart.classList.remove('heartbeat');
        heart.classList.add('fast-heartbeat');
        heart.style.transform = 'rotate(-45deg) scale(1.1)';

        // Повільні іскорки
        sparkles.forEach((sparkle, index) => {
            setTimeout(() => {
                sparkle.style.opacity = '1';
                sparkle.classList.add('sparkle-anim');
            }, index * 200);
        });

        // Текст
        title.style.transition = 'all 1s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    });

    heart.addEventListener('mouseleave', function() {
        heart.style.transition = 'all 0.8s ease';
        heart.style.backgroundColor = '#ff3366';
        heart.classList.remove('pink');
        heart.style.boxShadow = '0 0 30px rgba(255, 0, 80, 0.7)';
        heart.classList.remove('fast-heartbeat');
        heart.classList.add('heartbeat');
        heart.style.transform = 'rotate(-45deg)';
        sparkles.forEach(sparkle => {
            sparkle.style.opacity = '0';
            sparkle.classList.remove('sparkle-anim');
        });
        title.style.transition = 'all 1s ease';
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
    });

    // Мобільна підтримка
    heart.addEventListener('touchstart', function(e) {
        e.preventDefault();
        heart.style.transition = 'all 0.6s ease';
        heart.style.backgroundColor = '#ff69b4';
        heart.classList.add('pink');
    }, { passive: false });

    heart.addEventListener('touchend', function(e) {
        e.preventDefault();
        heart.style.transition = 'all 0.8s ease';
        heart.style.backgroundColor = '#ff3366';
        heart.classList.remove('pink');
    }, { passive: false });

});
