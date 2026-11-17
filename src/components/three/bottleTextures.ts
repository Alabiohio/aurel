import * as THREE from 'three';

export function createLabelTexture(anisotropy = 4): THREE.CanvasTexture {
  const width = 512;
  const height = 640;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Textured cream cotton paper background
    ctx.fillStyle = '#EFE9DC';
    ctx.fillRect(0, 0, width, height);

    // Subtle paper fiber grain
    for (let i = 0; i < 6500; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const alpha = Math.random() * 0.045;
      ctx.fillStyle = i % 2 === 0 ? `rgba(17, 17, 15, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Outer double editorial hairline frame
    ctx.strokeStyle = 'rgba(17, 17, 15, 0.22)';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, width - 48, height - 48);

    ctx.strokeStyle = 'rgba(181, 138, 85, 0.65)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(32, 32, width - 64, height - 64);

    // Brand Wordmark
    ctx.fillStyle = '#151412';
    ctx.textAlign = 'center';
    ctx.font = '500 54px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('A U R E L', width / 2, 165);

    // Thin amber divider
    ctx.fillStyle = '#B58A55';
    ctx.fillRect(width / 2 - 42, 200, 84, 2);

    // Fragrance title
    ctx.fillStyle = '#1C1A16';
    ctx.font = '500 34px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('NOIR AMBRE', width / 2, 290);

    ctx.fillStyle = '#5E584E';
    ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('EXTRAIT DE PARFUM', width / 2, 336);

    // Olfactory notes summary
    ctx.fillStyle = '#736C60';
    ctx.font = '400 15px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Labdanum  ·  Smoked Benzoin  ·  Patchouli', width / 2, 420);

    // Footer imprint
    ctx.fillStyle = '#3B3730';
    ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('100 ML   ·   3.4 FL. OZ.', width / 2, 520);

    ctx.fillStyle = '#7A7266';
    ctx.font = '400 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('PARIS — GRASSE', width / 2, 554);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return texture;
}

export function createBrushedBronzeTexture(anisotropy = 4): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, width, height);

    // Fine horizontal lathe-turned micro-grooves
    for (let y = 0; y < height; y++) {
      const lum = Math.floor(110 + (Math.sin(y * 0.9) * 0.5 + 0.5) * 32 + (Math.random() - 0.5) * 18);
      ctx.fillStyle = `rgb(${lum}, ${lum}, ${lum})`;
      ctx.fillRect(0, y, width, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return texture;
}

export function createCausticShadowTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, size, size);

    // Soft dark contact core directly under the bottle base
    const shadowGrad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      10,
      size / 2,
      size / 2,
      size * 0.44
    );
    shadowGrad.addColorStop(0, 'rgba(6, 5, 4, 0.92)');
    shadowGrad.addColorStop(0.28, 'rgba(8, 7, 5, 0.72)');
    shadowGrad.addColorStop(0.55, 'rgba(181, 138, 85, 0.24)');
    shadowGrad.addColorStop(0.75, 'rgba(181, 138, 85, 0.08)');
    shadowGrad.addColorStop(1, 'rgba(17, 17, 15, 0)');

    ctx.fillStyle = shadowGrad;
    ctx.fillRect(0, 0, size, size);

    // Subtle refracted amber caustic arcs around perimeter
    ctx.save();
    ctx.translate(size / 2, size / 2);
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      ctx.save();
      ctx.rotate(angle);
      const arcGrad = ctx.createRadialGradient(88, 0, 2, 92, 0, 52);
      arcGrad.addColorStop(0, 'rgba(218, 154, 72, 0.26)');
      arcGrad.addColorStop(0.5, 'rgba(181, 120, 48, 0.08)');
      arcGrad.addColorStop(1, 'rgba(181, 120, 48, 0)');
      ctx.fillStyle = arcGrad;
      ctx.beginPath();
      ctx.ellipse(92, 0, 50, 24, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
