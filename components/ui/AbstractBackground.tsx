'use client';

import React, { useEffect, useRef } from 'react';

// Anaqio brand colors - blue and purple gradient palette
const colors = ['#2563EB', '#7C3AED', '#3F57AF', '#6049A8', '#6F47A7'];

class Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;

  constructor(width: number, height: number) {
    this.r = Math.random() * 200 + 200; // Radius
    this.x = Math.random() * (width - this.r * 2) + this.r;
    this.y = Math.random() * (height - this.r * 2) + this.r;
    // Velocity - slower for more elegant movement
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x + this.r > width || this.x - this.r < 0) this.vx *= -1;
    if (this.y + this.r > height || this.y - this.r < 0) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const AbstractBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let animationFrameId: number;

    const blobs: Blob[] = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Create initial blobs
      blobs.length = 0;
      for (let i = 0; i < 6; i++) {
        blobs.push(new Blob(width, height));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      blobs.forEach((blob) => {
        blob.update(width, height);
        blob.draw(ctx);
      });

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
      className="pointer-events-none fixed left-0 top-0 -z-10 h-full w-full"
      style={{
        filter: 'blur(80px)',
        opacity: 0.4,
      }}
      aria-hidden="true"
    />
  );
};

export default AbstractBackground;
