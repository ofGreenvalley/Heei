        let chatOpen = false;
        let squadOpen = false;
        let menuOpen = false;
        let searchingMatch = false;
        let heroesOpen = false;

        // Pantalla de inicio: revela la imagen al pasar sobre Doom o START y abre el lobby al pulsar START.
        (function initIntroScreen() {
            const intro = document.getElementById('intro-screen');
            const introDoom = document.getElementById('intro-doom');
            const introStart = document.getElementById('intro-start');
            if (!intro || !introDoom || !introStart) return;

            const reveal = () => introDoom.classList.add('is-hovered');
            const hideReveal = () => introDoom.classList.remove('is-hovered');
            introDoom.addEventListener('mouseenter', reveal);
            introDoom.addEventListener('mouseleave', hideReveal);
            introStart.addEventListener('mouseenter', reveal);
            introStart.addEventListener('mouseleave', hideReveal);
            introStart.addEventListener('focus', reveal);
            introStart.addEventListener('blur', hideReveal);

            introStart.addEventListener('click', () => {
                intro.classList.add('is-hidden');
                // El clic en START cuenta como interacción del usuario,
                // permitiendo iniciar automáticamente la música al entrar al lobby.
                const lobbyAudio = document.getElementById('doom-audio');
                if (lobbyAudio) {
                    lobbyAudio.muted = false;
                    lobbyAudio.play().catch(() => {});
                }
            });
        })();


        // Volver a la pantalla de inicio sin recargar ni alterar el lobby.
        function returnToIntro(event) {
            if (event) event.preventDefault();
            const intro = document.getElementById('intro-screen');
            const introDoom = document.getElementById('intro-doom');
            if (!intro) return false;
            if (introDoom) introDoom.classList.remove('is-hovered');
            intro.classList.remove('is-hidden');
            return false;
        }


        // Particle System
        function createParticles() {
            const container = document.getElementById('particle-container');
            for (let i = 0; i < 68; i++) {
                const particle = document.createElement('div');
                const variants = ['particle-bright', 'particle-soft', ''];
                particle.className = `emerald-particle ${variants[Math.floor(Math.random() * variants.length)]}`;
                const size = Math.random() * 4.0 + 2.6;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.setProperty('--drift', `${(Math.random() - 0.5) * 70}px`);
                particle.style.animation = `floatParticle ${Math.random() * 5 + 7}s linear infinite`;
                particle.style.animationDelay = `${Math.random() * 18}s`;
                container.appendChild(particle);
            }
        }


        // Toggle Heroes Holographic Gallery
        function toggleHeroesPanel() {
            heroesOpen = !heroesOpen;
            const panel = document.getElementById('heroes-panel');
            if (heroesOpen) {
                panel.classList.add('heroes-open');
            } else {
                panel.classList.remove('heroes-open');
            }
        }

        // Toggle Chat Drawer
        function toggleChat() {
            chatOpen = !chatOpen;
            const chatPanel = document.getElementById('chat-panel');
            if (chatOpen) {
                chatPanel.classList.remove('-translate-x-[420px]');
                chatPanel.classList.add('translate-x-0');
            } else {
                chatPanel.classList.add('-translate-x-[420px]');
                chatPanel.classList.remove('translate-x-0');
            }
        }

        // Toggle Squad Panel
        function toggleSquadPanel() {
            squadOpen = !squadOpen;
            const squadPanel = document.getElementById('squad-panel');
            if (squadOpen) {
                squadPanel.classList.remove('translate-x-full');
            } else {
                squadPanel.classList.add('translate-x-full');
            }
        }

        // Toggle General Menu
        function toggleGeneralMenu() {
            menuOpen = !menuOpen;
            const menu = document.getElementById('general-menu');
            if (menuOpen) {
                menu.classList.remove('hidden');
                setTimeout(() => menu.classList.remove('opacity-0'), 10);
            } else {
                menu.classList.add('opacity-0');
                setTimeout(() => menu.classList.add('hidden'), 300);
            }
        }

        // Send Chat Message
        function sendChatMessage(e) {
            e.preventDefault();
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            
            if (message) {
                const container = document.getElementById('chat-messages');
                const msgDiv = document.createElement('div');
                msgDiv.className = 'bg-emerald-950/60 border border-emerald-500/40 p-2.5 rounded-lg';
                msgDiv.innerHTML = `<span class="font-bold text-amber-400 text-xs block mb-0.5">FEID (Tú):</span> <span class="text-zinc-100">${message}</span>`;
                container.appendChild(msgDiv);
                container.scrollTop = container.scrollHeight;
                input.value = '';
            }
        }

        // Active Navigation Tab Selector
        function setActiveTab(button) {
            document.querySelectorAll('.nav-tab').forEach(btn => {
                btn.classList.remove('bg-emerald-400', 'text-black', 'font-bold');
                btn.classList.add('text-zinc-300');
            });
            button.classList.add('bg-emerald-400', 'text-black', 'font-bold');
            button.classList.remove('text-zinc-300');
        }

        // Matchmaking State Toggle
        function startMatchmaking() {
            const playBtn = document.getElementById('play-btn');
            const playBtnText = document.getElementById('play-btn-text');
            const playBtnIcon = document.getElementById('play-btn-icon');
            searchingMatch = !searchingMatch;

            if (searchingMatch) {
                playBtn.classList.remove('from-emerald-500', 'to-emerald-600', 'glow-box');
                playBtn.classList.add('from-amber-500', 'to-amber-600', 'glow-box-amber');
                playBtnText.textContent = "BUSCANDO MUNDOS... (00:04)";
                playBtnText.classList.add('animate-pulse');
                playBtnIcon.className = "fa-solid fa-spinner fa-spin ml-3 text-2xl";
            } else {
                playBtn.classList.remove('from-amber-500', 'to-amber-600', 'glow-box-amber');
                playBtn.classList.add('from-emerald-500', 'to-emerald-600', 'glow-box');
                playBtnText.textContent = "לחפש";
                playBtnText.classList.remove('animate-pulse');
                playBtnIcon.className = "fa-solid fa-play ml-3 text-2xl";
            }
        }



        function toggleDoomMusicPanel() {
            const panel = document.getElementById('doom-audio-panel');
            const button = document.getElementById('doom-music-toggle');
            const icon = document.getElementById('doom-music-toggle-icon');
            const isHidden = panel.classList.toggle('hidden');
            button.classList.toggle('active', !isHidden);
            button.setAttribute('aria-label', isHidden ? 'Abrir reproductor de música' : 'Cerrar reproductor de música');
            button.title = isHidden ? 'Abrir reproductor de música' : 'Cerrar reproductor de música';
            icon.className = isHidden ? 'fa-solid fa-music' : 'fa-solid fa-chevron-up';
        }

        // DOOM audio player
        const doomAudio = document.getElementById('doom-audio');
        const doomAudioIcon = document.getElementById('doom-audio-icon');
        const doomAudioProgress = document.getElementById('doom-audio-progress');
        const doomAudioVolumeIcon = document.getElementById('doom-audio-volume-icon');

        function toggleDoomAudio() {
            if (doomAudio.paused) {
                doomAudio.play().catch(() => {});
            } else {
                doomAudio.pause();
            }
        }

        function toggleDoomMute() {
            doomAudio.muted = !doomAudio.muted;
            doomAudioVolumeIcon.className = doomAudio.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
        }

        function seekDoomAudio(value) {
            if (doomAudio.duration) doomAudio.currentTime = (Number(value) / 100) * doomAudio.duration;
        }

        doomAudio.addEventListener('timeupdate', () => {
            if (doomAudio.duration) doomAudioProgress.value = (doomAudio.currentTime / doomAudio.duration) * 100;
        });
        doomAudio.addEventListener('play', () => {
            doomAudioIcon.className = 'fa-solid fa-pause';
        });
        doomAudio.addEventListener('pause', () => {
            doomAudioIcon.className = 'fa-solid fa-play';
        });
        doomAudio.addEventListener('ended', () => {
            doomAudio.currentTime = 0;
            doomAudioProgress.value = 0;
            doomAudioIcon.className = 'fa-solid fa-play';
        });

        window.onload = function() {
            createParticles();

            // Intentar reproducción automática; los navegadores pueden bloquear audio con sonido
            // hasta que el usuario interactúe con la página.
            doomAudio.play().catch(() => {});

            // Generación continua: nuevas luciérnagas aparecen suavemente
            // mientras otras siguen ascendiendo.
            const particleContainer = document.getElementById('particle-container');
            setInterval(() => {
                const particle = document.createElement('div');
                particle.className = 'emerald-particle';

                const size = Math.random() * 3.0 + 2.8;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.setProperty('--drift', `${(Math.random() - 0.5) * 80}px`);
                particle.style.animation = `floatParticle ${Math.random() * 5 + 7}s linear forwards`;

                particleContainer.appendChild(particle);

                setTimeout(() => particle.remove(), 32000);
            }, 1800);
        };
    

        function showBffPreview(event) {
            event.preventDefault();
            const preview = document.getElementById('bff-preview');
            preview.classList.add('show');
            preview.setAttribute('aria-hidden', 'false');
        }

        function openBffProfile(event) {
            event.stopPropagation();
            window.location.href = 'https://xat.me/Estela';
        }
    
