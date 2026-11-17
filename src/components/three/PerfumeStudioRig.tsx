import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { createCausticShadowTexture } from './bottleTextures';

interface PerfumeStudioRigProps {
  isLowPower: boolean;
}

export function PerfumeStudioRig({ isLowPower }: PerfumeStudioRigProps) {
  const { gl, scene } = useThree();

  const causticTex = useMemo(() => createCausticShadowTexture(), []);

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    scene.fog = new THREE.FogExp2('#11110F', 0.045);

    return () => {
      scene.environment = null;
      scene.fog = null;
      envTarget.dispose();
      roomEnv.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene]);

  useEffect(() => {
    if (!isLowPower) {
      RectAreaLightUniformsLib.init();
    }
  }, [isLowPower]);

  useEffect(() => () => causticTex.dispose(), [causticTex]);

  return (
    <>
      <color attach="background" args={['#11110F']} />

      {/* Warm/Cool balanced HemisphereLight fill */}
      <hemisphereLight args={['#cad6e8', '#2a1c0e', 0.55]} />

      {/* Primary Warm Key Light */}
      <directionalLight
        position={[4.2, 6.2, 4.8]}
        intensity={2.6}
        color="#ffe6c2"
        castShadow={!isLowPower}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-3.5}
        shadow-camera-right={3.5}
        shadow-camera-top={4.5}
        shadow-camera-bottom={-3.5}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />

      {/* Cool Counter-Fill Light */}
      <directionalLight
        position={[-4.5, 2.2, 2.5]}
        intensity={0.95}
        color="#a7bad6"
      />

      {/* Warm Amber Rim Backlight */}
      <spotLight
        position={[-1.8, 3.6, -4.4]}
        angle={0.58}
        penumbra={0.85}
        intensity={38}
        distance={16}
        decay={2}
        color="#d9923b"
      />

      {/* Studio Softboxes (Hardware GPU only) */}
      {!isLowPower && (
        <>
          <rectAreaLight
            position={[3.6, 1.4, 2.4]}
            width={1.2}
            height={4.8}
            intensity={4.5}
            color="#fff0d8"
            onUpdate={(self) => self.lookAt(0, 0.2, 0)}
          />
          <rectAreaLight
            position={[-3.6, 1.2, -1.2]}
            width={1.0}
            height={4.5}
            intensity={3.2}
            color="#e8b878"
            onUpdate={(self) => self.lookAt(0, 0.2, 0)}
          />
        </>
      )}

      {/* Grounded Studio Surface & Refracted Amber Caustic Shadow */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.62, 0]}
        receiveShadow={!isLowPower}
      >
        <circleGeometry args={[9, 48]} />
        <meshStandardMaterial
          color="#11110F"
          roughness={0.82}
          metalness={0.12}
        />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.59, 0]}
        renderOrder={0}
      >
        <planeGeometry args={[4.4, 4.4]} />
        <meshBasicMaterial
          map={causticTex}
          transparent
          depthWrite={false}
          opacity={isLowPower ? 0.45 : 0.92}
        />
      </mesh>
    </>
  );
}
