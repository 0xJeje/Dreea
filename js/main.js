// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  const swiperWrapper = document.getElementById('dynamic-swiper-wrapper');
  const staticButtons = document.getElementById('static-buttons');
  const audioPlayer = document.getElementById('slide-audio');
  const logoImg = document.querySelector('.logo img');

  // 1. Build Slides Dynamically based on data.js
  slideData.forEach(slide => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'swiper-slide';
    slideDiv.dataset.mainColor = slide.mainColor;
    slideDiv.dataset.secondaryColor = slide.secondaryColor;
    slideDiv.dataset.invertLogo = slide.invertLogo;
    
    let mediaContent = '';
    
if (slide.type === 'video') {
        const baseUrl = `https://res.cloudinary.com/${cloudName}/video/upload`;
        
        // Added w_720 and q_auto:eco to drastically reduce the poster size
        const posterUrl = `${baseUrl}/so_0,w_720,q_auto:eco/${slide.cloudinaryId}.jpg`; 
        
        // Added w_720 and q_auto:eco to the video files
        const webmUrl = `${baseUrl}/w_720,q_auto:eco/${slide.cloudinaryId}.webm`;
        const mp4Url  = `${baseUrl}/w_720,q_auto:eco/${slide.cloudinaryId}.mp4`;

        mediaContent = `
            <video class="bg-video" preload="none" muted loop playsinline poster="${posterUrl}">
                <source data-src="${webmUrl}" type="video/webm">
                <source data-src="${mp4Url}" type="video/mp4">
            </video>
        `;
    } 
    // And if you want to optimize your image slides too:
    else if (slide.type === 'image') {
        const bgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_720,q_auto/${slide.cloudinaryId}.jpg`;
        mediaContent = `<div class="slide-content" style="background-image: url('${bgUrl}'); width:100%; height:100%; background-size:cover; background-position:center;"></div>`;
    }

    slideDiv.innerHTML = `<div class="slide-content">${mediaContent}</div>`;
    swiperWrapper.appendChild(slideDiv);
  });

  // 2. Initialize Swiper
  const swiper = new Swiper('.swiper', {
    loop: true,
    direction: 'vertical',
    parallax: true,
    speed: 750,
    simulateTouch: true,
    threshold: 10,
    keyboard: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    on: {
      init: function () {
        updateAppUI(this.realIndex);
      },
      slideChange: function () {
        updateAppUI(this.realIndex);
        handleVideoPlayback(this);
      }
    }
  });

  // 3. UI Update Logic
  function updateAppUI(index) {
    const data = slideData[index];
    
    // Update Theme Colors
    document.documentElement.style.setProperty('--main-color', data.mainColor);
    document.documentElement.style.setProperty('--secondary-color', data.secondaryColor);

    // Update Logo
    if (logoImg) {
      logoImg.classList.remove('animate');
      void logoImg.offsetWidth; // Trigger reflow to restart CSS animation
      logoImg.classList.add('animate');
      data.invertLogo ? logoImg.classList.add('invert-logo') : logoImg.classList.remove('invert-logo');
    }

    // Update Action Buttons & Audio
    if (data.links && data.links.youtube) {
      staticButtons.innerHTML = `
        <a target="_blank" href="${data.links.youtube}" class="CTA-button">
            <img src="assets/icons/youtube.svg" height="50%" alt="Youtube" aria-hidden="true">Vezi videoclip
        </a>
        <a target="_blank" href="${data.links.listen}" class="CTA-button">Ascultă acum</a>
        <button type="button" class="CTA-button play-button" id="play-audio-btn" aria-label="Play Track">
          <span id="play-icon">
            <svg height="100%" viewBox="0 0 28 28" fill="none"><polygon points="11,9 20,14 11,19" fill="currentColor"/></svg>
          </span>
          <span id="pause-icon" style="display:none;">
            <svg height="100%" viewBox="0 0 28 28" fill="none">
              <rect x="11" y="9" width="2.5" height="10" fill="currentColor"/>
              <rect x="15" y="9" width="2.5" height="10" fill="currentColor"/>
            </svg>
          </span>
        </button>
      `;

      setupAudioControl(data.links.audioUrl);
    } else {
      staticButtons.innerHTML = '';
    }
  }

  function setupAudioControl(audioSrc) {
    const playBtn = document.getElementById('play-audio-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

    audioPlayer.src = audioSrc;
    audioPlayer.pause();

    playBtn.onclick = () => {
      swiper.autoplay.stop();
      if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = '';
      } else {
        audioPlayer.pause();
        playIcon.style.display = '';
        pauseIcon.style.display = 'none';
      }
    };

    audioPlayer.onended = () => {
      playIcon.style.display = '';
      pauseIcon.style.display = 'none';
    };
  }

  // 4. Lazy Load & Video Handling
  function handleVideoPlayback(swiperInstance) {
    const slides = swiperInstance.slides;
    const activeSlide = slides[swiperInstance.activeIndex];
    
    // Pause all videos
    document.querySelectorAll('.bg-video').forEach(v => v.pause());

    // Play active video and load sources if needed
    const activeVideo = activeSlide.querySelector('.bg-video');
    if (activeVideo) {
      loadSources(activeVideo);
      activeVideo.play().catch(() => {}); // Catch autoplay restrictions
    }

    // Preload next slide
    const nextIndex = (swiperInstance.activeIndex + 1) % slides.length;
    const nextVideo = slides[nextIndex].querySelector('.bg-video');
    if (nextVideo) loadSources(nextVideo);
  }

  function loadSources(videoEl) {
    const sources = videoEl.querySelectorAll('source[data-src]');
    let loaded = false;
    sources.forEach(source => {
      if (!source.src) {
        source.src = source.dataset.src;
        loaded = true;
      }
    });
    if (loaded) videoEl.load();
  }

  // 5. Responsive height fix (Debounced)
  let resizeTimer;
  const setHeight = () => document.body.style.height = window.innerHeight + "px";
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setHeight, 150);
  });
  setHeight();
});