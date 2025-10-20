// Text-to-Video Generator JavaScript

class VideoGenerator {
  constructor() {
    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.textPrompt = document.getElementById('textPrompt');
    this.durationSlider = document.getElementById('duration');
    this.durationValue = document.getElementById('durationValue');
    this.styleSelect = document.getElementById('style');
    this.qualitySelect = document.getElementById('quality');
    this.generateBtn = document.getElementById('generateBtn');
    this.videoPreview = document.getElementById('videoPreview');
    this.loadingIndicator = document.getElementById('loadingIndicator');
    this.videoInfo = document.getElementById('videoInfo');
    this.progressFill = document.getElementById('progressFill');
    this.statusText = document.getElementById('statusText');
    this.downloadBtn = document.getElementById('downloadBtn');
    this.generatedVideoData = null;
  }

  bindEvents() {
    // Update duration display
    this.durationSlider.addEventListener('input', (e) => {
      this.durationValue.textContent = `${e.target.value}s`;
    });

    // Generate button
    this.generateBtn.addEventListener('click', () => {
      this.generateVideo();
    });

    // Download button
    this.downloadBtn.addEventListener('click', () => {
      this.downloadVideo();
    });

    // Example cards
    document.querySelectorAll('.example-card').forEach(card => {
      card.addEventListener('click', () => {
        const prompt = card.getAttribute('data-prompt');
        this.textPrompt.value = prompt;
        this.textPrompt.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  async generateVideo() {
    const prompt = this.textPrompt.value.trim();
    
    if (!prompt) {
      alert('Please enter a text prompt to generate a video!');
      return;
    }

    // Disable generate button
    this.generateBtn.disabled = true;
    
    // Hide video info and show loading
    this.videoInfo.style.display = 'none';
    this.loadingIndicator.style.display = 'block';
    
    // Simulate video generation process
    await this.simulateGeneration();
    
    // Create video
    this.createVideo();
    
    // Enable button
    this.generateBtn.disabled = false;
  }

  async simulateGeneration() {
    const stages = [
      { progress: 20, text: 'Processing text prompt...' },
      { progress: 40, text: 'Generating scene composition...' },
      { progress: 60, text: 'Creating visual elements...' },
      { progress: 80, text: 'Rendering video frames...' },
      { progress: 100, text: 'Finalizing video...' }
    ];

    for (const stage of stages) {
      this.progressFill.style.width = `${stage.progress}%`;
      this.statusText.textContent = stage.text;
      await this.delay(800);
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  createVideo() {
    // Hide loading
    this.loadingIndicator.style.display = 'none';
    
    // Create canvas for video simulation
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    
    const duration = parseInt(this.durationSlider.value);
    const style = this.styleSelect.value;
    const prompt = this.textPrompt.value.trim();
    
    // Display canvas
    this.videoPreview.innerHTML = '';
    this.videoPreview.appendChild(canvas);
    
    // Animate the canvas based on the prompt
    this.animateCanvas(canvas, duration, style, prompt);
    
    // Show video info
    this.displayVideoInfo(prompt, duration, style);
  }

  animateCanvas(canvas, duration, style, prompt) {
    const ctx = canvas.getContext('2d');
    const fps = 30;
    const totalFrames = duration * fps;
    let frame = 0;

    // Parse prompt for keywords to determine animation
    const keywords = prompt.toLowerCase();
    const hasNature = keywords.includes('ocean') || keywords.includes('wave') || keywords.includes('beach') || keywords.includes('forest') || keywords.includes('mountain') || keywords.includes('sunset') || keywords.includes('sunrise');
    const hasCity = keywords.includes('city') || keywords.includes('building') || keywords.includes('urban') || keywords.includes('neon');
    const hasSpace = keywords.includes('space') || keywords.includes('star') || keywords.includes('galaxy') || keywords.includes('planet');
    const hasFireworks = keywords.includes('firework') || keywords.includes('celebration');
    
    const animate = () => {
      if (frame >= totalFrames) {
        return; // Animation complete
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background based on style
      if (hasNature) {
        this.drawNatureScene(ctx, canvas, frame, totalFrames, style);
      } else if (hasCity) {
        this.drawCityScene(ctx, canvas, frame, totalFrames, style);
      } else if (hasSpace) {
        this.drawSpaceScene(ctx, canvas, frame, totalFrames, style);
      } else if (hasFireworks) {
        this.drawFireworksScene(ctx, canvas, frame, totalFrames, style);
      } else {
        this.drawDefaultScene(ctx, canvas, frame, totalFrames, style);
      }

      // Add text overlay with prompt
      this.drawTextOverlay(ctx, canvas, prompt, frame, totalFrames);

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
    
    // Store canvas reference for download
    this.generatedVideoData = canvas;
  }

  drawNatureScene(ctx, canvas, frame, totalFrames, style) {
    const progress = frame / totalFrames;
    
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    const hue = 200 + progress * 60; // Transition from blue to orange
    gradient.addColorStop(0, `hsl(${hue}, 70%, 60%)`);
    gradient.addColorStop(1, `hsl(${hue + 20}, 80%, 40%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Sun/Moon
    const sunY = canvas.height * 0.2 + Math.sin(progress * Math.PI) * 100;
    ctx.fillStyle = progress > 0.5 ? '#FDB813' : '#FFE66D';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.8, sunY, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Waves
    this.drawWaves(ctx, canvas, frame);
  }

  drawCityScene(ctx, canvas, frame, totalFrames, style) {
    const progress = frame / totalFrames;
    
    // Night sky
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Buildings
    for (let i = 0; i < 10; i++) {
      const x = (i * canvas.width / 10);
      const height = 200 + Math.sin(i + progress * Math.PI * 2) * 100;
      const y = canvas.height - height;
      
      ctx.fillStyle = `rgba(${50 + i * 10}, ${100 + i * 5}, ${200 - i * 10}, 0.8)`;
      ctx.fillRect(x, y, canvas.width / 11, height);
      
      // Windows
      for (let j = 0; j < height / 40; j++) {
        if (Math.random() > 0.3) {
          ctx.fillStyle = '#FFD700';
          ctx.fillRect(x + 10, y + j * 40 + 10, 20, 15);
        }
      }
    }
    
    // Neon glow effect
    if (style === 'cinematic') {
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#FF00FF';
    }
  }

  drawSpaceScene(ctx, canvas, frame, totalFrames, style) {
    const progress = frame / totalFrames;
    
    // Space background
    ctx.fillStyle = '#000814';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Stars
    for (let i = 0; i < 100; i++) {
      const x = (i * 127) % canvas.width;
      const y = (i * 311) % canvas.height;
      const size = Math.sin(frame * 0.1 + i) * 2 + 2;
      
      ctx.fillStyle = '#FFF';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Planet
    const planetX = canvas.width / 2 + Math.cos(progress * Math.PI * 2) * 200;
    const planetY = canvas.height / 2 + Math.sin(progress * Math.PI * 2) * 100;
    
    const planetGradient = ctx.createRadialGradient(planetX, planetY, 0, planetX, planetY, 80);
    planetGradient.addColorStop(0, '#7B68EE');
    planetGradient.addColorStop(1, '#4B0082');
    ctx.fillStyle = planetGradient;
    ctx.beginPath();
    ctx.arc(planetX, planetY, 80, 0, Math.PI * 2);
    ctx.fill();
  }

  drawFireworksScene(ctx, canvas, frame, totalFrames, style) {
    const progress = frame / totalFrames;
    
    // Night sky
    ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // City silhouette
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, canvas.height - 200, canvas.width, 200);
    
    // Fireworks
    const numFireworks = 5;
    for (let i = 0; i < numFireworks; i++) {
      const fx = (i + 0.5) * canvas.width / numFireworks;
      const fy = 200 + Math.sin(progress * Math.PI * 4 + i) * 100;
      const radius = Math.sin((frame + i * 20) * 0.1) * 50 + 50;
      const particles = 20;
      
      for (let j = 0; j < particles; j++) {
        const angle = (Math.PI * 2 * j) / particles;
        const x = fx + Math.cos(angle) * radius;
        const y = fy + Math.sin(angle) * radius;
        
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF00FF', '#00FFFF'];
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  drawDefaultScene(ctx, canvas, frame, totalFrames, style) {
    const progress = frame / totalFrames;
    
    // Animated gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const hue1 = (progress * 360) % 360;
    const hue2 = (hue1 + 120) % 360;
    gradient.addColorStop(0, `hsl(${hue1}, 70%, 50%)`);
    gradient.addColorStop(1, `hsl(${hue2}, 70%, 50%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Geometric shapes
    const numShapes = 10;
    for (let i = 0; i < numShapes; i++) {
      const x = (i * canvas.width / numShapes) + Math.sin(progress * Math.PI * 2 + i) * 50;
      const y = canvas.height / 2 + Math.cos(progress * Math.PI * 2 + i) * 100;
      const size = 50 + Math.sin(frame * 0.1 + i) * 20;
      
      ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
      if (style === 'abstract') {
        // Circles
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Rectangles
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
    }
  }

  drawWaves(ctx, canvas, frame) {
    ctx.fillStyle = 'rgba(65, 105, 225, 0.6)';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.7);
    
    for (let x = 0; x < canvas.width; x++) {
      const y = canvas.height * 0.7 + Math.sin(x * 0.01 + frame * 0.1) * 30;
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
  }

  drawTextOverlay(ctx, canvas, prompt, frame, totalFrames) {
    const progress = frame / totalFrames;
    
    // Fade in/out effect
    let alpha = 1;
    if (progress < 0.1) {
      alpha = progress * 10;
    } else if (progress > 0.9) {
      alpha = (1 - progress) * 10;
    }
    
    ctx.save();
    ctx.globalAlpha = alpha * 0.8;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
    
    ctx.fillStyle = '#FFF';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    
    // Truncate prompt if too long
    const displayPrompt = prompt.length > 80 ? prompt.substring(0, 77) + '...' : prompt;
    ctx.fillText(displayPrompt, canvas.width / 2, canvas.height - 40);
    ctx.restore();
  }

  displayVideoInfo(prompt, duration, style) {
    document.getElementById('infoPrompt').textContent = prompt;
    document.getElementById('infoDuration').textContent = `${duration} seconds`;
    document.getElementById('infoStyle').textContent = style.charAt(0).toUpperCase() + style.slice(1);
    document.getElementById('infoQuality').textContent = this.qualitySelect.options[this.qualitySelect.selectedIndex].text;
    
    this.videoInfo.style.display = 'block';
  }

  downloadVideo() {
    if (!this.generatedVideoData) {
      alert('No video generated yet!');
      return;
    }

    // Convert canvas to image and download
    this.generatedVideoData.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-video-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Video frame downloaded! (Note: This is a simulation - in a production environment, this would generate and download an actual video file)');
    });
  }
}

// Initialize the video generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new VideoGenerator();
});
