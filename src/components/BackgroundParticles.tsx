import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types/portfolio';

interface BackgroundParticlesProps {
  theme: ThemeMode;
}

export const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle setup
    const particleCount = Math.min(Math.floor(width / 25), 60);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const particleColor = isDark ? '0, 229, 255' : '59, 130, 246';
      const lineColor = isDark ? '0, 229, 255' : '99, 102, 241';

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p1.alpha * (isDark ? 0.7 : 0.4)})`;
        ctx.fill();

        // Connect to mouse
        const dxMouse = p1.x - mouseX;
        const dyMouse = p1.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 140) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(${particleColor}, ${0.3 * (1 - distMouse / 140)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Canvas for fine node network */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      

      {/* Ambient Soft Glowing Radial Blobs */}
      <div
        className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-700 pointer-events-none ${
          theme === 'dark'
            ? 'bg-cyan-500/10'
            : 'bg-blue-300/20'
        }`}
      />
      <div
        className={`absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700 pointer-events-none ${
          theme === 'dark'
            ? 'bg-purple-600/10'
            : 'bg-indigo-300/20'
        }`}
      />
      <div
        className={`absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] transition-all duration-700 pointer-events-none ${
          theme === 'dark'
            ? 'bg-emerald-500/10'
            : 'bg-teal-200/25'
        }`}
      />
    </div>
  );
};
