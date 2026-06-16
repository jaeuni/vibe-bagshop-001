import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface Bag3DModelProps {
  color: string;
}

export default function Bag3DModel({ color }: Bag3DModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // public/aurelia_caviar_bag.glb 로드
  const { scene } = useGLTF('/aurelia_caviar_bag.glb');

  // 색상이 변경될 때마다 3D 모델의 재질을 동적으로 분석하여 가죽 부분 색상 갱신
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat) {
            const matName = mat.name ? mat.name.toLowerCase() : '';
            
            // 금속 재질 판별 조건 (금속 마감, 지퍼, 로고 플레이트, 체인 등은 색상 변경 제외)
            const isMetal = 
              matName.includes('metal') || 
              matName.includes('gold') || 
              matName.includes('brass') || 
              matName.includes('hardware') || 
              matName.includes('zipper') || 
              matName.includes('chain') || 
              matName.includes('silver') || 
              matName.includes('chrome') || 
              matName.includes('steel') || 
              (mat.metalness !== undefined && mat.metalness > 0.7);

            if (!isMetal) {
              // 가죽 본체 재질 색상 업데이트 (명도 개선 및 실크 새틴 반사광 연출)
              mat.color.set(color);
              mat.roughness = 0.45; // 난반사를 부드럽게 유도하여 한층 밝아 보이도록 튜닝
              mat.metalness = 0.12; // 가죽 표면의 화사한 하이라이트 광택 유도
              
              // 3D 렌더러가 머티리얼 변경을 실시간 감지하도록 설정
              mat.needsUpdate = true;
            } else {
              // 금속 부자재는 고품질 골드/실버 광택 적용
              mat.metalness = 1.0;
              mat.roughness = 0.15;
              mat.needsUpdate = true;
            }
          }
          
          // 그림자 활성화
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
    }
  }, [scene, color]);

  // 천천히 자전 회전 및 공중 부유 애니메이션
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.06 - 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} scale={[1.5, 1.4, 1.5]}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// 빌드 시 이 파일이 프리로드될 수 있도록 사전 로딩 정의
useGLTF.preload('/aurelia_caviar_bag.glb');
