import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

const lightConfig = {
  color: 0xddd5ee,
  backgroundColor: 0xf5f0ff,
  points: 12,
  maxDistance: 22,
  spacing: 16,
  showDots: true,
};

const darkConfig = {
  color: 0x5b3a8a,
  backgroundColor: 0x0f0a1a,
  points: 12,
  maxDistance: 22,
  spacing: 16,
  showDots: true,
};

let vantaEffect = null;

function isDark() {
  return document.documentElement.classList.contains('dark');
}

function initVanta() {
  if (vantaEffect) {
    vantaEffect.destroy();
    vantaEffect = null;
  }

  const config = isDark() ? darkConfig : lightConfig;

  vantaEffect = NET({
    el: '#vanta-bg',
    THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: config.color,
    backgroundColor: config.backgroundColor,
    points: config.points,
    maxDistance: config.maxDistance,
    spacing: config.spacing,
    showDots: config.showDots,
  });
}

initVanta();

// Re-initialize on theme change
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      initVanta();
    }
  });
});

observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
