"use client";
import { useMemo, useRef, useEffect, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import {
  DataTexture,
  RGBAFormat,
  RepeatWrapping,
  Shape,
  Vector3,
  type Group,
} from "three";
export type ProductSceneProps = {
  progress: RefObject<number>;
  drag: RefObject<{ x: number; y: number }>;
  detail: number;
};
function Clipper({ progress, drag, detail }: ProductSceneProps) {
  const group = useRef<Group>(null);
  const shell = useMemo(() => {
    const s = new Shape();
    s.moveTo(-0.43, -1.5);
    s.bezierCurveTo(-0.75, -1.3, -0.68, -0.5, -0.63, 0.1);
    s.lineTo(-0.65, 1.25);
    s.quadraticCurveTo(-0.65, 1.5, -0.4, 1.5);
    s.lineTo(0.4, 1.5);
    s.quadraticCurveTo(0.65, 1.5, 0.65, 1.25);
    s.lineTo(0.63, 0.1);
    s.bezierCurveTo(0.68, -0.5, 0.75, -1.3, 0.43, -1.5);
    s.quadraticCurveTo(0, -1.72, -0.43, -1.5);
    return s;
  }, []);
  const brushed = useMemo(() => {
    const width = 128,
      height = 128,
      data = new Uint8Array(width * height * 4);
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const value =
          155 + Math.sin(y * 2.1) * 24 + Math.sin(x * 0.18 + y * 0.1) * 8;
        data[i] = data[i + 1] = data[i + 2] = value;
        data[i + 3] = 255;
      }
    const texture = new DataTexture(data, width, height, RGBAFormat);
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(1, 3);
    texture.needsUpdate = true;
    return texture;
  }, []);
  useEffect(() => () => brushed.dispose(), [brushed]);
  const aim = useMemo(() => new Vector3(), []);
  const eye = useMemo(() => new Vector3(), []);
  const target = useMemo(() => new Vector3(), []);
  useFrame(({ pointer, clock, camera }, delta) => {
    if (!group.current) return;
    const p = progress.current;
    const amount = 1 - Math.exp(-delta * 4);
    group.current.rotation.y +=
      (0.22 +
        p * 1.3 +
        Math.sin(clock.elapsedTime * 0.19) * 0.13 +
        pointer.x * 0.12 +
        drag.current.y -
        group.current.rotation.y) *
      amount;
    group.current.rotation.x +=
      (-0.1 + pointer.y * 0.1 + drag.current.x - group.current.rotation.x) *
      amount;
    group.current.rotation.z +=
      (-0.28 + p * 0.18 - group.current.rotation.z) * amount;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.04;
    eye.set(
      detail === 0 ? 0.35 : 0,
      detail === 0 ? 0.45 : 0,
      detail < 0 ? 7.1 - p * 0.7 : 5.7,
    );
    camera.position.lerp(eye, amount);
    target.set(0, detail === 0 ? 0.8 : detail === 2 ? -0.4 : 0, 0);
    aim.lerp(target, amount);
    camera.lookAt(aim);
  });
  return (
    <group ref={group} rotation={[-0.1, 0.25, -0.28]}>
      <mesh position={[0, 0, -0.26]}>
        <extrudeGeometry
          args={[
            shell,
            {
              depth: 0.42,
              bevelEnabled: true,
              bevelSize: 0.12,
              bevelThickness: 0.1,
              bevelSegments: 5,
              steps: 1,
              curveSegments: 24,
            },
          ]}
        />
        <meshPhysicalMaterial
          color="#d9d9d9"
          metalness={0.96}
          roughness={0.3}
          roughnessMap={brushed}
          clearcoat={0.5}
        />
      </mesh>
      <RoundedBox
        args={[1.12, 2.9, 0.22]}
        radius={0.23}
        position={[0, -0.04, -0.25]}
      >
        <meshStandardMaterial
          color="#222222"
          metalness={0.65}
          roughness={0.3}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.78, 1.55, 0.045]}
        radius={0.17}
        position={[0, -0.48, 0.285]}
      >
        <meshPhysicalMaterial
          color="#222222"
          metalness={0.45}
          roughness={0.28}
          clearcoat={1}
        />
      </RoundedBox>
      {Array.from({ length: 15 }, (_, i) => (
        <mesh key={`grip-${i}`} position={[0, -1.1 + i * 0.08, 0.315]}>
          <boxGeometry args={[0.56, 0.014, 0.015]} />
          <meshStandardMaterial
            color="#777777"
            metalness={0.7}
            roughness={0.38}
          />
        </mesh>
      ))}
      <RoundedBox
        args={[1.42, 0.38, 0.44]}
        radius={0.045}
        position={[0, 1.54, 0.06]}
      >
        <meshStandardMaterial color="#777777" metalness={1} roughness={0.2} />
      </RoundedBox>
      <RoundedBox
        args={[1.5, 0.14, 0.58]}
        radius={0.02}
        position={[0, 1.77, 0.02]}
      >
        <meshPhysicalMaterial color="#eaeaea" metalness={1} roughness={0.16} />
      </RoundedBox>
      {Array.from({ length: 24 }, (_, i) => (
        <mesh key={`tooth-${i}`} position={[-0.71 + i * 0.0617, 1.94, 0.16]}>
          <boxGeometry args={[0.027, 0.24, 0.16]} />
          <meshStandardMaterial
            color="#eaeaea"
            metalness={1}
            roughness={0.18}
          />
        </mesh>
      ))}
      {[-0.42, 0.42].map((x) => (
        <group key={x} position={[x, 1.48, 0.3]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.035, 32]} />
            <meshStandardMaterial
              color="#eaeaea"
              metalness={1}
              roughness={0.16}
            />
          </mesh>
          <mesh position={[0, 0, 0.022]} rotation={[0, 0, 0.5]}>
            <boxGeometry args={[0.09, 0.012, 0.01]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        </group>
      ))}
      <RoundedBox
        args={[0.26, 0.56, 0.07]}
        radius={0.08}
        position={[0, 0.45, 0.29]}
      >
        <meshStandardMaterial
          color="#222222"
          metalness={0.5}
          roughness={0.28}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.17, 0.26, 0.065]}
        radius={0.04}
        position={[0, 0.55, 0.35]}
      >
        <meshStandardMaterial color="#eaeaea" metalness={1} roughness={0.22} />
      </RoundedBox>
      <mesh position={[-0.79, 0.62, 0]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.16, 0.55, 0.12]} />
        <meshStandardMaterial color="#777777" metalness={1} roughness={0.23} />
      </mesh>
      <mesh position={[0, -1.69, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.045, 16, 32]} />
        <meshStandardMaterial color="#777777" metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
}
export default function Scene(props: ProductSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.1], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
      aria-label="Máquina de cortar cabelo cromada, modelo procedural interativo"
    >
      <ambientLight intensity={0.7} />
      <spotLight position={[-3, 4, 6]} intensity={28} penumbra={1} />
      <Clipper {...props} />
      <Environment resolution={128}>
        <Lightformer intensity={1.6} position={[0, 0, 5]} scale={[5, 7, 1]} />
        <Lightformer intensity={4} position={[-4, 2, 2]} scale={[1, 7, 1]} />
        <Lightformer intensity={2} position={[4, 1, 1]} scale={[2, 7, 1]} />
        <Lightformer intensity={3} position={[0, 4, -2]} scale={[7, 1, 1]} />
      </Environment>
      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.16}
        blur={3}
        scale={9}
        far={5}
        frames={1}
      />
    </Canvas>
  );
}
