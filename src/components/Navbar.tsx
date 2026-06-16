import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 스크롤 이벤트 감지하여 네비게이션 스타일 토글
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0b0b]/80 backdrop-blur-md py-4 border-b border-white/5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* LOGO */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-black tracking-widest text-white font-sans">
            VIBE<span className="text-luxury-gold font-light">BAGS</span>
          </span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest text-zinc-300">
          <a href="#" className="hover:text-luxury-gold transition duration-300">NEW</a>
          <a href="#" className="hover:text-luxury-gold transition duration-300">COLLECTIONS</a>
          <a href="#" className="hover:text-luxury-gold transition duration-300">BEST SELLERS</a>
          <a href="#" className="hover:text-luxury-gold transition duration-300">ABOUT</a>
          <a href="#" className="hover:text-luxury-gold transition duration-300">EDITORIAL</a>
        </div>

        {/* ACTIONS / ICONS */}
        <div className="flex items-center gap-4 sm:gap-6 text-zinc-300">
          <button className="hover:text-luxury-gold transition duration-300 p-1" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-luxury-gold transition duration-300 p-1 hidden sm:block" aria-label="Favorites">
            <Heart className="w-5 h-5" />
          </button>
          <button className="hover:text-luxury-gold transition duration-300 p-1 hidden sm:block" aria-label="Account">
            <User className="w-5 h-5" />
          </button>
          <button className="hover:text-luxury-gold transition duration-300 p-1 relative" aria-label="Cart">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-luxury-gold text-black text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full">
              2
            </span>
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden hover:text-luxury-gold transition p-1"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#0b0b0b] border-b border-white/5 py-6 px-8 flex flex-col gap-6 text-base font-semibold tracking-wider text-zinc-300 shadow-2xl z-40 animate-fade-in">
          <a href="#" className="hover:text-luxury-gold transition" onClick={() => setIsMobileMenuOpen(false)}>NEW</a>
          <a href="#" className="hover:text-luxury-gold transition" onClick={() => setIsMobileMenuOpen(false)}>COLLECTIONS</a>
          <a href="#" className="hover:text-luxury-gold transition" onClick={() => setIsMobileMenuOpen(false)}>BEST SELLERS</a>
          <a href="#" className="hover:text-luxury-gold transition" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</a>
          <a href="#" className="hover:text-luxury-gold transition" onClick={() => setIsMobileMenuOpen(false)}>EDITORIAL</a>
          <div className="flex gap-4 pt-4 border-t border-white/5 text-zinc-400">
            <a href="#" className="hover:text-luxury-gold flex items-center gap-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
              <User className="w-4 h-4" /> 마이페이지
            </a>
            <a href="#" className="hover:text-luxury-gold flex items-center gap-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
              <Heart className="w-4 h-4" /> 위시리스트
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
