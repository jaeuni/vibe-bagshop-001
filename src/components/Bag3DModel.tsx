import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Bag3DModelProps {
  color: string;
}

export default function Bag3DModel({ color }: Bag3DModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // 부드러운 자전(회전) 애니메이션 및 위아래로 둥실둥실 떠 있는 듯한 효과 추가
  useFrame((state) => {
    if (groupRef.current) {
      // 아주 천천히 자동 회전
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      // 상하 미세 부유 운동
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.08 - 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.4, 1.4, 1.4]} castShadow receiveShadow>
      {/* 1. 가방 몸체 (Main Body) */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 1.0, 0.6, 8, 8, 8]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.1}
          bumpScale={0.02}
        />
      </mesh>

      {/* 1-2. 가방 앞면 장식 플랩 (Front Flap Cover) */}
      <mesh position={[0, 0.42, 0.31]} castShadow>
        <boxGeometry args={[1.54, 0.6, 0.04]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* 2. 가방 밑창/베이스 (Base) */}
      <mesh position={[0, -0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.64, 0.1, 0.64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>

      {/* 3. 명품 가죽 측면 가젯 (Sides Panel Accordion effect) */}
      <mesh position={[-0.81, 0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.56, 0.94, 0.04]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0.81, 0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.56, 0.94, 0.04]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* 4. 골드 버클 및 로고 플레이트 (Gold Buckle & Logo Plate) */}
      {/* 금속판 백킹 */}
      <mesh position={[0, 0.25, 0.34]} castShadow>
        <boxGeometry args={[0.22, 0.12, 0.02]} />
        <meshStandardMaterial
          color="#E5C158"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      {/* 금속 자물쇠 고리 */}
      <mesh position={[0, 0.20, 0.36]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.06, 16]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={1.0}
          roughness={0.1}
        />
      </mesh>

      {/* 5. 가죽 핸들 / 손잡이 (Round Handles x 2) */}
      {/* 앞쪽 손잡이 */}
      <mesh position={[0, 1.0, 0.15]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.35, 0.05, 16, 100, Math.PI]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>
      {/* 뒤쪽 손잡이 */}
      <mesh position={[0, 1.0, -0.15]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.35, 0.05, 16, 100, Math.PI]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* 6. 손잡이 골드 고정 고리 (Handle gold rings) */}
      {/* 앞쪽 왼쪽 고리 */}
      <mesh position={[-0.35, 0.9, 0.15]} rotation={[0, Math.PI/2, 0]} castShadow>
        <torusGeometry args={[0.07, 0.02, 8, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* 앞쪽 오른쪽 고리 */}
      <mesh position={[0.35, 0.9, 0.15]} rotation={[0, Math.PI/2, 0]} castShadow>
        <torusGeometry args={[0.07, 0.02, 8, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* 뒤쪽 왼쪽 고리 */}
      <mesh position={[-0.35, 0.9, -0.15]} rotation={[0, Math.PI/2, 0]} castShadow>
        <torusGeometry args={[0.07, 0.02, 8, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* 뒤쪽 오른쪽 고리 */}
      <mesh position={[0.35, 0.9, -0.15]} rotation={[0, Math.PI/2, 0]} castShadow>
        <torusGeometry args={[0.07, 0.02, 8, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* 7. 명품 숄더 가죽 체인 스트랩 힌지 (Strap D-Rings on side) */}
      <mesh position={[-0.82, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.08, 0.02, 8, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.1} />
      </mesh>
      <mesh position={[0.82, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.08, 0.02, 8, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.1} />
      </mesh>
    </group>
  );
}
