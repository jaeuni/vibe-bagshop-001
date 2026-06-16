import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { ShoppingBag, Sparkles, RefreshCw, Star, ShieldCheck, Heart } from 'lucide-react';
import { mdPickProduct, ColorOption } from '../data/products';
import Bag3DModel from './Bag3DModel';

export default function Showcase3D() {
  const [selectedBodyColor, setSelectedBodyColor] = useState<ColorOption>(
    mdPickProduct.bodyColors ? mdPickProduct.bodyColors[0] : { name: "Black", value: "#141414", threeColor: "#2a2a28" }
  );
  const [selectedStrapColor, setSelectedStrapColor] = useState<ColorOption>(
    mdPickProduct.strapColors ? mdPickProduct.strapColors[0] : { name: "Black", value: "#141414", threeColor: "#2a2a28" }
  );
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  // 가격 포맷팅 (원화)
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
  };

  return (
    <section className="relative w-full min-h-[85vh] bg-gradient-to-b from-[#0b0b0b] to-[#151515] flex flex-col justify-center items-center py-12 px-4 md:px-8 border-b border-[#222]">
      
      {/* 럭셔리 백그라운드 디자인 요소 */}
      <div className="absolute top-10 left-10 text-[10rem] font-bold text-white/3 select-none pointer-events-none hidden lg:block font-sans tracking-tighter">
        VIBE
      </div>
      <div className="absolute bottom-10 right-10 text-[10rem] font-bold text-white/3 select-none pointer-events-none hidden lg:block font-sans tracking-tighter">
        AURELIA
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* LEFT PANEL: 3D Canvas Showcase (7/12 Columns) */}
        <div className="lg:col-span-7 w-full h-[450px] sm:h-[550px] lg:h-[650px] relative bg-gradient-to-br from-[#121212] to-[#1a1a1a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl shadow-black/80 group">
          
          {/* Badge 및 인터랙션 힌트 */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
            <span className="bg-luxury-gold text-black text-xs font-bold px-3 py-1.5 rounded-full tracking-wider flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              {mdPickProduct.tag}
            </span>
          </div>

          <div className="absolute top-6 right-6 z-10 flex gap-2">
            <button 
              onClick={() => setLiked(!liked)}
              className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white p-3 rounded-full border border-white/10 transition-all duration-300 active:scale-95"
            >
              <Heart className={`w-5 h-5 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-white"}`} />
            </button>
          </div>

          {/* 3D 뷰어 인터랙션 힌트 */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-zinc-400 flex items-center gap-2 pointer-events-none group-hover:opacity-100 opacity-80 transition-opacity duration-300">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            드래그하여 3D 가방을 360도 회전해보세요
          </div>

          {/* Canvas Wrapper */}
          <div className="w-full h-full cursor-grab active:cursor-grabbing">
            <Canvas
              shadows
              camera={{ position: [0, 1.2, 3.5], fov: 45 }}
              gl={{ antialias: true, preserveDrawingBuffer: true }}
            >
              {/* 조명 설정 (명도를 극대화하여 3D 디테일을 밝고 명확하게 복원) */}
              <ambientLight intensity={1.5} />
              <spotLight
                position={[8, 12, 8]}
                angle={0.4}
                penumbra={1.0}
                intensity={3.5}
                castShadow
                shadow-mapSize={2048}
              />
              {/* 메인 정면 조명 (가방을 화사하게 비추는 사선 광원) */}
              <directionalLight
                position={[2, 4, 5]}
                intensity={2.8}
                castShadow
              />
              {/* 후방 실루엣 림라이트 (가방 실루엣과 손잡이를 부드럽게 강조) */}
              <directionalLight
                position={[-3, 4, -4]}
                intensity={1.8}
              />
              {/* 하단 및 정면 보정용 포인트 조명 (어두운 디테일을 밀어내는 필라이트) */}
              <pointLight position={[0, 2, 4]} intensity={2.2} decay={1.5} />
              <pointLight position={[0, -2, 2]} intensity={1.0} />

              <Suspense fallback={null}>
                {/* 3D 가방 모델 렌더링 (가방 본체 및 가방끈 색상 분리 렌더링 전송) */}
                <Bag3DModel bodyColor={selectedBodyColor.threeColor} strapColor={selectedStrapColor.threeColor} />
                
                {/* 바닥 그림자 효과 */}
                <ContactShadows
                  position={[0, -0.75, 0]}
                  opacity={0.75}
                  scale={4}
                  blur={1.8}
                  far={1.5}
                />
              </Suspense>

              {/* 카메라 드래그 회전/줌 조작 컨트롤 */}
              <OrbitControls
                enablePan={false}
                minDistance={2.0}
                maxDistance={5.5}
                maxPolarAngle={Math.PI / 2 + 0.1} // 바닥 아래로 카메라가 내려가지 않도록 제어
                minPolarAngle={Math.PI / 6}
              />
            </Canvas>
          </div>
        </div>

        {/* RIGHT PANEL: Product Customizer & Purchase Detail (5/12 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left pl-0 lg:pl-4">
          
          {/* 브랜드 및 평점 */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-luxury-gold uppercase text-sm font-bold tracking-widest">MD's CHOICE</span>
            <div className="h-4 w-[1px] bg-white/20"></div>
            <div className="flex items-center text-luxury-gold text-sm font-medium gap-1">
              <Star className="w-4 h-4 fill-luxury-gold" />
              <span>{mdPickProduct.rating}</span>
              <span className="text-zinc-500">({mdPickProduct.reviewsCount} reviews)</span>
            </div>
          </div>

          {/* 타이틀 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white font-sans">
            {mdPickProduct.name}
          </h1>

          {/* 상품 설명 */}
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 font-light">
            시대를 초월한 우아함을 담은 프리미엄 수제 백입니다. 최고급 이탈리안 캐비어 가죽과 18K 골드 마감 부자재를 활용하여 견고함과 럭셔리한 실루엣을 자랑하며, 실시간 3D 프리뷰를 통해 취향에 맞는 완벽한 시그니처 색상을 구성해 보세요.
          </p>

          {/* 가격 */}
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {formatPrice(mdPickProduct.price)}
            </span>
            {mdPickProduct.originalPrice && (
              <span className="text-zinc-500 text-lg line-through font-medium">
                {formatPrice(mdPickProduct.originalPrice)}
              </span>
            )}
            <span className="text-red-500 text-sm font-bold bg-red-500/10 px-2.5 py-0.5 rounded">
              {Math.round(((mdPickProduct.originalPrice || 0) - mdPickProduct.price) / (mdPickProduct.originalPrice || 1) * 100)}% OFF
            </span>
          </div>

          <div className="h-[1px] w-full bg-white/10 mb-8"></div>

          {/* INTERACTION 1: 가방 본체 가죽 색상 및 가방끈 색상 이중 커스터마이저 스와치 패널 */}
          <div className="flex flex-col gap-6 mb-8">
            
            {/* 파트 1. 가방 본체 색상 스와치 */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold"></span>
                  Select Bag Body Color
                </span>
                <span className="text-sm font-medium text-luxury-gold">{selectedBodyColor.name}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {mdPickProduct.bodyColors?.map((colorOpt) => (
                  <button
                    key={colorOpt.name}
                    onClick={() => setSelectedBodyColor(colorOpt)}
                    className={`w-9 h-9 rounded-full border-2 transition-all duration-300 relative ${
                      selectedBodyColor.name === colorOpt.name
                        ? 'border-luxury-gold scale-110 shadow-lg shadow-luxury-gold/20'
                        : 'border-white/20 hover:border-white/50 hover:scale-105'
                    }`}
                    style={{ backgroundColor: colorOpt.value }}
                    title={colorOpt.name}
                  >
                    {selectedBodyColor.name === colorOpt.name && (
                      <span className="absolute inset-0.5 rounded-full border border-black pointer-events-none"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 파트 2. 가방끈/손잡이 색상 스와치 */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold"></span>
                  Select Strap & Handle Color
                </span>
                <span className="text-sm font-medium text-luxury-gold">{selectedStrapColor.name}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {mdPickProduct.strapColors?.map((colorOpt) => (
                  <button
                    key={colorOpt.name}
                    onClick={() => setSelectedStrapColor(colorOpt)}
                    className={`w-9 h-9 rounded-full border-2 transition-all duration-300 relative ${
                      selectedStrapColor.name === colorOpt.name
                        ? 'border-luxury-gold scale-110 shadow-lg shadow-luxury-gold/20'
                        : 'border-white/20 hover:border-white/50 hover:scale-105'
                    }`}
                    style={{ backgroundColor: colorOpt.value }}
                    title={colorOpt.name}
                  >
                    {selectedStrapColor.name === colorOpt.name && (
                      <span className="absolute inset-0.5 rounded-full border border-black pointer-events-none"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* INTERACTION 2: 수량 선택 및 장바구니/구매 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* 수량 조절기 */}
            <div className="flex items-center justify-between border border-white/15 rounded-xl bg-white/3 px-4 py-3 sm:w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-zinc-400 hover:text-white transition px-2 font-bold text-lg"
              >
                -
              </button>
              <span className="text-white font-semibold text-base w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-zinc-400 hover:text-white transition px-2 font-bold text-lg"
              >
                +
              </button>
            </div>

            {/* 바로 구매하기 / 장바구니 담기 */}
            <button className="flex-1 bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl py-4 px-6 flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-xl hover:shadow-white/10 active:scale-98">
              <ShoppingBag className="w-5 h-5 fill-black" />
              <span>바로 구매하기</span>
            </button>
          </div>

          {/* 추가 신뢰성 정보 칩 */}
          <div className="grid grid-cols-2 gap-4 bg-white/3 border border-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2.5 text-zinc-400 text-xs">
              <ShieldCheck className="w-5 h-5 text-luxury-gold shrink-0" />
              <span>정품 보증 및 2년 무상 보증 수리</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-400 text-xs">
              <Sparkles className="w-5 h-5 text-luxury-gold shrink-0" />
              <span>선물 케이스 및 특급 무료배송</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
