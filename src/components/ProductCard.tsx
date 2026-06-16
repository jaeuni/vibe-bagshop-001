import { useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#111] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-xl hover:shadow-black/50"
    >
      {/* 1. 이미지 및 배지 컨테이너 */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#151515]">
        
        {/* 리본 배지 (tag) */}
        {product.tag && (
          <span className="absolute top-3 left-3 z-10 bg-luxury-gold text-black text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md shadow-md uppercase">
            {product.tag}
          </span>
        )}

        {/* 위시리스트 토글 버튼 */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5 text-zinc-400 hover:text-white transition-all active:scale-90"
        >
          <Heart className={`w-4 h-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* 메인 가방 이미지 */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Hover overlay with Quick Add Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button className="bg-white text-black font-semibold text-xs py-3 px-6 rounded-xl flex items-center gap-2 shadow-2xl transition duration-300 transform translate-y-4 group-hover:translate-y-0 active:scale-95 hover:bg-zinc-200">
            <ShoppingCart className="w-4 h-4 fill-black" />
            <span>장바구니 담기</span>
          </button>
        </div>
      </div>

      {/* 2. 제품 상세 정보 */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* 별점 */}
        <div className="flex items-center text-luxury-gold gap-1 text-xs mb-2">
          <Star className="w-3.5 h-3.5 fill-luxury-gold" />
          <span className="font-semibold text-white">{product.rating}</span>
          <span className="text-zinc-500">({product.reviewsCount})</span>
        </div>

        {/* 이름 */}
        <h3 className="text-zinc-200 font-medium text-sm sm:text-base tracking-tight mb-2 line-clamp-1 group-hover:text-white transition-colors duration-200">
          {product.name}
        </h3>

        {/* 가격 */}
        <div className="mt-auto flex items-baseline gap-2.5">
          <span className="text-white font-bold text-base sm:text-lg">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-zinc-500 text-xs line-through font-medium">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
