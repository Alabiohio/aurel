import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  createBrushedBronzeTexture,
  createLabelTexture,
} from './bottleTextures';

interface PerfumeBottleModelProps {
  isSoftwareGl: boolean;
  isMobile: boolean;
  isLowPower: boolean;
  enableMouseTracking?: boolean;
  autoRotateSpeed?: number;
  reduceMotion?: boolean;
  dragRotationYRef: React.MutableRefObject<number>;
}

export function PerfumeBottleModel({
  isSoftwareGl,
  isMobile,
  isLowPower,
  enableMouseTracking = true,
  autoRotateSpeed = 0.18,
  reduceMotion = false,
  dragRotationYRef,
}: PerfumeBottleModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { gl, pointer } = useThree();
  const radialSegments = isMobile ? 40 : 64;

  const {
    outerBottleGeo,
    thickBaseGeo,
    liquidGeo,
    dipTubeGeo,
    collarGeo,
    capGeo,
    crownRingGeo,
    labelGeo,
    labelTex,
    bronzeTex,
  } = useMemo(() => {
    const anisotropy = Math.min(
      gl.capabilities.getMaxAnisotropy?.() || 4,
      isMobile ? 4 : 8
    );
    const lTex = createLabelTexture(anisotropy);
    const bTex = createBrushedBronzeTexture(anisotropy);

    // 1. Outer sculpted amber glass bottle silhouette (grounded pivot at y = 0)
    const outerPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.76, 0.0),
      new THREE.Vector2(0.84, 0.04),
      new THREE.Vector2(0.88, 0.14),
      new THREE.Vector2(0.91, 0.45),
      new THREE.Vector2(0.92, 1.15),
      new THREE.Vector2(0.89, 1.58),
      new THREE.Vector2(0.81, 1.82),
      new THREE.Vector2(0.66, 1.98),
      new THREE.Vector2(0.45, 2.08),
      new THREE.Vector2(0.32, 2.13),
      new THREE.Vector2(0.30, 2.24),
      new THREE.Vector2(0.30, 2.38),
      new THREE.Vector2(0.24, 2.38),
    ];
    const outerBottle = new THREE.LatheGeometry(outerPoints, radialSegments);
    outerBottle.computeVertexNormals();

    // 2. Heavy solid glass base punt cushion
    const basePoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, 0.03),
      new THREE.Vector2(0.73, 0.03),
      new THREE.Vector2(0.78, 0.09),
      new THREE.Vector2(0.79, 0.22),
      new THREE.Vector2(0.55, 0.27),
      new THREE.Vector2(0.0, 0.28),
    ];
    const thickBase = new THREE.LatheGeometry(basePoints, radialSegments);
    thickBase.computeVertexNormals();

    // 3. Inner amber perfume liquid volume with realistic meniscus
    const liquidPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, 0.29),
      new THREE.Vector2(0.77, 0.29),
      new THREE.Vector2(0.81, 0.45),
      new THREE.Vector2(0.82, 1.15),
      new THREE.Vector2(0.79, 1.56),
      new THREE.Vector2(0.73, 1.72),
      new THREE.Vector2(0.68, 1.73),
      new THREE.Vector2(0.35, 1.70),
      new THREE.Vector2(0.0, 1.69),
    ];
    const liquid = new THREE.LatheGeometry(liquidPoints, radialSegments);
    liquid.computeVertexNormals();

    // 4. Curved internal gold atomizer dip tube
    const tubeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.18, 0),
      new THREE.Vector3(0.03, 1.55, 0.02),
      new THREE.Vector3(0.14, 0.92, 0.07),
      new THREE.Vector3(0.42, 0.34, 0.16),
    ]);
    const dipTube = new THREE.TubeGeometry(tubeCurve, 28, 0.022, 10, false);

    // 5. Machined bronze neck collar
    const collarPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.25, 2.10),
      new THREE.Vector2(0.39, 2.10),
      new THREE.Vector2(0.41, 2.13),
      new THREE.Vector2(0.41, 2.26),
      new THREE.Vector2(0.36, 2.30),
      new THREE.Vector2(0.35, 2.40),
      new THREE.Vector2(0.24, 2.40),
    ];
    const collar = new THREE.LatheGeometry(collarPoints, radialSegments);
    collar.computeVertexNormals();

    // 6. Heavy brushed bronze cylindrical cap with beveled crown
    const capPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.28, 2.28),
      new THREE.Vector2(0.51, 2.28),
      new THREE.Vector2(0.53, 2.31),
      new THREE.Vector2(0.53, 2.94),
      new THREE.Vector2(0.50, 2.98),
      new THREE.Vector2(0.46, 3.00),
      new THREE.Vector2(0.0, 3.00),
    ];
    const cap = new THREE.LatheGeometry(capPoints, radialSegments);
    cap.computeVertexNormals();

    // 7. Recessed crown brass medallion ring
    const crownRing = new THREE.CylinderGeometry(0.34, 0.34, 0.015, radialSegments);

    // 8. Curved textured cotton front label hugging the cylindrical belly
    const arcAngle = Math.PI * 0.44;
    const label = new THREE.CylinderGeometry(
      0.926,
      0.926,
      0.96,
      32,
      1,
      true,
      -arcAngle / 2,
      arcAngle
    );

    return {
      outerBottleGeo: outerBottle,
      thickBaseGeo: thickBase,
      liquidGeo: liquid,
      dipTubeGeo: dipTube,
      collarGeo: collar,
      capGeo: cap,
      crownRingGeo: crownRing,
      labelGeo: label,
      labelTex: lTex,
      bronzeTex: bTex,
    };
  }, [gl, radialSegments]);

  useEffect(() => {
    return () => {
      outerBottleGeo.dispose();
      thickBaseGeo.dispose();
      liquidGeo.dispose();
      dipTubeGeo.dispose();
      collarGeo.dispose();
      capGeo.dispose();
      crownRingGeo.dispose();
      labelGeo.dispose();
      labelTex.dispose();
      bronzeTex.dispose();
    };
  }, [
    outerBottleGeo,
    thickBaseGeo,
    liquidGeo,
    dipTubeGeo,
    collarGeo,
    capGeo,
    crownRingGeo,
    labelGeo,
    labelTex,
    bronzeTex,
  ]);

  const autoAngleRef = useRef(0.22);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const clampedDelta = Math.min(delta, 0.1);
    autoAngleRef.current += clampedDelta * autoRotateSpeed;

    // Gentle hover float on Y (compositor-smooth)
    const targetFloatY = reduceMotion
      ? -1.52
      : Math.sin(state.clock.elapsedTime * 0.85) * 0.045 - 1.52;
    group.position.y = THREE.MathUtils.damp(group.position.y, targetFloatY, 4, clampedDelta);

    // Subtle mouse-responsive tilt and rotational parallax
    const targetTiltX = enableMouseTracking ? -pointer.y * 0.14 : 0;
    const targetTiltZ = enableMouseTracking ? -pointer.x * 0.08 : 0;
    const pointerYawOffset = enableMouseTracking ? pointer.x * 0.32 : 0;

    const targetYaw = autoAngleRef.current + dragRotationYRef.current + pointerYawOffset;

    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetTiltX, 4.5, clampedDelta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetTiltZ, 4.5, clampedDelta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetYaw, 5, clampedDelta);
  });

  return (
    <group ref={groupRef} position={[0, -1.52, 0]}>
      {/* 1. Outer Amber Glass Body */}
      <mesh
        geometry={outerBottleGeo}
        castShadow={!isLowPower}
        receiveShadow={!isLowPower}
        renderOrder={2}
      >
        <meshPhysicalMaterial
          color="#a35b18"
          roughness={0.07}
          metalness={0.0}
          ior={1.53}
          thickness={1.4}
          attenuationColor="#5c2804"
          attenuationDistance={1.15}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={1.65}
          transmission={isSoftwareGl ? 0 : isLowPower ? 0.62 : 0.9}
          transparent
          opacity={isSoftwareGl ? 0.56 : 1}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Solid Glass Base Cushion */}
      <mesh geometry={thickBaseGeo} renderOrder={1}>
        <meshPhysicalMaterial
          color="#7d410c"
          roughness={0.12}
          metalness={0.05}
          clearcoat={1.0}
          envMapIntensity={1.5}
          transparent
          opacity={0.78}
        />
      </mesh>

      {/* 3. Interior Amber Perfume Liquid Volume */}
      <mesh geometry={liquidGeo} renderOrder={1}>
        <meshPhysicalMaterial
          color="#cf7c22"
          emissive="#4a2204"
          emissiveIntensity={0.28}
          roughness={0.08}
          metalness={0.02}
          clearcoat={0.9}
          envMapIntensity={1.35}
          transparent
          opacity={0.86}
        />
      </mesh>

      {/* 4. Internal Gold Atomizer Dip Tube */}
      <mesh geometry={dipTubeGeo} renderOrder={1}>
        <meshStandardMaterial
          color="#d9ad6c"
          metalness={0.92}
          roughness={0.22}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* 5. Curved Cream Cotton Front Label */}
      <mesh
        geometry={labelGeo}
        position={[0, 0.96, 0]}
        renderOrder={3}
      >
        <meshStandardMaterial
          map={labelTex}
          roughness={0.84}
          metalness={0.04}
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </mesh>

      {/* 6. Machined Bronze Neck Collar */}
      <mesh geometry={collarGeo} castShadow={!isLowPower}>
        <meshStandardMaterial
          color="#b58a55"
          metalness={0.94}
          roughness={0.22}
          bumpMap={bronzeTex}
          bumpScale={0.004}
          envMapIntensity={1.3}
        />
      </mesh>

      {/* 7. Heavy Brushed Bronze Cap */}
      <mesh geometry={capGeo} castShadow={!isLowPower} receiveShadow={!isLowPower}>
        <meshPhysicalMaterial
          color="#b88d58"
          metalness={0.94}
          roughness={0.26}
          anisotropy={0.8}
          bumpMap={bronzeTex}
          bumpScale={0.006}
          roughnessMap={bronzeTex}
          envMapIntensity={1.45}
        />
      </mesh>

      {/* 8. Crown Satin Gold Medallion */}
      <mesh geometry={crownRingGeo} position={[0, 3.002, 0]}>
        <meshStandardMaterial
          color="#d2a56b"
          metalness={0.96}
          roughness={0.14}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>
    </group>
  );
}
