"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  RoundedBox,
  ContactShadows,
} from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
function Razor() {
  const ref = useRef<Group>(null);
  useFrame(({ pointer }) => {
    if (ref.current) {
      ref.current.rotation.y +=
        (pointer.x * 0.2 - ref.current.rotation.y) * 0.025;
      ref.current.rotation.x +=
        (pointer.y * 0.1 - ref.current.rotation.x) * 0.025;
    }
  });
  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={ref} rotation={[0, 0, -0.5]}>
        <RoundedBox
          args={[3.4, 0.7, 0.09]}
          radius={0.09}
          position={[-0.65, 0.4, 0]}
        >
          <meshStandardMaterial
            color="#d9d9d9"
            metalness={1}
            roughness={0.16}
          />
        </RoundedBox>
        <RoundedBox
          args={[3.6, 0.48, 0.2]}
          radius={0.18}
          position={[1.05, -0.42, 0]}
          rotation={[0, 0, -0.4]}
        >
          <meshStandardMaterial
            color="#141414"
            metalness={0.65}
            roughness={0.2}
          />
        </RoundedBox>
        <mesh position={[-0.6, -0.03, 0.12]}>
          <cylinderGeometry args={[0.11, 0.11, 0.05, 32]} />
          <meshStandardMaterial color="white" metalness={1} roughness={0.12} />
        </mesh>
      </group>
    </Float>
  );
}
export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 40 }}
      aria-label="Navalha tridimensional com reflexos de estúdio"
    >
      <ambientLight intensity={0.35} />
      <spotLight position={[2, 5, 5]} intensity={35} />
      <Razor />
      <Environment resolution={128}>
        <Lightformer intensity={4} position={[0, 3, 2]} scale={[8, 2, 1]} />
        <Lightformer intensity={2} position={[-4, 0, 2]} scale={[2, 8, 1]} />
      </Environment>
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.45}
        scale={12}
        blur={2.5}
        far={5}
      />
    </Canvas>
  );
}
