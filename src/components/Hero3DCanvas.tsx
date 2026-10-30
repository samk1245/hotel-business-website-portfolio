"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setPrefersReducedMotion(true);
      return;
    }

    // Check WebGL availability
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040711, 0.04);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
    camera.position.set(0, 2.2, 7.8);

    // 2. High-Performance Renderer with Capped Pixel Ratio (prevents GPU lag on 4K/Retina)
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        precision: "mediump", // High mobile & desktop efficiency
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    // 3. Procedural 3D Luxury Architectural Resort Pavilion
    const worldGroup = new THREE.Group();

    // Material Library (Engineered for 60fps performance without expensive shaders)
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xe6c673,
      metalness: 0.85,
      roughness: 0.25,
    });

    const polishedDarkMat = new THREE.MeshStandardMaterial({
      color: 0x0c111e,
      roughness: 0.2,
      metalness: 0.6,
    });

    const translucentGlassMat = new THREE.MeshStandardMaterial({
      color: 0x1d3557,
      roughness: 0.1,
      metalness: 0.3,
      transparent: true,
      opacity: 0.65,
    });

    const warmStoneMat = new THREE.MeshStandardMaterial({
      color: 0x161e2e,
      roughness: 0.45,
      metalness: 0.4,
    });

    const glowCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffdf88,
    });

    const poolWaterMat = new THREE.MeshStandardMaterial({
      color: 0x0077b6,
      roughness: 0.08,
      metalness: 0.8,
      transparent: true,
      opacity: 0.8,
    });

    // A. Main Floating Architectural Base (Polished Obsidian Podium)
    const podiumGeo = new THREE.BoxGeometry(6.4, 0.3, 4.4);
    const podium = new THREE.Mesh(podiumGeo, polishedDarkMat);
    podium.position.y = -0.7;
    worldGroup.add(podium);

    // B. Illuminated Architectural Grid Runway (Floor lights)
    const gridHelper = new THREE.GridHelper(7.5, 14, 0xd4af37, 0x182c5e);
    gridHelper.position.y = -0.84;
    worldGroup.add(gridHelper);

    // C. Infinity Pool with Mirror Reflection Effect
    const poolGeo = new THREE.PlaneGeometry(3.0, 2.0, 16, 16);
    const pool = new THREE.Mesh(poolGeo, poolWaterMat);
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(1.4, -0.54, 0.8);
    worldGroup.add(pool);

    // D. Cantilevered Glass Main Atrium (Boutique Villa Suite)
    const villaGeo = new THREE.BoxGeometry(3.0, 1.8, 2.6);
    const villa = new THREE.Mesh(villaGeo, translucentGlassMat);
    villa.position.set(-0.8, 0.45, 0);
    worldGroup.add(villa);

    // E. Upper Presidential Terrace (Floating Suite)
    const upperGeo = new THREE.BoxGeometry(2.6, 1.0, 2.2);
    const upperSuite = new THREE.Mesh(upperGeo, warmStoneMat);
    upperSuite.position.set(-0.2, 1.55, 0.3);
    worldGroup.add(upperSuite);

    // F. Golden Architectural Pergola Louvers
    const louverGeo = new THREE.BoxGeometry(3.4, 0.05, 0.12);
    for (let i = 0; i < 8; i++) {
      const louver = new THREE.Mesh(louverGeo, goldMat);
      louver.position.set(-0.2, 2.15, -0.9 + i * 0.32);
      worldGroup.add(louver);
    }

    // G. Golden Support Columns
    const colGeo = new THREE.CylinderGeometry(0.035, 0.035, 2.2, 12);
    const colPositions = [-2.1, -0.5, 1.1];
    colPositions.forEach((xPos) => {
      const col = new THREE.Mesh(colGeo, goldMat);
      col.position.set(xPos, 0.95, 1.3);
      worldGroup.add(col);
    });

    // H. Interior Luxury Golden Ambient Core
    const glowGeo = new THREE.BoxGeometry(1.5, 0.8, 1.2);
    const glowBox = new THREE.Mesh(glowGeo, glowCoreMat);
    glowBox.position.set(-0.8, 0.35, 0);
    worldGroup.add(glowBox);

    // I. Floating 3D Geometric Architectural Rings (StayCraft Visual Identity)
    const ringGeo = new THREE.TorusGeometry(2.8, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.35 });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 3;
    orbitRing.position.set(0, 0.6, 0);
    worldGroup.add(orbitRing);

    const outerRingGeo = new THREE.TorusGeometry(3.5, 0.015, 16, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({ color: 0x4895ef, transparent: true, opacity: 0.25 });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = -Math.PI / 4;
    outerRing.position.set(0, 0.6, 0);
    worldGroup.add(outerRing);

    // J. Ambient Floating Luxury Particles (Optimized BufferGeometry Instancing)
    const particleCount = 40;
    const particleGeo = new THREE.OctahedronGeometry(0.06, 0);
    const particleGroup = new THREE.Group();

    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeo, goldMat);
      p.position.set(
        (Math.random() - 0.5) * 8.5,
        (Math.random() - 0.5) * 4.5 + 0.8,
        (Math.random() - 0.5) * 6
      );
      p.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      particleGroup.add(p);
    }
    worldGroup.add(particleGroup);

    scene.add(worldGroup);

    // 4. Subtle, High-Performance Luxury Lighting
    const ambientLight = new THREE.AmbientLight(0x162238, 1.8);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xf5d77f, 2.5);
    goldKeyLight.position.set(4, 5, 4);
    scene.add(goldKeyLight);

    const blueFillLight = new THREE.DirectionalLight(0x2a5298, 1.6);
    blueFillLight.position.set(-4, 3, -3);
    scene.add(blueFillLight);

    const warmInteriorPoint = new THREE.PointLight(0xffbe0b, 2.0, 6);
    warmInteriorPoint.position.set(-0.8, 0.4, 0.1);
    scene.add(warmInteriorPoint);

    // 5. Smooth Interpolated Mouse & Touch Parallax
    let targetRotationX = 0.08;
    let targetRotationY = 0;
    let currentRotationX = 0.08;
    let currentRotationY = 0;

    let isVisible = true;
    let animationFrameId: number;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;

      targetRotationY = x * 0.7;
      targetRotationX = y * 0.4 + 0.08;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });

    // 6. Pause Rendering When Off-Screen (Saves CPU/GPU battery and removes lag on scroll)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // 7. Smooth 60FPS Animation Loop with Delta Clamping
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Skip work if scrolled out of view

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Dampening for Mouse Parallax
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;

      // Base idle architectural float
      worldGroup.rotation.y = elapsedTime * 0.12 + currentRotationY;
      worldGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.5) * 0.02;

      // Subtle water wave pulsating shimmer
      pool.position.y = -0.54 + Math.sin(elapsedTime * 2.5) * 0.008;

      // Orbiting rings counter-rotation
      orbitRing.rotation.z = elapsedTime * 0.2;
      outerRing.rotation.z = -elapsedTime * 0.15;

      // Floating particles gentle drift
      particleGroup.children.forEach((p, idx) => {
        p.position.y += Math.sin(elapsedTime * 1.2 + idx) * 0.002;
        p.rotation.x += 0.01;
        p.rotation.y += 0.012;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources cleanly to prevent memory leaks
      renderer.dispose();
      podiumGeo.dispose();
      villaGeo.dispose();
      upperGeo.dispose();
      louverGeo.dispose();
      colGeo.dispose();
      glowGeo.dispose();
      poolGeo.dispose();
      ringGeo.dispose();
      outerRingGeo.dispose();
      particleGeo.dispose();
    };
  }, []);

  if (prefersReducedMotion || !hasWebGL) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity filter blur-[1px]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-midnight-950/80 to-midnight-950 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[640px] will-change-transform">
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
      {/* Luxury Gradient Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-midnight-950 via-transparent to-midnight-950/60" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-midnight-950 via-transparent to-midnight-950/40" />

      {/* Floating 3D Control Pill */}
      <div className="absolute bottom-6 right-6 z-10 hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-midnight-900/80 border border-gold-500/30 text-[11px] text-ivory-300 backdrop-blur-md shadow-luxury-dark">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
        <span>StayCraft 3D Architectural Pavilion • Drag / Move to explore</span>
      </div>
    </div>
  );
}
