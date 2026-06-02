import React, { useState } from 'react';
import { Drink, OrderItem, UserProfile } from '../types';
import { MOCK_COUPONS } from '../data';
import { ArrowLeft, MapPin, Ticket, CheckCircle } from 'lucide-react';

interface CheckoutModalProps {
  cart: OrderItem[];
  user: UserProfile;
  registerUser: (name: string, phone: string) => void;
  onClose: () => void;
  onSubmitOrder: (type: 'in-store' | 'takeaway', phone: string, notes: string, couponValue: number) => void;
}

export default function CheckoutModal({
  cart,
  user,
  registerUser,
  onClose,
  onSubmitOrder
}: CheckoutModalProps) {
  const [eatingType, setEatingType] = useState<'in-store' | 'takeaway'>('in-store');
  const [phone, setPhone] = useState(user.phone || '');
  const [notes, setNotes] = useState('');
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [showCouponSelector, setShowCouponSelector] = useState(false);
  
  // WeChat location permission box status
  const [locationPermissionState, setLocationPermissionState] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  
  // Simulated final order completion overlay status
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const productSubtotal = cart.reduce((sum, item) => sum + (item.drink.price * item.quantity), 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Active coupon values
  const activeCoupon = MOCK_COUPONS.find(c => c.id === selectedCouponId);
  const couponDiscount = activeCoupon && productSubtotal >= activeCoupon.minSpend ? activeCoupon.value : 0;
  const finalPrice = Math.max(0, productSubtotal - couponDiscount);

  const handlePayOrder = () => {
    if (!phone) {
      alert('请先输入联系手机号码');
      return;
    }
    
    // Simulate order placement
    const orderId = 'B7-' + Math.floor(100000 + Math.random() * 900000);
    setPlacedOrderId(orderId);
    setOrderCompleted(true);
    
    setTimeout(() => {
      // Trigger update to the parent container
      onSubmitOrder(eatingType, phone, notes, couponDiscount);
    }, 2000);
  };

  return (
    <div className="absolute inset-0 bg-[#0a0a0c] z-50 flex flex-col font-sans text-neutral-200 select-all overflow-y-auto no-scrollbar pb-10">
      
      {/* Top Header Navigation matching Screen 4 back chevron */}
      <div className="h-12 bg-neutral-950 border-b border-neutral-900 flex items-center px-4 sticky top-0 z-10 justify-between select-none">
        <button 
          id="checkout_back_btn"
          onClick={onClose}
          className="text-neutral-400 hover:text-white p-1 hover:bg-neutral-900 rounded-full cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-sm tracking-wide text-neutral-100 flex-1 text-center pr-5">
          Bluff-7 Bar
        </span>
      </div>

      {!orderCompleted ? (
        <div className="p-4 space-y-4 max-w-[380px] mx-auto w-full relative">
          
          {/* Section 1: Store Location and calculations */}
          <div className="bg-[#111115] border border-neutral-850 rounded-2xl p-4 space-y-2">
            <div className="flex gap-2.5 items-start">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-neutral-200 select-all">
                  Bluff-7 Bar(Bluff-7 Bar)
                </h4>
                <p className="text-[11px] text-neutral-400 mt-1 select-all leading-normal">
                  广东省东莞市黄江镇板湖路30号汇隆中心9楼
                </p>
                {locationPermissionState === 'granted' && (
                  <span className="inline-block mt-1.5 text-[9.5px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                    📍 已授权定位测距 • 距离您 12.4km
                  </span>
                )}
                {locationPermissionState === 'denied' && (
                  <span className="inline-block mt-1.5 text-[9.5px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-mono">
                    ⚠️ 定位权限已拒绝 • 请手动填写地址
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Eating Type Tabs (In-store vs Takeaway) */}
          <div className="bg-neutral-900 border border-neutral-850 rounded-2xl p-1 flex">
            <button
              id="eating_type_instore"
              onClick={() => setEatingType('in-store')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                eatingType === 'in-store'
                  ? 'bg-[#1a1a24] text-amber-500 border border-neutral-800'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
              </svg>
              店内消费
            </button>
            <button
              id="eating_type_takeaway"
              onClick={() => setEatingType('takeaway')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                eatingType === 'takeaway'
                  ? 'bg-[#1a1a24] text-amber-500 border border-neutral-800'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              打包带走
            </button>
          </div>

          {/* Section 3: Ordered Items list block */}
          <div className="bg-[#111115] border border-neutral-850 rounded-2xl p-4.5 space-y-3.5 shadow-sm">
            {cart.map((item) => (
              <div key={item.drink.id} className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 shrink-0">
                    <img src={item.drink.image} alt={item.drink.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-[13.5px] font-bold text-neutral-200 select-all">{item.drink.name}</h5>
                    <p className="text-[10.5px] text-neutral-400 select-all truncate max-w-[170px]">
                      {item.drink.ingredients.slice(0, 2).join(' / ')}
                    </p>
                  </div>
                </div>
                <div className="text-right select-all font-mono">
                  <span className="text-xs text-neutral-400">¥ {item.drink.price}</span>
                  <span className="text-amber-500 font-bold ml-1">x{item.quantity}</span>
                </div>
              </div>
            ))}

            <div className="border-t border-dotted border-neutral-800 pt-3 flex justify-between text-xs text-neutral-400">
              <span>商品小计</span>
              <span className="font-mono text-neutral-200">¥ {productSubtotal}</span>
            </div>
          </div>

          {/* Section 4: Coupons Selector */}
          <div 
            id="coupon_selector_row"
            onClick={() => setShowCouponSelector(true)}
            className="bg-[#111115] border border-neutral-850 rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:bg-neutral-900 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-amber-500" />
              <span className="text-xs text-neutral-300">优惠券</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs ${selectedCouponId ? 'text-amber-400 font-bold' : 'text-neutral-500'}`}>
                {selectedCouponId ? `已扣减 ¥${couponDiscount} (${activeCoupon?.title})` : '未使用优惠券'}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-neutral-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>

          {/* Section 5: Order Notes & Contacts */}
          <div className="bg-[#111115] border border-neutral-850 rounded-2xl p-4 space-y-3 shadow-sm text-xs">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">联系方式</span>
              <input
                id="phone_input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="请输入手机号码"
                className="bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-neutral-200 px-3 py-1.5 rounded-lg text-right text-xs outline-none w-44 font-mono font-semibold"
              />
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-neutral-900">
              <span className="text-neutral-400">订单备注</span>
              <input
                id="notes_input"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="请填写您的其他要求 (如多冰、少糖)"
                className="bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-neutral-200 px-3 py-1.5 rounded-lg text-right text-xs outline-none w-52 truncate"
              />
            </div>
          </div>

          {/* Section 6: Summary and Place Order */}
          <div className="bg-[#111115] border border-neutral-850 rounded-2xl p-4 space-y-4 shadow-sm text-xs">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-neutral-300">共 {totalQuantity} 件商品</span>
              <div className="text-right">
                <span className="text-neutral-400 font-normal text-xs mr-1">合计</span>
                <span className="font-mono text-amber-500 text-base">¥ {finalPrice}</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              id="pay_order_btn"
              onClick={handlePayOrder}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 active:from-amber-600 text-black font-extrabold text-xs tracking-wider rounded-xl shadow-lg hover:shadow-amber-500/10 cursor-pointer text-center relative overflow-hidden transition-all uppercase"
            >
              💰 支付并安全下单
            </button>
            <p className="text-[10px] text-neutral-500 text-center select-none font-mono">
              🔒 支持微信账户余额/注册账户多重支付
            </p>
          </div>

        </div>
      ) : (
        /* SUCCESS ANIMATION MODE */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-[84px] h-[84px] rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-5 animate-bounce">
            <CheckCircle className="w-12 h-12 stroke-[2.5]" />
          </div>

          <h3 className="text-lg font-bold text-neutral-100 mb-1 font-sans">
            订单支付成功!
          </h3>
          <p className="text-xs text-neutral-400 mb-4 px-6 leading-relaxed max-w-[280px]">
            您的订单 <b>{placedOrderId}</b> 已送达酒吧后台。我们正在为您快频备制酒水，祝您今晚 Bluff 顺利！
          </p>

          <div className="bg-neutral-900 border border-neutral-850 rounded-xl p-3 max-w-[260px] w-full text-left space-y-1 text-[10.5px] font-mono text-neutral-400">
            <div className="flex justify-between">
              <span>消费品类型:</span>
              <span className="text-neutral-200">{eatingType === 'in-store' ? '店内消费' : '自提包走'}</span>
            </div>
            <div className="flex justify-between">
              <span>桌号/配送:</span>
              <span className="text-neutral-200">一号主卡台</span>
            </div>
            <div className="flex justify-between">
              <span>联系人电话:</span>
              <span className="text-neutral-200">{phone}</span>
            </div>
            <div className="flex justify-between text-amber-500 font-bold">
              <span>合计实付:</span>
              <span>¥ {finalPrice}</span>
            </div>
          </div>

          <div className="mt-8">
            <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-widest block mb-1">
              自动引导返回小程序主页中...
            </span>
          </div>
        </div>
      )}

      {/* Pop-up modal:微信 location permission prompt */}
      {locationPermissionState === 'prompt' && !orderCompleted && (
        <div className="absolute inset-0 bg-black/60 flex items-end justify-center z-50 p-4 select-none animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#15151b] border border-neutral-800 rounded-[28px] w-full max-w-[360px] p-5 shadow-2xl relative overflow-hidden flex flex-col gap-4">
            
            {/* Header info bar */}
            <div className="flex justify-between items-center text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center font-bold text-neutral-950 text-[10px] uppercase font-mono shadow-sm">
                  B7
                </div>
                <span className="font-bold text-neutral-200">Bluff-7 Bar 申请</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">地理位置权限申请</span>
            </div>

            {/* Core Message */}
            <div className="space-y-1.5 mt-1">
              <h4 className="text-base font-bold text-white leading-tight">
                获取你的位置信息
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed text-justify">
                将获取你的具体地理位置坐标（用于计算商家距离与优化店内点单服务）。如若拒绝，您依然可以手动填写地址。
              </p>
            </div>

            {/* Actions button row matching Screen 4 grey and green buttons */}
            <div className="flex gap-2.5 mt-2 text-sm font-semibold select-all">
              <button
                id="reject_location_btn"
                onClick={() => setLocationPermissionState('denied')}
                className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-750 text-neutral-400 rounded-2xl cursor-pointer text-center outline-none"
              >
                拒绝
              </button>
              <button
                id="allow_location_btn"
                onClick={() => setLocationPermissionState('granted')}
                className="flex-1 py-3 bg-[#07c160] hover:bg-[#05b056] text-white rounded-2xl cursor-pointer text-center outline-none shadow-md"
              >
                允许
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Popover coupon selector */}
      {showCouponSelector && !orderCompleted && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 p-4 select-none">
          <div className="bg-[#111115] border border-neutral-800 rounded-2xl w-full max-w-[340px] p-4.5 shadow-2xl relative">
            <h4 className="text-sm font-bold text-neutral-200 border-b border-neutral-900 pb-2 mb-3">
              选择可用优惠卷
            </h4>
            
            <div className="space-y-2 max-h-[220px] overflow-y-auto no-scrollbar">
              {MOCK_COUPONS.map((coupon) => {
                const isApplicable = productSubtotal >= coupon.minSpend;
                const isSelected = selectedCouponId === coupon.id;
                return (
                  <div
                    key={coupon.id}
                    onClick={() => {
                      if (isApplicable) {
                        setSelectedCouponId(isSelected ? null : coupon.id);
                        setShowCouponSelector(false);
                      }
                    }}
                    className={`border p-3 rounded-xl transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-amber-950/20 border-amber-500/80 shadow-md' 
                        : isApplicable 
                          ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                          : 'bg-neutral-950 border-neutral-900 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                          {coupon.title}
                          {isApplicable && <span className="text-[8px] bg-amber-500/20 text-amber-500 border border-amber-500/25 px-1 rounded">可用</span>}
                        </h5>
                        <p className="text-[10px] text-neutral-400 mt-0.5">{coupon.desc}</p>
                      </div>
                      <div className="text-right font-mono font-bold">
                        <span className="text-[10px] text-neutral-400">减</span>
                        <span className="text-amber-500 text-sm ml-0.5">¥{coupon.value}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-900 flex gap-2">
              <button
                id="cancel_coupon_select"
                onClick={() => {
                  setSelectedCouponId(null);
                  setShowCouponSelector(false);
                }}
                className="flex-1 py-2 border border-neutral-800 hover:border-neutral-750 text-neutral-400 rounded-lg text-xs cursor-pointer text-center"
              >
                不使用优惠券
              </button>
              <button
                id="confirm_coupon_select"
                onClick={() => setShowCouponSelector(false)}
                className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 rounded-lg text-xs cursor-pointer text-center"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
