"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const seeded = (value: number) => {
  const result = Math.sin(value * 12.9898) * 43758.5453;
  return result - Math.floor(result);
};

function Artifact() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const points = useMemo(() => {
    const data = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      const r = 2.2 + seeded(i + 1) * 2.8;
      const a = seeded(i + 101) * Math.PI * 2;
      data[i * 3] = Math.cos(a) * r;
      data[i * 3 + 1] = (seeded(i + 211) - 0.5) * 6;
      data[i * 3 + 2] = Math.sin(a) * r;
    }
    return data;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.12 + pointer.x * 0.15;
    group.current.rotation.x = pointer.y * 0.08;
    if (core.current) core.current.rotation.z = -clock.elapsedTime * 0.09;
  });

  return (
    <group ref={group} rotation={[0.16, -0.5, -0.08]}>
      <Float speed={1.25} rotationIntensity={0.22} floatIntensity={0.38}>
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[1.58, 2]} />
          <meshStandardMaterial color="#11110f" metalness={0.84} roughness={0.2} />
        </mesh>
        <mesh ref={core} scale={1.012}>
          <icosahedronGeometry args={[1.58, 2]} />
          <meshBasicMaterial color="#d6ad68" wireframe transparent opacity={0.68} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.2, 0.3]}>
          <torusGeometry args={[2.25, 0.035, 10, 180]} />
          <meshStandardMaterial color="#f4d18c" emissive="#a46e25" emissiveIntensity={2} metalness={1} roughness={0.18} />
        </mesh>
        <mesh rotation={[0.45, 1.12, 0.1]}>
          <torusGeometry args={[1.95, 0.018, 8, 160]} />
          <meshStandardMaterial color="#8e7041" emissive="#6d4515" emissiveIntensity={1.3} />
        </mesh>
        <mesh position={[0, 0, -0.25]} scale={0.72}>
          <sphereGeometry args={[1, 48, 48]} />
          <MeshTransmissionMaterial color="#d3a654" thickness={0.5} roughness={0.18} transmission={0.82} chromaticAberration={0.05} />
        </mesh>
      </Float>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#d7b06e" size={0.024} transparent opacity={0.55} sizeAttenuation />
      </points>
    </group>
  );
}

export default function ForgeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7.5], fov: 36 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 4, 5]} intensity={2.8} color="#fff3db" castShadow />
      <pointLight position={[-3, -1, 3]} intensity={35} distance={8} color="#bc7827" />
      <pointLight position={[2, 3, -2]} intensity={20} distance={7} color="#e8c78a" />
      <Artifact />
    </Canvas>
  );
}
