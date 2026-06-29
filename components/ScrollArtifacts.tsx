"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const centers = [0.19, 0.37, 0.56, 0.74, 0.91];
const positions: [number, number, number][] = [
  [5.15, 0.7, -1.2],
  [-5.25, -0.6, -1],
  [4.7, -0.25, -0.6],
  [-5.45, 0.5, -0.9],
  [6.35, -0.55, -1.1],
];
const intensities = [0.78, 0.72, 1, 0.62, 0.5];

function pulse(progress: number, center: number) {
  return Math.exp(-Math.pow((progress - center) / 0.075, 2));
}

function ArtifactMaterial({ wireframe = false }: { wireframe?: boolean }) {
  return (
    <meshStandardMaterial
      color={wireframe ? "#f1ca7b" : "#8f6428"}
      emissive={wireframe ? "#c8892d" : "#4f2d0a"}
      emissiveIntensity={wireframe ? 1.8 : 0.65}
      metalness={0.92}
      roughness={0.2}
      transparent
      opacity={0}
      wireframe={wireframe}
      depthWrite={false}
    />
  );
}

function Artifacts() {
  const groups = useRef<Array<THREE.Group | null>>([]);

  useFrame(({ clock, pointer }) => {
    const root = document.documentElement;
    const max = Math.max(1, root.scrollHeight - window.innerHeight);
    const progress = window.scrollY / max;

    groups.current.forEach((group, index) => {
      if (!group) return;
      const strength = pulse(progress, centers[index]);
      group.visible = strength > 0.015;
      group.position.set(
        positions[index][0] + Math.sin(clock.elapsedTime * 0.28 + index) * 0.18,
        positions[index][1] + Math.cos(clock.elapsedTime * 0.36 + index) * 0.22,
        positions[index][2]
      );
      group.rotation.x = clock.elapsedTime * (0.09 + index * 0.012) + pointer.y * 0.12;
      group.rotation.y = clock.elapsedTime * (0.12 + index * 0.015) + progress * Math.PI * 2 + pointer.x * 0.18;
      group.rotation.z = Math.sin(progress * Math.PI * 3 + index) * 0.35;
      group.scale.setScalar(0.84 + strength * 0.25);
      group.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.opacity = strength * intensities[index] * (child.material.wireframe ? 0.36 : 0.13);
        }
      });
    });
  });

  return (
    <>
      <group ref={(node) => { groups.current[0] = node; }}>
        <mesh><torusKnotGeometry args={[0.76, 0.18, 120, 18, 2, 3]} /><ArtifactMaterial /></mesh>
        <mesh scale={1.035}><torusKnotGeometry args={[0.76, 0.18, 72, 12, 2, 3]} /><ArtifactMaterial wireframe /></mesh>
      </group>

      <group ref={(node) => { groups.current[1] = node; }}>
        <mesh><dodecahedronGeometry args={[1.03, 0]} /><ArtifactMaterial /></mesh>
        <mesh scale={1.025}><dodecahedronGeometry args={[1.03, 0]} /><ArtifactMaterial wireframe /></mesh>
      </group>

      <group ref={(node) => { groups.current[2] = node; }}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.9, 0.16, 16, 100]} /><ArtifactMaterial /></mesh>
        <mesh rotation={[0.35, 1, 0]}><torusGeometry args={[1.22, 0.025, 8, 120]} /><ArtifactMaterial wireframe /></mesh>
        <mesh rotation={[1.1, 0.2, 0.4]}><torusGeometry args={[1.46, 0.018, 8, 120]} /><ArtifactMaterial wireframe /></mesh>
      </group>

      <group ref={(node) => { groups.current[3] = node; }}>
        <mesh><octahedronGeometry args={[1.15, 1]} /><ArtifactMaterial /></mesh>
        <mesh scale={1.035}><octahedronGeometry args={[1.15, 1]} /><ArtifactMaterial wireframe /></mesh>
      </group>

      <group ref={(node) => { groups.current[4] = node; }}>
        <mesh><icosahedronGeometry args={[1.03, 1]} /><ArtifactMaterial /></mesh>
        <mesh scale={1.06}><icosahedronGeometry args={[1.03, 1]} /><ArtifactMaterial wireframe /></mesh>
        <mesh rotation={[0.7, 0.2, 0]}><torusGeometry args={[1.4, 0.022, 8, 110]} /><ArtifactMaterial wireframe /></mesh>
      </group>
    </>
  );
}

export default function ScrollArtifacts() {
  return (
    <div className="journey-3d" aria-hidden="true">
      <Canvas style={{ pointerEvents: "none" }} camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.35]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[4, 5, 5]} intensity={3.4} color="#ffe7b7" />
        <pointLight position={[-4, -2, 4]} intensity={22} distance={10} color="#b86f1d" />
        <Artifacts />
      </Canvas>
    </div>
  );
}
