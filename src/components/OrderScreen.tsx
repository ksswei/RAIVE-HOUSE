import React, { useState } from 'react';
import { Drink, OrderItem } from '../types';
import { CATEGORIES, INITIAL_DRINKS } from '../data';
import { ShoppingCart, Plus, Minus, Info, ClipboardList, ArrowLeft } from 'lucide-react';

interface OrderScreenProps {
  drinks: Drink[];
  cart: OrderItem[];
  addToCart: (drink: Drink) => void;
  removeFromCart: (drink: Drink) => void;
  clearCart: () => void;
  onCheckout: () => void;
  onBackToHome?: () => void;
}

export default function OrderScreen({
  drinks,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  onCheckout,
  onBackToHome
}: OrderScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('cocktail');
  const [selectedDetailedDrink, setSelectedDetailedDrink] = useState<Drink | null>(null);

  // Filter drinks based on active category
  const filteredDrinks = drinks.filter(d => d.category === selectedCategory);

  // Get quantity of a drink in cart
  const getQuantityInCart = (drinkId: string) => {
    const item = cart.find(i => i.drink.id === drinkId);
    return item ? item.quantity : 0;
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + (item.drink.price * item.quantity), 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 font-sans text-white select-none">
      {/* Search & Header Portion */}
      <div className="px-4 py-3 bg-[#0d0d11] shrink-0 border-b border-neutral-900/60">
        <div className="flex justify-between items-center mb-1">
          {/* Store Name & Store Selector indicator */}
          <div className="flex items-center gap-2">
            {onBackToHome && (
              <button
                id="order_back_to_home_btn"
                onClick={onBackToHome}
                className="p-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 transition-colors cursor-pointer mr-0.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
            <span id="store_trigger_name" className="text-[15px] font-bold tracking-tight text-white flex items-center gap-1 hover:opacity-85 cursor-pointer">
              RAIVE HOUSE
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-neutral-400">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </span>
          </div>

          {/* Location eating mode capsule tab */}
          <div className="flex items-center bg-neutral-900 text-neutral-400 border border-neutral-800 rounded-full text-[10px] p-0.5 select-none font-semibold">
            <span className="px-2.5 py-1 bg-neutral-800 text-amber-500 rounded-full text-xs font-bold font-sans">
              店内
            </span>
            <span 
              className="px-2.5 py-1 rounded-full text-neutral-500 hover:text-neutral-300 cursor-pointer"
              onClick={() => alert('请在结算时选择“打包带走”模式')}
            >
              自提
            </span>
          </div>
        </div>
        <p className="text-[10px] text-neutral-500 font-medium">
          地址: 广东省东莞市黄江镇板湖路30号汇隆中心9楼
        </p>
      </div>

      {/* Main Selector Row (Splitting Categories sidebar & Product columns) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Vertical Categories Column */}
        <div className="w-[84px] bg-[#111115] shrink-0 border-r border-neutral-900 overflow-y-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat_tab_${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full py-4 px-1.5 text-center text-xs relative transition-all outline-none border-b border-neutral-900/40 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  isSelected 
                    ? 'bg-neutral-950 text-amber-500 font-bold border-l-4 border-amber-500' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                {/* Micro-dot representation for style */}
                <span className="text-[11px] leading-tight select-all">{cat.name}</span>
                {isSelected && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500/30" />
                )}
              </button>
            );
          })}

          <div className="mt-8 flex flex-col items-center justify-center p-2 text-[10px] text-neutral-600 font-mono text-center">
            <span>POKER</span>
            <span>& BAR</span>
            <span>♣️ ♦️ ♥️ ♠️</span>
          </div>
        </div>

        {/* Right Scrolled Content Column */}
        <div className="flex-1 bg-neutral-950 overflow-y-auto px-3.5 py-3.5 scroll-smooth no-scrollbar">
          {/* Header title */}
          <div className="flex justify-between items-center mb-4 border-b border-neutral-900 pb-1.5 select-all">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono flex items-center gap-1.5">
              <span>✦</span> {CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-[10px] font-mono text-neutral-550 truncate">
              {filteredDrinks.length} 款甄选
            </span>
          </div>

          <div className="space-y-4">
            {filteredDrinks.map((drink) => {
              const qty = getQuantityInCart(drink.id);
              return (
                <div
                  key={drink.id}
                  id={`drink_row_${drink.id}`}
                  className="bg-neutral-900/45 hover:bg-neutral-900/80 p-2.5 rounded-2xl border border-neutral-850/60 flex gap-3 transition-all relative overflow-hidden"
                >
                  {/* Drink thumbnail image */}
                  <div 
                    className="w-[88px] h-[88px] bg-neutral-950 rounded-xl relative overflow-hidden shrink-0 group border border-neutral-800 shadow cursor-pointer"
                    onClick={() => setSelectedDetailedDrink(drink)}
                  >
                    <img
                      src={drink.image}
                      alt={drink.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-mono bg-amber-500 text-black px-1 rounded font-bold">查看详情</span>
                    </div>
                  </div>

                  {/* Drink textual details */}
                  <div className="flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="cursor-pointer" onClick={() => setSelectedDetailedDrink(drink)}>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold tracking-tight text-neutral-100 flex items-center gap-1 truncate select-all">
                          {drink.name}
                        </h3>
                        <button className="text-neutral-550 hover:text-amber-500 p-0.5 outline-none cursor-pointer">
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      {/* Ingredients */}
                      <p className="text-[10.5px] text-neutral-400 mt-1 line-clamp-1 truncate select-all">
                        {drink.ingredients.join('，')}
                      </p>

                      <p className="text-[9.5px] text-neutral-500 font-mono mt-0.5 select-all">
                        销量 {drink.sales}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-1 border-t border-dotted border-neutral-850">
                      <span className="text-sm font-bold text-amber-500 font-mono select-all">
                        ¥ {drink.price}
                      </span>

                      {/* Interactive add/subtract custom buttons */}
                      <div className="flex items-center gap-2.5">
                        {qty > 0 && (
                          <button
                            id={`drink_minus_${drink.id}`}
                            onClick={() => removeFromCart(drink)}
                            className="w-6 h-6 rounded-full bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 flex items-center justify-center text-amber-500 transition-all select-none cursor-pointer"
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        )}
                        
                        {qty > 0 && (
                          <span className="text-xs font-mono font-bold text-neutral-200 min-w-[12px] text-center select-none">
                            {qty}
                          </span>
                        )}

                        <button
                          id={`drink_plus_${drink.id}`}
                          onClick={() => addToCart(drink)}
                          className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-750 hover:border-amber-500 flex items-center justify-center text-amber-500 hover:bg-neutral-800 transition-all shadow-sm select-none cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Mini Cart Drawer overlay */}
      {totalCartCount > 0 && (
        <div className="px-4 py-3 bg-[#0d0d12] border-t border-neutral-900 flex justify-between items-center gap-3.5 shrink-0 shadow-lg select-all relative z-30 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3">
            <div className="w-[45px] h-[45px] rounded-full bg-amber-500 flex items-center justify-center text-neutral-950 relative shadow glow-amber">
              <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full select-none">
                {totalCartCount}
              </span>
            </div>
            <div>
              <div className="text-sm font-bold font-mono text-amber-400">
                ¥ {totalCartAmount}
              </div>
              <p className="text-[9.5px] text-neutral-400 select-none">
                不含配送费 • 可享免费餐具
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              id="clear_cart_btn"
              onClick={clearCart}
              className="px-3 py-2 border border-neutral-850 hover:border-red-950/50 rounded-xl text-neutral-500 hover:text-rose-400 text-xs transition-colors cursor-pointer"
            >
              清空
            </button>
            <button
              id="checkout_trigger_btn"
              onClick={onCheckout}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 active:from-amber-600 text-stone-950 font-sans font-extrabold text-xs rounded-xl shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1"
            >
              <span>去结算</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Drink Detail Modal overlay */}
      {selectedDetailedDrink && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto select-all">
          <div className="bg-[#111115] border border-neutral-800 rounded-3xl p-5 max-w-[340px] w-full relative shadow-2xl animate-in scale-in duration-200">
            {/* Close button */}
            <button
              id="close_drink_detail_btn"
              onClick={() => setSelectedDetailedDrink(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-neutral-800 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Photo */}
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-neutral-800 mb-4 select-none relative">
              <img
                src={selectedDetailedDrink.image}
                alt={selectedDetailedDrink.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur border border-neutral-800 px-2.5 py-1 rounded-full">
                <span className="text-[10px] text-amber-500 font-mono font-bold tracking-widest uppercase">
                  {selectedDetailedDrink.englishName || 'Bar Special'}
                </span>
              </div>
            </div>

            {/* Name */}
            <h3 className="text-lg font-bold text-neutral-100 flex items-center justify-between">
              <span>{selectedDetailedDrink.name}</span>
              <span className="text-amber-500 text-sm font-mono font-bold">¥ {selectedDetailedDrink.price}</span>
            </h3>

            {/* Ingredients badges */}
            <div className="flex flex-wrap gap-1.5 my-3">
              {selectedDetailedDrink.ingredients.map((ing, i) => (
                <span key={i} className="text-[10px] bg-neutral-900 text-neutral-300 font-medium px-2 py-0.5 rounded-full border border-neutral-800/80">
                  {ing}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-[11.5px] text-neutral-400 leading-relaxed text-justify mb-4 min-h-[3.5rem]">
              {selectedDetailedDrink.description || '这是我们精心调合的一款酒。优质的原料，恰到核心的拼合比例，带给您极佳的口感体验。'}
            </p>

            {/* Taste balance indicators to match a high-end experience */}
            <div className="space-y-2 mb-4 bg-black/45 p-3 rounded-xl border border-neutral-850 select-none">
              <span className="text-[9.5px] text-neutral-500 uppercase tracking-wider font-mono block mb-1">
                特调制衡度 Taste balance
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">酸度 Sourness</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(v => (
                      <span key={v} className={`w-1.5 h-1.5 rounded-full ${v <= (selectedDetailedDrink.name.includes('酸') || selectedDetailedDrink.name.includes('黄') ? 3.5 : 2) ? 'bg-amber-500' : 'bg-neutral-800'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">甜度 Sweetness</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(v => (
                      <span key={v} className={`w-1.5 h-1.5 rounded-full ${v <= (selectedDetailedDrink.name.includes('高') || selectedDetailedDrink.name.includes('止') ? 4.5 : 2) ? 'bg-amber-500' : 'bg-neutral-800'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">烈度 Strength</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(v => (
                      <span key={v} className={`w-1.5 h-1.5 rounded-full ${v <= (selectedDetailedDrink.name.includes('教') || selectedDetailedDrink.name.includes('尼') || selectedDetailedDrink.name.includes('麦') ? 4 : 2) ? 'bg-amber-500' : 'bg-neutral-800'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">果香 Fruitiness</span>
                  <div className="flex gap-0.5">
                     {[1, 2, 3, 4, 5].map(v => (
                      <span key={v} className={`w-1.5 h-1.5 rounded-full ${v <= (selectedDetailedDrink.name.includes('止') || selectedDetailedDrink.name.includes('黄') || selectedDetailedDrink.name.includes('高') ? 4 : 1.5) ? 'bg-amber-500' : 'bg-neutral-800'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action to Add in detailed popup */}
            <div className="flex gap-2">
              <button
                id="popup_add_to_cart_btn"
                onClick={() => {
                  addToCart(selectedDetailedDrink);
                  setSelectedDetailedDrink(null);
                }}
                className="flex-1 py-2.5 bg-amber-500 active:bg-amber-600 text-neutral-950 font-bold text-xs rounded-xl shadow cursor-pointer text-center"
              >
                加人购物车
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
