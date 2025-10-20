# Text-to-Video Generation Model

## Overview

This is an interactive web-based text-to-video generation model that allows users to create dynamic video sequences from text descriptions. The application uses HTML5 Canvas and JavaScript to generate animated videos based on user input.

## Features

### 🎬 Video Generation
- **Text Prompt Input**: Enter detailed descriptions of the video you want to create
- **Customizable Parameters**:
  - Duration: 3-10 seconds
  - Style: Realistic, Animated, Cinematic, Abstract
  - Quality: Draft, Standard, High
- **Real-time Animation**: Canvas-based animation that responds to prompt keywords

### 🎨 Smart Scene Detection
The model analyzes your text prompt and generates appropriate scenes:
- **Nature Scenes**: Ocean waves, beaches, sunsets, forests, mountains
- **City Scenes**: Urban environments, buildings, neon lights
- **Space Scenes**: Stars, planets, galaxies
- **Fireworks**: Celebration scenes with animated fireworks
- **Default Scenes**: Abstract animated gradients and geometric shapes

### 📊 Progress Tracking
- Real-time progress bar during generation
- Status updates at each stage of the process
- Loading indicators with visual feedback

### 💾 Download Capability
- Download generated video frames
- Video information display (prompt, duration, style, quality)

## How to Use

1. **Navigate to the Video Generator**
   - From the homepage, click "Try Video Generator →"
   - Or directly visit `/video-generator.html`

2. **Enter Your Prompt**
   - Type a detailed description in the text area
   - Use example prompts for inspiration
   - Be specific about scenes, actions, and atmosphere

3. **Customize Settings**
   - Adjust duration slider (3-10 seconds)
   - Select video style from dropdown
   - Choose quality level

4. **Generate Video**
   - Click "Generate Video 🎬" button
   - Watch the progress indicator
   - View the animated result in the preview area

5. **Download**
   - Click "Download Video" to save the frame
   - Video information is displayed below the preview

## Example Prompts

- **Futuristic Scene**: "A robot dancing in a futuristic city with neon lights"
- **Nature Scene**: "Ocean waves crashing on a beach at sunset with seagulls"
- **Seasonal Scene**: "A person walking through a colorful autumn forest"
- **Celebration Scene**: "Fireworks exploding over a city skyline at night"

## Technical Details

### Technologies Used
- **HTML5**: Structure and Canvas element
- **CSS3**: Styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Animation logic and user interaction
- **Canvas API**: Real-time video frame rendering

### Animation Techniques
- Procedural generation based on prompt keywords
- Frame-by-frame animation at 30 FPS
- Gradient backgrounds with dynamic color transitions
- Particle systems for effects (waves, fireworks, stars)
- Text overlay with fade in/out effects

### File Structure
```
├── video-generator.html       # Main HTML page
├── assets/
│   ├── css/
│   │   └── video-generator.css    # Styling
│   └── js/
│       └── video-generator.js     # Animation logic
```

## Browser Compatibility

This application works best in modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- CSS3 Gradients and Animations

Recommended browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

Potential improvements for future versions:
- Integration with actual AI video generation APIs
- Export to video file formats (MP4, WebM)
- More animation styles and effects
- Frame-by-frame editing capabilities
- Video timeline controls (play, pause, rewind)
- Multi-scene composition
- Audio integration

## Note

This is a demonstration/simulation of text-to-video generation using canvas animations. In a production environment, this would be connected to actual AI models like:
- Runway Gen-2
- Stability AI's Stable Video Diffusion
- Meta's Make-A-Video
- Google's Imagen Video

## License

This project is part of Sudarshan's portfolio website. All rights reserved.

## Contact

For questions or feedback, please contact through the portfolio website.
