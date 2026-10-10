"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

/**
 * OE BUSINESS digital sculpture.
 * A polished titanium core held by three parallel orbital rings —
 * an architectural echo of the Ξ monogram — crossed by one wide halo.
 * Values: evolution, connection, precision, forward vision.
 */
export default function OrbitalObject() {
  const root = useRef<THREE.Group>(null);
  const ringAsm = useRef<THREE.Group>(null);
  const satellite = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const { size } = useThree();

  const icoGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.18, 1), []);
  useEffect(() => () => icoGeometry.dispose(), [icoGeometry]);

  useFrame((state, delta) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;

    if (root.current) {
      root.current.rotation.y += delta * 0.06;
      // soft pointer parallax (overridden each frame, no accumulation)
      root.current.rotation.x = THREE.MathUtils.lerp(
        root.current.rotation.x,
        state.pointer.y * 0.1,
        0.035,
      );
      root.current.rotation.z = THREE.MathUtils.lerp(
        root.current.rotation.z,
        state.pointer.x * 0.05,
        0.035,
      );
    }
    if (ringAsm.current) {
      ringAsm.current.rotation.z = Math.sin(t * 0.12) * 0.055;
    }
    if (satellite.current) {
      satellite.current.rotation.z += delta * 0.22;
    }
  });

  const narrow = size.width < 768;
  const position: [number, number, number] = narrow
    ? [0, 1.05, 0]
    : [1.55, -0.15, 0];
  const scale = narrow ? 0.6 : 0.95;

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 6, 6]} intensity={1.8} color="#f4f6f8" />
      <directionalLight position={[0, 3, 9]} intensity={0.7} color="#e8ecf1" />
      <pointLight
        position={[-6, -2.5, -4]}
        intensity={55}
        distance={26}
        decay={2}
        color="#8bafff"
      />

      {/* Local, network-free studio environment (drei Lightformers) */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#141619"]} />
        <Lightformer
          form="rect"
          intensity={6}
          position={[0, 4, -6]}
          scale={[6, 1.2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={4}
          position={[-5, 1, 1]}
          rotation-y={Math.PI / 2}
          scale={[5, 0.8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[5, -1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[5, 0.8, 1]}
        />
        <Lightformer
          form="circle"
          intensity={6}
          position={[0, 0, 6]}
          scale={1.6}
        />
      </Environment>

      <group position={position} scale={scale}>
        {reduced ? (
          <Sculpture icoGeometry={icoGeometry} />
        ) : (
          <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.45}>
            <Sculpture
              rootRef={root}
              ringAsmRef={ringAsm}
              satelliteRef={satellite}
              icoGeometry={icoGeometry}
            />
          </Float>
        )}
      </group>
    </>
  );
}

interface SculptureProps {
  rootRef?: React.RefObject<THREE.Group | null>;
  ringAsmRef?: React.RefObject<THREE.Group | null>;
  satelliteRef?: React.RefObject<THREE.Group | null>;
  icoGeometry?: THREE.BufferGeometry;
}

function Sculpture({
  rootRef,
  ringAsmRef,
  satelliteRef,
  icoGeometry,
}: SculptureProps) {
  return (
    <group ref={rootRef}>
      {/* polished titanium core */}
      <mesh>
        <sphereGeometry args={[0.92, 64, 64]} />
        <meshPhysicalMaterial
          color="#c3c9d2"
          metalness={0.9}
          roughness={0.18}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
          envMapIntensity={1.9}
        />
      </mesh>

      {/* faceted architectural shell (geodesic edges) */}
      <lineSegments rotation={[0.4, 0.2, 0]}>
        <edgesGeometry args={icoGeometry ? [icoGeometry] : undefined} />
        <lineBasicMaterial color="#8b93a0" transparent opacity={0.26} />
      </lineSegments>

      {/* three parallel orbital rings — the Ξ signature */}
      <group ref={ringAsmRef} rotation={[0.42, 0, 0.18]}>
        {[-0.62, 0, 0.62].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[1.45, 0.014, 16, 200]} />
            <meshStandardMaterial
              color="#c9ced6"
              metalness={1}
              roughness={0.28}
              envMapIntensity={1.8}
            />
          </mesh>
        ))}
        {/* satellite bead orbiting the central ring */}
        <group ref={satelliteRef}>
          <mesh position={[1.45, 0, 0]}>
            <sphereGeometry args={[0.045, 24, 24]} />
            <meshStandardMaterial
              color="#e8ecf1"
              metalness={0.9}
              roughness={0.2}
              emissive="#8bafff"
              emissiveIntensity={0.35}
            />
          </mesh>
        </group>
      </group>

      {/* wide crossing halo for depth */}
      <mesh rotation={[1.2, 0.35, 0]}>
        <torusGeometry args={[2.1, 0.008, 12, 220]} />
        <meshStandardMaterial
          color="#6b727d"
          metalness={1}
          roughness={0.35}
          envMapIntensity={1.1}
        />
      </mesh>
    </group>
  );
}
