document.addEventListener('DOMContentLoaded', function() {
    const heart = document.getElementById('heart');
    const sparkles = document.querySelectorAll('.sparkle');
    const title = document.querySelector('h1');
    const particlesContainer = document.getElementById('particles');
    const floatingContainer = document.getElementById('floating-hearts');
    const LOVE_EMOJIS = ['💕','💞','💓','💗','💖','💝','💘','❣️','❤️','🩷','💟'];

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
            100% { transform: scale(1.5) translateY(-60px); opacity: 0; }
        }

        @keyframes explode {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            100% { transform: scale(0) translate(var(--dx), var(--dy)) rotate(720deg); opacity: 0; }
        }
        
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
        }

        .heartbeat { animation: heartbeat 2.2s infinite ease-in-out; }
        .fast-heartbeat { animation: fastHeartbeat 1.2s infinite ease-in-out; }
        .sparkle-anim { animation: sparkleAnim 1.5s ease-out forwards; }
        .heart.pink::before, .heart.pink::after { background-color: #ff69b4 !important; }
        
        #particles, #floating-hearts { 
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
            pointer-events: none; 
        }
        #floating-hearts { z-index: 1; }
        #particles { z-index: 99; }
        
        .particle-heart { 
            position: absolute; font-size: 36px; line-height: 1; 
            animation: explode 2.5s ease-out forwards; 
            text-shadow: 0 0 10px rgba(255,255,255,0.8);
        }
        .floating-heart { 
            position: absolute; font-size: 32px; 
            animation: float 10s infinite linear; 
            text-shadow: 0 0 15px rgba(255,105,180,0.6);
        }
    `;
    document.head.appendChild(style);

    heart.classList.add('heartbeat');
    let isAnimating = false;

    setInterval(() => {
        const fHeart = document.createElement('div');
        fHeart.className = 'floating-heart';
        fHeart.innerHTML = LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)];
        fHeart.style.left = Math.random() * 100 + 'vw';
        fHeart.style.animationDuration = (7 + Math.random() * 5) + 's';
        floatingContainer.appendChild(fHeart);
        setTimeout(() => fHeart.remove(), 12000);
    }, 800);

    heart.addEventListener('mouseenter', () => { if (!isAnimating) activateHeart(); });
    heart.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isAnimating) activateHeart();
    }, { passive: false });

    function activateHeart() {
        isAnimating = true;

        heart.style.transition = 'all 0.6s ease';
        heart.style.backgroundColor = '#ff69b4';
        heart.classList.add('pink');
        heart.style.boxShadow = '0 0 50px rgba(255, 105, 180, 1)';
        heart.classList.remove('heartbeat');
        heart.classList.add('fast-heartbeat');
        heart.style.transform = 'rotate(-45deg) scale(1.1)';
        document.querySelector('.gif-wrapper').classList.add('show');

        sparkles.forEach((sparkle, index) => {
            setTimeout(() => {
                sparkle.style.opacity = '1';
                sparkle.classList.add('sparkle-anim');
            }, index * 150); // швидше
        });

        title.style.transition = 'all 1s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';

        createConfettiExplosion();

        setTimeout(() => {
            resetHeart();
            isAnimating = false;
        }, 3500);
    }

    function resetHeart() {
        heart.style.transition = 'all 0.8s ease';
        heart.style.backgroundColor = '#ff3366';
        heart.classList.remove('pink');
        heart.style.boxShadow = '0 0 30px rgba(255, 0, 80, 0.7)';
        heart.classList.remove('fast-heartbeat');
        heart.classList.add('heartbeat');
        heart.style.transform = 'rotate(-45deg)';
        document.querySelector('.gif-wrapper').classList.remove('show');


        sparkles.forEach(sparkle => {
            sparkle.style.opacity = '0';
            sparkle.classList.remove('sparkle-anim');
        });

        title.style.transition = 'all 1s ease';
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
    }

    function createConfettiExplosion() {
        const rect = heart.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        for (let i = 0; i < 70; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-heart';
            particle.innerHTML = LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)];
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            const angle = (i / 70) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
            const vel = 200 + Math.random() * 150;
            particle.style.setProperty('--dx', `${Math.cos(angle) * vel}px`);
            particle.style.setProperty('--dy', `${Math.sin(angle) * vel - 200}px`); // ще вище!

            particlesContainer.appendChild(particle);
            setTimeout(() => particle.remove(), 4000);
        }
    }
});
