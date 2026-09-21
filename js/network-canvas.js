/* ==========================================================================
   SAGAR BHEDA - PREMIUM PERSONAL PORTFOLIO
   Backend Network & Data Flow Canvas Visualization
   Client -> API Gateway -> Node/Sails Service -> DB / Cache / Queue
   ========================================================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Nodes representing architecture components
  let nodes = [];
  let connections = [];
  let packets = [];

  function resizeCanvas() {
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    initArchitectureNetwork();
  }

  function initArchitectureNetwork() {
    nodes = [];
    connections = [];
    packets = [];

    // Defined logical nodes across the hero space
    const centerY = height * 0.52;
    const leftX = width * 0.2;
    const midX = width * 0.5;
    const rightX = width * 0.8;

    // Node definitions
    nodes = [
      { id: 'client', label: 'Client / Web / Mobile', x: leftX, y: centerY - 70, color: '#38bdf8' },
      { id: 'gateway', label: 'API Gateway (REST)', x: leftX + (midX - leftX) * 0.45, y: centerY, color: '#00f2fe' },
      { id: 'service', label: 'Node.js / Sails.js Services', x: midX, y: centerY, color: '#6366f1' },
      { id: 'cache', label: 'Redis Cache', x: rightX, y: centerY - 110, color: '#f59e0b' },
      { id: 'db', label: 'PostgreSQL / MongoDB', x: rightX, y: centerY, color: '#10b981' },
      { id: 'queue', label: 'AWS SQS / Worker Pool', x: rightX, y: centerY + 110, color: '#a855f7' }
    ];

    // Node Connections
    connections = [
      { from: 'client', to: 'gateway' },
      { from: 'gateway', to: 'service' },
      { from: 'service', to: 'cache' },
      { from: 'service', to: 'db' },
      { from: 'service', to: 'queue' },
      { from: 'cache', to: 'service' },
      { from: 'queue', to: 'service' }
    ];

    // Seed data packets
    for (let i = 0; i < 9; i++) {
      spawnPacket();
    }
  }

  function spawnPacket() {
    if (connections.length === 0) return;
    const conn = connections[Math.floor(Math.random() * connections.length)];
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    
    if (fromNode && toNode) {
      packets.push({
        from: fromNode,
        to: toNode,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.005,
        color: fromNode.color
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Connection Lines
    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      if (!fromNode || !toNode) return;

      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 2. Draw & Update Travelling Packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += p.speed;

      if (p.progress >= 1) {
        packets.splice(i, 1);
        spawnPacket();
        continue;
      }

      const curX = p.from.x + (p.to.x - p.from.x) * p.progress;
      const curY = p.from.y + (p.to.y - p.from.y) * p.progress;

      // Packet Glow
      ctx.beginPath();
      ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }

    // 3. Draw Architectural Nodes
    nodes.forEach(node => {
      // Outer ring pulse
      ctx.beginPath();
      ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, 11, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Node label (small, monospace style)
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.55)';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + 24);
    });

    animationFrameId = requestAnimationFrame(draw);
  }

  // Event Listeners
  window.addEventListener('resize', debounce(resizeCanvas, 150));
  resizeCanvas();
  draw();

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
})();
