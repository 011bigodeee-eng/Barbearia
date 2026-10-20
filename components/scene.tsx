"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  RoundedBox,
  ContactShadows,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Shape, type Group } from "three";
function Razor() {
  const ref = useRef<Group>(null);
  const blade = useMemo(() => {
    const s = new Shape();
    s.moveTo(-2.45, -0.12);
    s.lineTo(-2.45, 0.55);
    s.quadraticCurveTo(-2.45, 0.75, -2.2, 0.75);
    s.lineTo(0.35, 0.75);
    s.quadraticCurveTo(0.65, 0.75, 0.65, 0.45);
    s.lineTo(0.65, 0.12);
    s.lineTo(-1.8, -0.12);
    s.closePath();
    return s;
  }, []);
  useFrame(({ pointer, clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y +=
      (pointer.x * 0.25 - ref.current.rotation.y) * 0.025;
    ref.current.rotation.x +=
      (pointer.y * 0.12 - 0.1 - ref.current.rotation.x) * 0.025;
    ref.current.position.y = Math.sin(t * 0.45) * 0.045;
  });
  return (
    <group ref={ref} rotation={[-0.1, 0, -0.3]}>
      <mesh position={[-0.1, 0.15, 0]}>
        <extrudeGeometry
          args={[
            blade,
            {
              depth: 0.06,
              bevelEnabled: true,
              bevelSegments: 3,
              steps: 1,
              bevelSize: 0.025,
              bevelThickness: 0.025,
            },
          ]}
        />
        <meshPhysicalMaterial
          color="#d9d9d9"
          metalness={0.94}
          roughness={0.22}
          clearcoat={0.5}
          envMapIntensity={1.2}
        />
      </mesh>
      <mesh position={[-1.15, 0.07, 0.075]} rotation={[0, 0, -0.085]}>
        <boxGeometry args={[2.6, 0.035, 0.015]} />
        <meshStandardMaterial color="#fafafa" metalness={1} roughness={0.08} />
      </mesh>
      <group position={[0.55, 0.25, 0]} rotation={[0, 0, -0.42]}>
        <RoundedBox
          args={[3.3, 0.42, 0.17]}
          radius={0.18}
          position={[0.8, -0.4, 0]}
        >
          <meshPhysicalMaterial
            color="#111111"
            metalness={0.35}
            roughness={0.24}
            clearcoat={1}
          />
        </RoundedBox>
        {[-0.5, 2.1].map((x) => (
          <mesh
            key={x}
            position={[x, -0.4, 0.105]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.055, 0.055, 0.05, 24]} />
            <meshStandardMaterial
              color="#d9d9d9"
              metalness={1}
              roughness={0.14}
            />
          </mesh>
        ))}
      </group>
      <mesh position={[0.08, 0.12, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 32]} />
        <meshStandardMaterial color="#fafafa" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}
export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.5], fov: 38 }}
      aria-label="Navalha tridimensional com lâmina metálica e iluminação de estúdio"
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <spotLight position={[2, 5, 5]} intensity={25} penumbra={1} />
      <Razor />
      <Environment resolution={128}>
        <Lightformer intensity={1.6} position={[0, 0, 5]} scale={[7, 7, 1]} />
        <Lightformer intensity={4} position={[0, 3, 2]} scale={[8, 2, 1]} />
        <Lightformer intensity={2} position={[-4, 0, 2]} scale={[2, 8, 1]} />
        <Lightformer intensity={1.5} position={[3, -2, 1]} scale={[3, 1, 1]} />
      </Environment>
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.2}
        scale={12}
        blur={3}
        far={5}
        frames={1}
      />
    </Canvas>
  );
}
