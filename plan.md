# 가방 쇼핑몰 웹페이지 개발 계획 (Plan)

본 계획서는 사용자의 요구사항을 반영하여 Three.js 기반의 3D 가방 쇼케이스가 포함된 현대적인 가방 쇼핑몰 웹페이지를 구축하기 위한 계획입니다.

## 🛠 기술 스택
- **Framework**: React (Vite, TypeScript)
- **Styling**: Tailwind CSS + Lucide React (아이콘)
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei` (React 환경에 최적화된 3D 렌더링 라이브러리)
- **State Management & UI**: React Hooks (useState, useEffect)

---

## 📋 핵심 요구사항 및 구현 방안

### 1. 레이아웃 배치 순서
1. **네비게이션 메뉴 (Navbar)**: 로고, 카테고리 메뉴, 검색, 장바구니, 마이페이지 아이콘 제공.
2. **MD 추천 상품 (MD's Pick Showcase)**:
   - 화면 중앙에 쇼케이스 형태로 크고 웅장하게 배치.
   - Three.js (`@react-three/fiber`, `@react-three/drei`)를 사용하여 **3D 가방 에셋**을 3D 뷰어로 구현. 마우스 드래그로 회전 및 줌인/아웃 가능.
   - **가방 색상 변경 기능**: 하단 또는 측면에 색상 선택 칩(Color Swatch)을 배치하여, 클릭 시 3D 모델의 재질(Material) 색상이 실시간으로 변경되도록 구현.
3. **인기상품 목록 (Popular Products)**:
   - 그리드 레이아웃 형태로 배치.
   - 기본적으로 **7개의 상품**만 노출.
   - 7개 이외의 상품은 **'더보기'** 버튼을 클릭하여 추가로 펼치거나 모달을 통해 확인할 수 있도록 구현.

### 2. UI/UX 디자인 컨셉
- **Minimal & Premium Luxury**: 고가 브랜드 쇼핑몰 느낌의 세련된 다크/화이트 모노톤 믹스 앤 매치 스타일.
- **Interactive**: 3D 가방 모델링에 부드러운 애니메이션 효과 부여, 마우스 호버 효과 및 색상 전환 시 트랜지션 적용.

---

## 🗂 파일 구조 설계
```text
/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── plan.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── data/
    │   └── products.ts          # MD 추천 및 인기상품 데이터 (10개 이상 정의)
    └── components/
        ├── Navbar.tsx           # 네비게이션 헤더
        ├── Showcase3D.tsx       # MD 추천 3D 쇼케이스 컨테이너
        ├── Bag3DModel.tsx       # React Three Fiber 가방 3D 모델 컴포넌트
        ├── ProductCard.tsx      # 개별 상품 카드 UI
        └── PopularProducts.tsx  # 인기상품 7개 목록 및 '더보기' 기능 구현
```

---

## 📅 단계별 실행 계획

### **[1단계] 프로젝트 초기 설정**
- `package.json` 작성 및 필요한 종속성 정의 (`react`, `three`, `@react-three/fiber`, `@react-three/drei`, `tailwindcss`, `lucide-react` 등).
- Vite, TypeScript, Tailwind CSS 구성 파일 생성.
- `index.html` 및 `src/index.css` 설정.

### **[2단계] 가상 데이터 생성**
- `src/data/products.ts` 파일에 가상 상품 데이터 정의.
  - MD 추천 상품 1개 (기본 색상 목록 포함).
  - 인기 상품 12개 정의 (기본 7개 노출 확인용).

### **[3단계] 3D 가방 모델 및 쇼케이스 구현**
- `src/components/Bag3DModel.tsx`에서 Custom Geometry(몸체, 손잡이, 버클, 지퍼 등)를 조합하여 세련된 3D 핸드백/백팩 모델링 구현.
- `src/components/Showcase3D.tsx`에서 `@react-three/fiber` Canvas를 띄우고 조명, 그림자, 마우스 컨트롤 OrbitControls를 적용하여 중앙 쇼케이스 구축.
- 색상 변경 스와치를 제공하여 상태값(`color`) 변경 시 3D 모델 재질 색상 업데이트 연동.

### **[4단계] 네비게이션 및 인기상품 목록 구현**
- `src/components/Navbar.tsx` 구현.
- `src/components/PopularProducts.tsx` 구현: 슬라이스(`slice(0, 7)`)를 통해 7개만 노출하고, '더보기' 클릭 시 전체 상품(12개)이 그리드로 부드럽게 확장되는 애니메이션 및 UI 구현.

### **[5단계] 메인 통합 및 배포 확인**
- `src/App.tsx`에서 네비게이션 -> MD 추천 3D 쇼케이스 -> 인기상품 목록 순으로 레이아웃 통합.
- 스타일 및 반응형 웹 디자인 점검 (모바일/태블릿/데스크톱 대응).

### **[6단계] 외부 3D 에셋(.glb) 통합 및 커스터마이징**
- 제공받은 `aurelia caviar bag 3d model.glb` 파일을 프로젝트의 `public/` 디렉터리로 복사 및 이름 매핑 (`public/aurelia_caviar_bag.glb`).
- `src/components/Bag3DModel.tsx`를 전면 개편하여, `useGLTF` 훅을 사용해 3D 모델 데이터를 동적 로딩.
- 모델 객체 트리(`scene.traverse`)를 탐색하여 가죽 파트의 재질(`MeshStandardMaterial`)을 찾아 사용자가 선택한 `color` 값으로 실시간 갱신하는 동적 컬러 튜닝 기능 연동.
- `src/data/products.ts` 내 MD 추천 상품 제목을 `Aurelia Caviar Bag`으로 수정 및 관련 텍스트 최적화.

### **[7단계] 3D 쇼케이스 조명 밝기 및 재질 명도 개선**
- `src/components/Showcase3D.tsx` 내의 주광원(`ambientLight`, `spotLight`, `directionalLight`) 밝기 대폭 상향 조정. 가방 후면 및 하단의 어두운 음영을 보완하기 위한 포인트 조명 추가 설치.
- `src/components/Bag3DModel.tsx`에서 가죽 재질의 반사광(`roughness`, `metalness`) 속성을 조절하여 난반사 효과를 극대화해 텍스처 형태를 뚜렷하게 복원.
- `src/data/products.ts` 내 `threeColor` 정의를 미세하게 한 단계 더 화사하고 채도 높은 파스텔/비비드 톤으로 리터칭하여 웹 렌더링 명도 최적화.

### **[8단계] 가방 자체 색상 및 가방끈 색상 분리 커스터마이징**
- `src/components/Showcase3D.tsx`에 가방 자체 색상(`bodyColor`)과 가방끈 및 손잡이 색상(`strapColor`)을 독립 조작하는 이원화된 제어판 패널(Dual Customizer Swatches) 구축.
- `src/components/Bag3DModel.tsx`에서 3D 메쉬의 이름을 세분화 분석하여, 가방끈/핸들 관련 재질에는 `strapColor`를, 몸체/플랩 가죽 관련 재질에는 `bodyColor`를 각각 독립적으로 실시간 업데이트하는 다중 파츠 쉐이딩 연동.
- `src/data/products.ts`에 본체(Body) 및 끈(Strap)에 매치할 수 있는 명품 에디션 맞춤형 컬러 옵션 리스트 셋 분리 정의.



