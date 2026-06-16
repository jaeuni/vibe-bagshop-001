import { useState } from 'react';
import { ChevronDown, ChevronUp, Award } from 'lucide-react';
import { popularProducts } from '../data/products';
import ProductCard from './ProductCard';

export default function PopularProducts() {
  const [showAll, setShowAll] = useState(false);

  // 기본적으로 7개 노출, showAll이 true이면 전체 12개 노출
  const visibleProducts = showAll ? popularProducts : popularProducts.slice(0, 7);

  return (
    <section className="w-full bg-[#0b0b0b] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* 섹션 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2 text-luxury-gold">
              <Award className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-bold">Trending Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans">
              인기 상품 목록
            </h2>
          </div>
          <p className="text-zinc-500 text-sm md:text-base max-w-md text-left md:text-right font-light">
            전 세계에서 가장 많은 사랑을 받고 있는 VIBE의 시그니처 백 콜렉션입니다. 최고의 장인이 선사하는 독보적인 퀄리티를 만나보세요.
          </p>
        </div>

        {/* 그리드 레이아웃 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* 7개만 노출할 때, 빈 슬롯이나 특이한 크기의 카드가 아닌, 그리드의 일부분으로 아름답게 녹아들게 설계 */}
          {/* 더보기 버튼이 그리드 끝에 카드로 오거나 하단 중앙에 독립적인 버튼으로 오도록 유도 */}
        </div>

        {/* 3. 더보기 / 접기 컨트롤 영역 */}
        <div className="flex justify-center mt-12">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 bg-[#141414] hover:bg-zinc-800 text-white font-semibold text-sm py-4 px-10 rounded-full border border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 active:scale-95"
            >
              <span>인기상품 더보기 ({popularProducts.length - 7}개 더 있음)</span>
              <ChevronDown className="w-4 h-4 text-luxury-gold animate-bounce" style={{ animationDuration: '2s' }} />
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="flex items-center gap-2 bg-[#141414] hover:bg-zinc-800 text-white font-semibold text-sm py-4 px-10 rounded-full border border-white/10 transition-all duration-300 active:scale-95"
            >
              <span>인기상품 접기</span>
              <ChevronUp className="w-4 h-4 text-luxury-gold" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
