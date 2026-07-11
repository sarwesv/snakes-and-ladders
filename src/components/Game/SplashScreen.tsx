import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5e6d3);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffcc99, 0.6);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Create 3D text using canvas texture
    const createTextMesh = (text: string, color: string = '#D84315'): THREE.Mesh => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#f5e6d3';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = 'bold 200px Georgia';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#2C1810';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const geometry = new THREE.PlaneGeometry(8, 2);
      const material = new THREE.MeshPhongMaterial({ map: texture });
      return new THREE.Mesh(geometry, material);
    };

    // Create group for all text elements
    const group = new THREE.Group();
    sceneRef.current.add(group);
    groupRef.current = group;

    // Main title
    const mainText = createTextMesh('3D Snakes & Ladders', '#D84315');
    mainText.position.y = 0.5;
    group.add(mainText);

    // Subtitle
    const subtitleCanvas = document.createElement('canvas');
    subtitleCanvas.width = 1024;
    subtitleCanvas.height = 256;
    const subtitleCtx = subtitleCanvas.getContext('2d')!;
    subtitleCtx.fillStyle = '#f5e6d3';
    subtitleCtx.fillRect(0, 0, subtitleCanvas.width, subtitleCanvas.height);
    subtitleCtx.fillStyle = '#558B2F';
    subtitleCtx.font = 'bold 80px Georgia';
    subtitleCtx.textAlign = 'center';
    subtitleCtx.textBaseline = 'middle';
    subtitleCtx.fillText('Vintage Edition', subtitleCanvas.width / 2, subtitleCanvas.height / 2);

    const subtitleTexture = new THREE.CanvasTexture(subtitleCanvas);
    const subtitleGeometry = new THREE.PlaneGeometry(4, 1);
    const subtitleMaterial = new THREE.MeshPhongMaterial({ map: subtitleTexture });
    const subtitle = new THREE.Mesh(subtitleGeometry, subtitleMaterial);
    subtitle.position.y = -1;
    group.add(subtitle);

    // Snake emoji group
    const emojiCanvas = document.createElement('canvas');
    emojiCanvas.width = 256;
    emojiCanvas.height = 256;
    const emojiCtx = emojiCanvas.getContext('2d')!;
    emojiCtx.fillStyle = 'rgba(245, 230, 211, 0)';
    emojiCtx.fillRect(0, 0, emojiCanvas.width, emojiCanvas.height);
    emojiCtx.font = '200px Arial';
    emojiCtx.textAlign = 'center';
    emojiCtx.textBaseline = 'middle';
    emojiCtx.fillText('🐍', emojiCanvas.width / 2, emojiCanvas.height / 2);

    const emojiTexture = new THREE.CanvasTexture(emojiCanvas);
    const emojiGeometry = new THREE.PlaneGeometry(1.5, 1.5);
    const emojiMaterial = new THREE.MeshPhongMaterial({ map: emojiTexture });
    const leftSnake = new THREE.Mesh(emojiGeometry, emojiMaterial);
    leftSnake.position.set(-3, 0.5, 0);
    group.add(leftSnake);

    const rightSnake = new THREE.Mesh(emojiGeometry, emojiMaterial);
    rightSnake.position.set(3, 0.5, 0);
    group.add(rightSnake);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate group
      group.rotation.z += 0.003;
      group.rotation.x += 0.002;

      renderer.render(scene, camera);
    };
    animate();

    // Splash screen animation sequence
    const timeline = gsap.timeline();

    // Initial state
    gsap.set(group.scale, { x: 0, y: 0, z: 0 });
    gsap.set(group.rotation, { z: 0, x: 0 });

    // Animate in
    timeline
      .to(group.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
      })
      .to(
        mainText.material,
        {
          opacity: 1,
          duration: 0.8,
        },
        0
      );

    // Wait and animate out
    timeline.to(
      group.scale,
      {
        x: 0.8,
        y: 0.8,
        z: 0.8,
        duration: 0.6,
        delay: 3,
        ease: 'power2.in',
      },
      0
    );

    timeline.to(
      group,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          cancelAnimationFrame(animationId);
          renderer.dispose();
          containerRef.current?.removeChild(renderer.domElement);
          onComplete();
        },
      },
      3.6
    );

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  );
};
