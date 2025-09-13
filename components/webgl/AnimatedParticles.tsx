
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedParticlesProps {
  isHoverEffectActive: boolean;
}

const AnimatedParticles: React.FC<AnimatedParticlesProps> = ({ isHoverEffectActive }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const shootingStarsRef = useRef<THREE.Points>(null!);
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

  // Background Stars
  const count = 5000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  // Shooting Stars
  const shootingStarCount = 20;
  const shootingStars = useMemo(() => {
    const stars = [];
    for (let i = 0; i < shootingStarCount; i++) {
      stars.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          Math.random() * 10,
          (Math.random() - 0.5) * 10
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.75) * 0.02,
          (Math.random() - 0.95) * 0.05,
          0
        ),
        lifetime: Math.random() * 3 + 2, // Live for 2-5 seconds
        age: Math.random() * 5, // Start at a random age
      });
    }
    return stars;
  }, []);

  const [shootingStarPositions, shootingStarColors] = useMemo(() => {
      const positions = new Float32Array(shootingStarCount * 3);
      const colors = new Float32Array(shootingStarCount * 3);
      for(let i=0; i < shootingStarCount; i++) {
          positions[i*3] = shootingStars[i].position.x;
          positions[i*3+1] = shootingStars[i].position.y;
          positions[i*3+2] = shootingStars[i].position.z;
          colors[i*3] = 1;
          colors[i*3+1] = 1;
          colors[i*3+2] = 1;
      }
      return [positions, colors];
  }, [shootingStars]);
  
  useFrame((state, delta) => {
    // Slow, constant rotation for the group
    if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.02;
        groupRef.current.rotation.x += delta * 0.01;
    }
    
    // Interactive rotation based on mouse hover for the points
    if (pointsRef.current) {
        const targetY = isHoverEffectActive ? mouse.current.x * Math.PI / 8 : 0;
        const targetX = isHoverEffectActive ? mouse.current.y * Math.PI / 8 : 0;
        
        pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetY, 0.05);
        pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetX, 0.05);
    }
    
    // Animate Shooting Stars
    if (shootingStarsRef.current) {
        const positions = shootingStarsRef.current.geometry.attributes.position.array as Float32Array;
        const colors = shootingStarsRef.current.geometry.attributes.color.array as Float32Array;
        
        for (let i = 0; i < shootingStarCount; i++) {
            const star = shootingStars[i];
            star.age += delta;

            if (star.age > star.lifetime) {
                star.age = 0;
                star.position.set(
                    (Math.random() - 0.5) * 15,
                    Math.random() * 5 + 5, // Reset higher up
                    (Math.random() - 0.5) * 10
                );
            }
            
            star.position.add(star.velocity);
            
            const i3 = i * 3;
            positions[i3] = star.position.x;
            positions[i3 + 1] = star.position.y;
            positions[i3 + 2] = star.position.z;

            // Calculate brightness for fade in/out effect
            const brightness = Math.max(0, Math.sin(Math.PI * (star.age / star.lifetime)));
            colors[i3] = brightness;
            colors[i3 + 1] = brightness;
            colors[i3 + 2] = brightness;
        }
        shootingStarsRef.current.geometry.attributes.position.needsUpdate = true;
        shootingStarsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c084fc"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
       <Points ref={shootingStarsRef} frustumCulled={false}>
         <bufferGeometry>
            <bufferAttribute
                attach="attributes-position"
                count={shootingStarCount}
                array={shootingStarPositions}
                itemSize={3}
            />
            <bufferAttribute
                attach="attributes-color"
                count={shootingStarCount}
                array={shootingStarColors}
                itemSize={3}
            />
         </bufferGeometry>
        <PointMaterial
            transparent
            vertexColors={true}
            size={0.05}
            sizeAttenuation={true}
            depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default AnimatedParticles;
