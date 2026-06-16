import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface Bag3DModelProps {
  bodyColor: string;
  strapColor: string;
}

export default function Bag3DModel({ bodyColor, strapColor }: Bag3DModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/aurelia_caviar_bag.glb');

  // 가방 자체 색상(bodyColor)을 에셋 재질에 주입하고 디테일 입체감 극대화
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat) {
            mat.color.set(bodyColor);
            mat.roughness = 0.38;
            mat.metalness = 0.22;
            mat.needsUpdate = true;
          }
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
    }
  }, [scene, bodyColor]);

  // 자동 자전 회전 및 미세 공중 부유 모션
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.06 - 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} scale={[1.4, 1.4, 1.4]}>
      {/* 1. 오리지널 명품 가방 본체 */}
      <Center>
        <primitive object={scene} />
      </Center>

      {/* 2. 가방끈색(strapColor)에 반응하는 독립 3D 숄더 체인 스트랩 및 탑 가죽 핸들 조합 레이어 */}
      <group position={[0, -0.12, 0]}>
        
        {/* 앞쪽 명품 가죽 탑 핸들 */}
        <mesh position={[0, 0.45, 0.12]} castShadow>
          <torusGeometry args={[0.26, 0.045, 16, 100, Math.PI]} />
          <meshStandardMaterial color={strapColor} roughness={0.4} metalness={0.1} />
        </mesh>

        {/* 뒤쪽 명품 가죽 탑 핸들 */}
        <mesh position={[0, 0.45, -0.12]} castShadow>
          <torusGeometry args={[0.26, 0.045, 16, 100, Math.PI]} />
          <meshStandardMaterial color={strapColor} roughness={0.4} metalness={0.1} />
        </mesh>

        {/* 탑 핸들 18K 골드 버클 고정 링 4개 */}
        <mesh position={[-0.26, 0.43, 0.12]} rotation={[0, Math.PI * 0.5, 0]} castShadow>
          <torusGeometry args={[0.05, 0.015, 8, 24]} />
          <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.12} />
        </mesh>
        <mesh position={[0.26, 0.43, 0.12]} rotation={[0, Math.PI * 0.5, 0]} castShadow>
          <torusGeometry args={[0.05, 0.015, 8, 24]} />
          <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.12} />
        </mesh>
        <mesh position={[-0.26, 0.43, -0.12]} rotation={[0, Math.PI * 0.5, 0]} castShadow>
          <torusGeometry args={[0.05, 0.015, 8, 24]} />
          <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.12} />
        </mesh>
        <mesh position={[0.26, 0.43, -0.12]} rotation={[0, Math.PI * 0.5, 0]} castShadow>
          <torusGeometry args={[0.05, 0.015, 8, 24]} />
          <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.12} />
        </mesh>

        {/* 좌측 레더-체인 숄더 스트랩 */}
        <group position={[-0.6, 0.1, 0]}>
          <mesh position={[0, -0.22, 0.05]} rotation={[0, 0, Math.PI * 0.0833]} castShadow>
            <torusGeometry args={[0.22, 0.035, 12, 64, Math.PI * 0.9]} />
            <meshStandardMaterial color={strapColor} roughness={0.42} metalness={0.08} />
          </mesh>
          <mesh position={[0.05, -0.01, 0.05]} rotation={[Math.PI * 0.5, 0, 0]} castShadow>
            <torusGeometry args={[0.04, 0.01, 8, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.1} />
          </mesh>
        </group>

        {/* 우측 레더-체인 숄더 스트랩 */}
        <group position={[0.6, 0.1, 0]}>
          <mesh position={[0, -0.22, 0.05]} rotation={[0, 0, -Math.PI * 0.0833]} castShadow>
            <torusGeometry args={[0.22, 0.035, 12, 64, Math.PI * 0.9]} />
            <meshStandardMaterial color={strapColor} roughness={0.42} metalness={0.08} />
          </mesh>
          <mesh position={[-0.05, -0.01, 0.05]} rotation={[Math.PI * 0.5, 0, 0]} castShadow>
            <torusGeometry args={[0.04, 0.01, 8, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.1} />
          </mesh>
        </group>

        {/* 정면 18K 하이라이트 골드 잠금 메탈 장치 버클 */}
        <group position={[0, 0.09, 0.23]}>
          <mesh castShadow>
            <boxGeometry args={[0.13, 0.08, 0.012]} />
            <meshStandardMaterial color="#F0C555" metalness={1.0} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.015, 0.01]} rotation={[Math.PI * 0.5, 0, 0]} castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.03, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.08} />
          </mesh>
        </group>

      </group>
    </group>
  );
}

useGLTF.preload('/aurelia_caviar_bag.glb');
