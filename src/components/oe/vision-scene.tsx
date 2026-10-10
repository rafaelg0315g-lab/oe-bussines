"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useWebGLAvailable, prefersReducedMotion } from "./use-webgl";

/**
 * Vision chapter — a monumental horizon: a giant ring seen almost
 * edge-on around a dark monolith core. Mounted lazily when the
 * section approaches the viewport (deferred 3D payload).
 */
function HorizonObject() {
  const root = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (root.current && !prefersReducedMotion()) {
      root.current.rotation.y += delta * 0.045;
    }
  });

  return (
    <group ref={root}>
      {/* the near horizon ring */}
      <mesh rotation={[Math.PI / 2 - 0.16, 0, 0]}>
        <torusGeometry args={[2.6, 0.013, 12, 220]} />
        <meshStandardMaterial
          color="#b9c0c9"
          metalness={1}
          roughness={0.3}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* a distant, fainter ring — depth of field */}
      <mesh rotation={[Math.PI / 2 - 0.05, 0, 0]} scale={1.38}>
        <torusGeometry args={[2.6, 0.006, 10, 220]} />
        <meshStandardMaterial
          color="#565c66"
          metalness={1}
          roughness={0.4}
          envMapIntensity={1}
        />
      </mesh>

      {/* dark titanium monolith core */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.85, 48, 48]} />
        <meshPhysicalMaterial
          color="#14171b"
          metalness={0.9}
          roughness={0.32}
          clearcoat={0.8}
          clearcoatRoughness={0.25}
          envMapIntensity={1.1}
        />
      </mesh>
    </group>
  );
}

function VisionCanvas() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 1.6, 9], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <fog attach="fog" args={["#070809", 10, 20]} />
      <ambientLight intensity={0.16} />
      <directionalLight position={[4, 8, 6]} intensity={1.3} color="#f4f6f8" />
      <pointLight
        position={[-8, 0.5, -2]}
        intensity={45}
        distance={30}
        decay={2}
        color="#8bafff"
      />
      <Environment resolution={128} frames={1}>
        <color attach="background" args={["#0a0b0d"]} />
        <Lightformer
          form="rect"
          intensity={4}
          position={[0, 3, -6]}
          scale={[7, 0.8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2}
          position={[-5, 0, 1]}
          rotation-y={Math.PI / 2}
          scale={[6, 0.6, 1]}
        />
        <Lightformer
          form="circle"
          intensity={3}
          position={[0, 0, 6]}
          scale={1.4}
        />
      </Environment>
      <group position={[0, -1.55, 0]} scale={1.5}>
        <HorizonObject />
      </group>
    </Canvas>
  );
}

/** SVG horizon fallback (no WebGL). */
function VisionFallback() {
  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2">
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="oe-horizon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b9c0c9" stopOpacity="0" />
            <stop offset="50%" stopColor="#b9c0c9" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#b9c0c9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse
          cx="600"
          cy="400"
          rx="560"
          ry="120"
          stroke="url(#oe-horizon)"
          strokeWidth="1.6"
        />
        <ellipse
          cx="600"
          cy="420"
          rx="760"
          ry="160"
          stroke="url(#oe-horizon)"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle cx="600" cy="330" r="110" fill="#101215" stroke="#2a2e35" />
      </svg>
    </div>
  );
}

export default function VisionScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const webgl = useWebGLAvailable();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "360px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 overflow-hidden"
    >
      {active && webgl !== false ? <VisionCanvas /> : webgl === false ? <VisionFallback /> : null}
    </div>
  );
}
