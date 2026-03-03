'use client';

import React, { useEffect, useRef } from 'react';

const AbstractBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let animationFrameId: number;

    // Configuration - using your brand colors
    const colors = [
      { r: 37, g: 99, b: 235 },   // #2563EB - aq-blue
      { r: 124, g: 58, b: 237 },  // #7C3AED - aq-purple
      { r: 63, g: 87, b: 175 },   // #3F57AF - brand gradient start
    ];

    const blobs: Blob[] = [];

    class Blob {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: { r: number; g: number; b: number };

      constructor() {
        this.radius = Math.random() * 150 + 100; // Radius between 100-250
        this.x = Math.random() * (width - this.radius * 2) + this.radius;
        this.y = Math.random() * (height - this.radius * 2) + this.radius;
        // Slower, more elegant movement
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges with some padding
        if (this.x - this.radius < 0 || this.x + this.radius > width) {
          this.vx *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > height) {
          this.vy *= -1;
        }

        // Keep within bounds
        this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));
      }
    }

    // Metaball field calculation
    const getMetaballValue = (x: number, y: number) => {
      let sum = 0;
      
      for (const blob of blobs) {
        const dx = x - blob.x;
        const dy = y - blob.y;
        const distSq = dx * dx + dy * dy;
        
        if (distSq > 0) {
          sum += (blob.radius * blob.radius) / distSq;
        }
      }
      
      return sum;
    };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Create initial blobs
      blobs.length = 0;
      const blobCount = Math.min(6, Math.max(3, Math.floor((width * height) / 200000)));
      
      for (let i = 0; i < blobCount; i++) {
        blobs.push(new Blob());
      }
    };

    const render = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create image data for pixel manipulation
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      // Performance optimization: check every few pixels
      const step = 4;
      const threshold = 1.2; // Metaball threshold

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const value = getMetaballValue(x, y);
          
          if (value > threshold) {
            // Calculate color based on closest blob
            let closestBlob = blobs[0];
            let minDist = Infinity;
            
            for (const blob of blobs) {
              const dx = x - blob.x;
              const dy = y - blob.y;
              const dist = dx * dx + dy * dy;
              if (dist < minDist) {
                minDist = dist;
                closestBlob = blob;
              }
            }

            // Intensity based on field strength
            const intensity = Math.min(1, (value - threshold) / 2);
            const alpha = Math.floor(intensity * 120); // Max alpha of 120 for subtlety

            // Fill the step area with color
            for (let dy = 0; dy < step && y + dy < height; dy++) {
              for (let dx = 0; dx < step && x + dx < width; dx++) {
                const pixelIndex = ((y + dy) * width + (x + dx)) * 4;
                data[pixelIndex] = closestBlob.color.r;     // R
                data[pixelIndex + 1] = closestBlob.color.g; // G
                data[pixelIndex + 2] = closestBlob.color.b; // B
                data[pixelIndex + 3] = alpha;               // A
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      // Update blob positions
      blobs.forEach(blob => blob.update());
      
      // Render
      render();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    // Setup
    window.addEventListener('resize', handleResize);
    init();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        filter: 'blur(60px)', // Heavy blur for smooth blob effect
        opacity: 0.3, // Subtle so content remains readable
      }}
    />
  );
};

export default AbstractBackground;