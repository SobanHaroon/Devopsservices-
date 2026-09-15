import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function AbstractBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms for ambient lighting orbs
  const yShift1 = useTransform(scrollY, [0, 4000], [0, -450]);
  const yShift2 = useTransform(scrollY, [0, 4000], [0, 350]);
  const opacityShift = useTransform(scrollY, [0, 1000, 2500, 4000], [0.8, 1, 0.85, 0.95]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Particle & Constellation Node Class
    class Node {
      x: number;
      y: number;
      z: number;
      size: number;
      vx: number;
      vy: number;
      opacity: number;
      baseColor: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2 + 0.5; // depth factor
        this.size = Math.random() * 2.2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = -Math.random() * 0.2 - 0.05;
        this.opacity = Math.random() * 0.5 + 0.2;
        const colors = [
          "rgba(59, 130, 246,",  // Electric Blue
          "rgba(6, 182, 212,",   // Cyan
          "rgba(124, 58, 237,",  // Violet
          "rgba(147, 197, 253,"  // Soft Light Blue
        ];
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Smooth cursor attraction based on depth
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          this.x -= (dx / dist) * force * 0.4 * this.z;
          this.y -= (dy / dist) * force * 0.4 * this.z;
        }

        this.x += this.vx * this.z;
        this.y += this.vy * this.z;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.size * this.z, 0, Math.PI * 2);
        context.fillStyle = `${this.baseColor} ${this.opacity})`;
        context.shadowColor = "#3b82f6";
        context.shadowBlur = this.size * 4;
        context.fill();
        context.restore();
      }
    }

    const nodes: Node[] = Array.from({ length: 60 }, () => new Node());

    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate smooth mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // 1. Draw Silk Ambient Waves
      waveOffset += 0.0015;
      ctx.lineWidth = 1.2;

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const amplitude = 40 + i * 20;
        const frequency = 0.0007 + i * 0.0003;
        
        ctx.strokeStyle = i % 2 === 0 
          ? "rgba(59, 130, 246, 0.04)" 
          : "rgba(6, 182, 212, 0.03)";

        ctx.moveTo(0, height * (0.35 + i * 0.18));
        for (let x = 0; x <= width; x += 12) {
          const y =
            height * (0.35 + i * 0.18) +
            Math.sin(x * frequency + waveOffset + i * 1.5) * amplitude * Math.cos(waveOffset + i);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 2. Draw Constellation lines between close nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // 3. Render Nodes
      nodes.forEach((n) => {
        n.update();
        n.draw(ctx);
      });

      animationId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Dynamic Ambient Radial Lighting Orbs */}
      <motion.div
        className="absolute top-[-15%] left-[-10%] w-[65vw] h-[65vw] rounded-full filter blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(124, 58, 237, 0.04) 50%, transparent 75%)",
          y: yShift1,
          opacity: opacityShift,
        }}
      />
      
      <motion.div
        className="absolute top-[40%] right-[-15%] w-[55vw] h-[55vw] rounded-full filter blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(37, 99, 235, 0.05) 55%, transparent 80%)",
          y: yShift2,
        }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full filter blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Dark Obsidian Mesh Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#080d1a] to-[#030712] opacity-95" />

      {/* Fine-grain Technical Grid */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0),
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px, 64px 64px, 64px 64px",
          backgroundPosition: "center center"
        }}
      />

      {/* Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

