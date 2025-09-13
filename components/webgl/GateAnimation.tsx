import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GateAnimation: React.FC = () => {
  // Ref for the main interactive sphere
  const sphereRef = useRef<THREE.Points>(null!);
  
  // Ref for the background stars
  const bgStarsRef = useRef<THREE.Points>(null!);

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // --- Main Interactive Sphere ---
  const sphereCount = 5000;
  const sphereRadius = 2;
  const spherePositions = useMemo(() => {
    const pos = new Float32Array(sphereCount * 3);
    for (let i = 0; i < sphereCount; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * 2 * Math.PI;
      pos[i * 3] = sphereRadius * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = sphereRadius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = sphereRadius * Math.cos(theta);
    }
    return pos;
  }, [sphereCount, sphereRadius]);

  // --- Background Starfield ---
  const bgCount = 5000;
  const bgPositions = useMemo(() => {
    const positions = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20; // Spread across a larger area
    }
    return positions;
  }, [bgCount]);

  useFrame((state, delta) => {
    // Animate the main interactive sphere
    if (sphereRef.current) {
      // Base rotation
      sphereRef.current.rotation.y += delta * 0.1;
      sphereRef.current.rotation.x += delta * 0.05;
      
      // Interactive rotation based on mouse movement
      const targetY = mouse.current.x * Math.PI / 4;
      const targetX = mouse.current.y * Math.PI / 4;
      
      // Use LERP for smooth transition
      sphereRef.current.rotation.y = THREE.MathUtils.lerp(sphereRef.current.rotation.y, targetY + sphereRef.current.rotation.y, 0.02);
      sphereRef.current.rotation.x = THREE.MathUtils.lerp(sphereRef.current.rotation.x, targetX + sphereRef.current.rotation.x, 0.02);
    }

    // Animate the background stars
    if (bgStarsRef.current) {
        bgStarsRef.current.rotation.y += delta * 0.01;
        bgStarsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <group>
        {/* Background Starfield */}
        <Points ref={bgStarsRef} positions={bgPositions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#e2e8f0"
                size={0.01}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>

        {/* Main Interactive Sphere */}
        <Points ref={sphereRef} positions={spherePositions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#a78bfa"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    </group>
  );
};

export default GateAnimation;