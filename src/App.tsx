import Navbar from './components/Navbar';
import Showcase3D from './components/Showcase3D';
import PopularProducts from './components/PopularProducts';
import { Mail, Instagram, Youtube, Facebook, ShieldAlert } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col font-sans">
      
      {/* 1. 네비게이션 메뉴 */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-[65px] sm:pt-[75px]">
        {/* 2. MD 추천 상품 3D 쇼케이스 (색상 변경 및 3D 모델 수록) */}
        <Showcase3D />

        {/* 3. 인기상품 목록 (7개 기본 노출 + 더보기 기능 수록) */}
        <PopularProducts />
      </main>

      {/* 4. 푸터 (Footer) */}
      <footer className="bg-[#080808] border-t border-white/5 py-12 px-6 md:px-12 text-zinc-500 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* 브랜드 요약 */}
          <div className="flex flex-col gap-3 text-left">
            <span className="text-white font-bold tracking-widest text-lg font-sans">
              VIBE<span className="text-luxury-gold font-light">BAGS</span>
            </span>
            <p className="text-zinc-600 text-xs font-light leading-relaxed">
              최고의 감각과 하이엔드 테크놀로지를 믹스하여 오프라인 쇼룸을 넘어서는 입체적인 디지털 3D 쇼케이스와 정교한 레더 크래프트 기법으로 시대의 VIBE를 선도합니다.
            </p>
          </div>

          {/* Links 1 */}
          <div className="flex flex-col gap-2.5 text-left">
            <span className="text-zinc-300 text-xs uppercase tracking-widest font-semibold mb-1">Customer Service</span>
            <a href="#" className="hover:text-white transition-colors">1:1 문의 / 고객센터</a>
            <a href="#" className="hover:text-white transition-colors">배송 및 반품 안내</a>
            <a href="#" className="hover:text-white transition-colors">A/S 및 제품 관리 가이드</a>
            <a href="#" className="hover:text-white transition-colors">매장 찾기 (Showroom)</a>
          </div>

          {/* Links 2 */}
          <div className="flex flex-col gap-2.5 text-left">
            <span className="text-zinc-300 text-xs uppercase tracking-widest font-semibold mb-1">About Us</span>
            <a href="#" className="hover:text-white transition-colors">브랜드 스토리</a>
            <a href="#" className="hover:text-white transition-colors">지속 가능성 (Sustainability)</a>
            <a href="#" className="hover:text-white transition-colors">채용 안내</a>
            <a href="#" className="hover:text-white transition-colors">제휴 및 입점 제안</a>
          </div>

          {/* 이메일 구독 및 SNS */}
          <div className="flex flex-col gap-4 text-left">
            <div>
              <span className="text-zinc-300 text-xs uppercase tracking-widest font-semibold block mb-2">Subscribe Newsletter</span>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/3 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold w-full"
                />
                <button className="bg-white text-black font-semibold text-xs px-3.5 py-2 rounded-lg hover:bg-zinc-200 transition">
                  <Mail className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex gap-4 text-zinc-400">
              <a href="#" className="hover:text-luxury-gold transition"><Instagram className="w-4.5 h-4.5" /></a>
              <a href="#" className="hover:text-luxury-gold transition"><Youtube className="w-4.5 h-4.5" /></a>
              <a href="#" className="hover:text-luxury-gold transition"><Facebook className="w-4.5 h-4.5" /></a>
            </div>
          </div>

        </div>

        <div className="h-[1px] w-full bg-white/5 mb-8"></div>

        {/* 카피라이트 및 안전성 경고/선언 */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-zinc-700" />
            <span>본 웹사이트는 포트폴리오 목적으로 구성된 가상의 3D 가방 쇼핑몰입니다.</span>
          </div>
          <div>
            &copy; 2026 VIBE BAGS INC. ALL RIGHTS RESERVED.
          </div>
        </div>

      </footer>
    </div>
  );
}
