import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PawScene = ({ scrollProgress = 0 }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const pointerX = state.pointer.x; // Normalized mouse X (-1 to 1)
    const pointerY = state.pointer.y; // Normalized mouse Y (-1 to 1)

    // Interactive 3D tilt tracking mouse + natural idle rotation
    const targetRotY = pointerX * 0.45 + time * 0.2 + scrollProgress * Math.PI * 0.4;
    const targetRotX = -pointerY * 0.35 + Math.sin(time * 0.4) * 0.08 + scrollProgress * 0.2;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.rotation.z = Math.cos(time * 0.3) * 0.03;

    // Gentle floating bobbing
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.08;

    // Subtle scale response on scroll
    const scale = (1 - scrollProgress * 0.3) * 0.85;
    groupRef.current.scale.setScalar(Math.max(scale, 0.25));
  });

  const mainPadShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.6);
    shape.bezierCurveTo(0.8, -0.6, 1.1, 0.1, 0.7, 0.6);
    shape.bezierCurveTo(0.4, 1.0, 0, 0.8, 0, 0.8);
    shape.bezierCurveTo(0, 0.8, -0.4, 1.0, -0.7, 0.6);
    shape.bezierCurveTo(-1.1, 0.1, -0.8, -0.6, 0, -0.6);
    return shape;
  }, []);

  const extrudeSettings = {
    steps: 2,
    depth: 0.28,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 8,
  };

  const toePositions = [
    [-0.55, 1.15, 0],
    [-0.18, 1.45, 0],
    [0.18, 1.45, 0],
    [0.55, 1.15, 0],
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Symmetrical center origin offset */}
      <group position={[0, -0.45, 0]}>
        {/* Main Pad */}
        <mesh position={[0, -0.3, -0.14]} castShadow receiveShadow>
          <extrudeGeometry args={[mainPadShape, extrudeSettings]} />
          <meshPhysicalMaterial
            color="#E85826"
            emissive="#B53B10"
            emissiveIntensity={0.14}
            roughness={0.22}
            metalness={0.12}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.8}
          />
        </mesh>

        {/* Toe Pads */}
        {toePositions.map((pos, i) => (
          <mesh key={i} position={pos} castShadow receiveShadow>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshPhysicalMaterial
              color="#E85826"
              emissive="#B53B10"
              emissiveIntensity={0.14}
              roughness={0.22}
              metalness={0.12}
              clearcoat={1.0}
              clearcoatRoughness={0.08}
              reflectivity={0.8}
            />
          </mesh>
        ))}

        {/* Soft Warm Glow Behind the Model */}
        <mesh position={[0, 0.4, -0.2]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial
            color="#FFA366"
            transparent
            opacity={0.06}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  );
};

export default PawScene;
