"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check reduced motion
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

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070d1f, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 7.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    // 2. Architectural Luxury Hotel Pavilion Model (Procedural High-Precision Geometry)
    const pavilionGroup = new THREE.Group();

    // Base podium (polished granite terrace)
    const podiumGeo = new THREE.BoxGeometry(6.5, 0.35, 4.5);
    const darkPodiumMat = new THREE.MeshStandardMaterial({
      color: 0x111625,
      roughness: 0.2,
      metalness: 0.8,
    });
    const podium = new THREE.Mesh(podiumGeo, darkPodiumMat);
    podium.position.y = -0.8;
    podium.receiveShadow = true;
    pavilionGroup.add(podium);

    // Reflective Pool on terrace
    const poolGeo = new THREE.PlaneGeometry(3.2, 2.2);
    const poolMat = new THREE.MeshStandardMaterial({
      color: 0x184263,
      roughness: 0.1,
      metalness: 0.9,
    });
    const pool = new THREE.Mesh(poolGeo, poolMat);
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(1.4, -0.61, 0.8);
    pavilionGroup.add(pool);

    // Luxury Villa Main Building Glass Cube
    const mainBuildingGeo = new THREE.BoxGeometry(3.2, 2.0, 2.8);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a2b4c,
      metalness: 0.3,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
    });
    const mainBuilding = new THREE.Mesh(mainBuildingGeo, glassMat);
    mainBuilding.position.set(-0.8, 0.4, 0);
    mainBuilding.castShadow = true;
    pavilionGroup.add(mainBuilding);

    // Cantilevered Upper Presidential Suite (Floating Terrace)
    const upperSuiteGeo = new THREE.BoxGeometry(2.8, 1.1, 2.4);
    const warmStoneMat = new THREE.MeshStandardMaterial({
      color: 0x1e2638,
      roughness: 0.5,
      metalness: 0.4,
    });
    const upperSuite = new THREE.Mesh(upperSuiteGeo, warmStoneMat);
    upperSuite.position.set(-0.2, 1.6, 0.3);
    upperSuite.castShadow = true;
    pavilionGroup.add(upperSuite);

    // Champagne Gold Architectural Louvers / Pergola
    const goldLouverMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Champagne gold
      metalness: 0.9,
      roughness: 0.2,
    });

    for (let i = 0; i < 9; i++) {
      const louverGeo = new THREE.BoxGeometry(3.6, 0.06, 0.15);
      const louver = new THREE.Mesh(louverGeo, goldLouverMat);
      louver.position.set(-0.3, 2.25, -1.0 + i * 0.32);
      pavilionGroup.add(louver);
    }

    // Gold Vertical Columns
    for (let x = -2.2; x <= 1.2; x += 1.7) {
      const colGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.4, 16);
      const col = new THREE.Mesh(colGeo, goldLouverMat);
      col.position.set(x, 1.0, 1.4);
      pavilionGroup.add(col);
    }

    // Interior Warm Luxury Glow Core
    const interiorLightCoreGeo = new THREE.BoxGeometry(1.6, 0.9, 1.4);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffe6a3,
    });
    const glowBox = new THREE.Mesh(interiorLightCoreGeo, glowMat);
    glowBox.position.set(-0.8, 0.3, 0);
    pavilionGroup.add(glowBox);

    // Ambient floating geometric particles (sparks of prestige)
    const particleCount = 45;
    const particleGeo = new THREE.TetrahedronGeometry(0.07, 0);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.8,
      roughness: 0.2,
    });

    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);
      p.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5 + 1,
        (Math.random() - 0.5) * 6
      );
      p.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(p);
      particles.push(p);
    }

    scene.add(pavilionGroup);

    // 3. Luxury Lighting
    const ambientLight = new THREE.AmbientLight(0x192744, 1.2);
    scene.add(ambientLight);

    // Warm Interior Point Light (Hotel warm ivory 2700K look)
    const warmInteriorLight = new THREE.PointLight(0xffd580, 2.5, 8);
    warmInteriorLight.position.set(-0.8, 0.5, 0.2);
    scene.add(warmInteriorLight);

    // Golden Accent Rim Light
    const goldRimLight = new THREE.DirectionalLight(0xd4af37, 2.8);
    goldRimLight.position.set(5, 6, 4);
    goldRimLight.castShadow = true;
    scene.add(goldRimLight);

    // Cool Midnight Blue Fill Light
    const blueFillLight = new THREE.DirectionalLight(0x3867d6, 1.5);
    blueFillLight.position.set(-5, 4, -4);
    scene.add(blueFillLight);

    // 4. Mouse Interactive Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation towards mouse
      targetX += (mouseX * 0.45 - targetX) * 0.05;
      targetY += (mouseY * 0.25 - targetY) * 0.05;

      pavilionGroup.rotation.y = elapsedTime * 0.15 + targetX;
      pavilionGroup.rotation.x = 0.12 - targetY;

      // Animate floating particles
      particles.forEach((p, idx) => {
        p.position.y += Math.sin(elapsedTime + idx) * 0.003;
        p.rotation.x += 0.008;
        p.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
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
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[640px]">
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
      {/* Subtle Luxury Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-midnight-950 via-transparent to-midnight-950/60" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-midnight-950 via-transparent to-midnight-950/40" />

      {/* Floating 3D Control Pill */}
      <div className="absolute bottom-6 right-6 z-10 hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-midnight-900/80 border border-gold-500/30 text-[11px] text-ivory-300 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
        <span>Interactive 3D Architectural Pavilion • Drag to explore</span>
      </div>
    </div>
  );
}
