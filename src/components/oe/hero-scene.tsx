"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import OrbitalObject from "./orbital-object";
import SculptureFallback from "./sculpture-fallback";
import { EASE } from "./motion-primitives";
import { useWebGLAvailable } from "./use-webgl";

/**
 * Hero WebGL layer — fades up with the cinematic entrance.
 * Falls back to a static SVG sculpture when WebGL is unavailable.
 */
export default function HeroScene() {
  const webgl = useWebGLAvailable();

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.8, delay: 0.15, ease: EASE }}
    >
      {webgl === false ? (
        <SculptureFallback />
      ) : webgl === true ? (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 8], fov: 38 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Suspense fallback={null}>
            <OrbitalObject />
          </Suspense>
        </Canvas>
      ) : null}
    </motion.div>
  );
}
