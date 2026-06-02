import React, { useState } from 'react';
import { 
  Wifi, 
  Wine, 
  MapPin, 
  ChevronRight, 
  CreditCard, 
  ShoppingBag, 
  Award, 
  Copy, 
  X,
  Share2,
  ThumbsUp,
  Info
} from 'lucide-react';
import { UserProfile } from '../types';

interface HomeScreenProps {
  user: UserProfile;
  onSelectTab: (tab: string) => void;
  onOpenOrderMenu: () => void;
  onOpenRecharge: () => void;
  onOpenStoredAlcohol: () => void;
  onOpenPointsMall: () => void;
}

export default function HomeScreen({
  user,
  onSelectTab,
  onOpenOrderMenu,
  onOpenRecharge,
  onOpenStoredAlcohol,
  onOpenPointsMall
}: HomeScreenProps) {
  // Local modals
  const [showWifiModal, setShowWifiModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showShareholderModal, setShowShareholderModal] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);

  const [copiedWifi, setCopiedWifi] = useState(false);

  const copyWifiPassword = () => {
    navigator.clipboard.writeText('raive888888');
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-[#f2efe4] via-[#ece8d9] to-[#dfdad0] p-4 text-[#1a1a1e] flex flex-col justify-between overflow-y-auto no-scrollbar relative font-serif selection:bg-amber-100 select-all">
      
      {/* Absolute faint background playing card line prints */}
      <div className="absolute right-2 top-36 text-stone-900/4 font-sans text-[160px] pointer-events-none select-none">
        K
      </div>
      <div className="absolute left-1 bottom-36 text-stone-900/4 font-sans text-[160px] pointer-events-none select-none">
        J
      </div>

      <div className="space-y-4">
        {/* TOP MOTTO & MINI BANNER */}
        <div className="text-center pt-2 select-none">
          {/* Hour & Crown Badge */}
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-700 animate-pulse" />
            <span className="text-[10px] font-sans text-stone-500 tracking-widest uppercase">
              Play the hand you're dealt, own the night.
            </span>
          </div>

          {/* MAIN BRAND TITLE - HANDCRAFTED WEBPAGE GRAPHICS */}
          <div className="relative inline-block mt-1">
            {/* Crown icon on top */}
            <div className="flex justify-center mb-0.5">
              <span className="text-[18px] text-[#aa2c2c] animate-bounce">👑</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-wider text-stone-950 font-serif relative flex items-center justify-center gap-1.5">
              <span>R</span>
              <span className="text-stone-900 text-3xl">a</span>
              <span className="text-rose-900 transform rotate-6">i</span>
              <span className="text-red-800">v</span>
              <span className="text-[#aa2c2c] text-5xl font-mono">e</span>
            </h1>
            
            <p className="text-[11.5px] font-sans font-extrabold text-stone-605 tracking-[0.25em] uppercase text-center mt-1">
              RAIVE HOUSE 酒馆
            </p>
            
            {/* Elegant double border line decor */}
            <div className="w-24 h-[1.5px] bg-amber-800/35 mx-auto mt-2 relative">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[7px] text-[#aa2c2c]">◆</span>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: 点单 (ORDER) CARD VS STATUS PORTALS BUTTONS */}
        <div className="grid grid-cols-12 gap-3.5 pt-1.5">
          {/* LEFT: Massive Vertical 点单 Playing Card */}
          <button
            id="home_order_playing_card"
            onClick={onOpenOrderMenu}
            className="col-span-7 aspect-[3.2/4] bg-white border-[3px] border-stone-900 rounded-2xl p-3.5 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#aa2c2c] transition-all cursor-pointer text-left"
          >
            {/* Card corner spade */}
            <div className="flex flex-col items-center justify-start text-[10px] text-stone-900 select-none font-mono leading-none">
              <span className="font-bold">A</span>
              <span className="text-xs">♠️</span>
            </div>

            {/* Giant Center Spade with "点单 ORDER" Text inside */}
            <div className="flex flex-col items-center justify-center text-center my-auto py-2">
              <span className="text-[64px] text-stone-950 leading-none filter drop-shadow-md select-none">
                ♠️
              </span>
              <div className="mt-1 space-y-0.5 z-10">
                <h2 className="text-xl font-bold tracking-widest text-stone-950 font-serif">
                  点单
                </h2>
                <p className="text-[9px] font-mono font-bold tracking-widest text-[#aa2c2c] uppercase">
                  ✦ ORDER ✦
                </p>
                <p className="text-[9.5px] font-sans text-stone-600">
                  美食 • 酒水 • 娱乐
                </p>
              </div>
            </div>

            {/* Opposite corner inverted spade */}
            <div className="flex flex-col items-center justify-end text-[10px] text-stone-900 select-none font-mono leading-none transform rotate-180 self-end">
              <span className="font-bold">A</span>
              <span className="text-xs">♠️</span>
            </div>

            {/* Hover ripple subtle glow overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-red-650 via-[#aa2c2c] to-stone-950 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          {/* RIGHT: Three Elegant Dark Rounded Stack Buttons */}
          <div className="col-span-5 flex flex-col justify-between gap-2.5">
            {/* 1. WIFI */}
            <button
              id="home_btn_wifi"
              onClick={() => setShowWifiModal(true)}
              className="flex-1 bg-[#1e1d1f] hover:bg-[#2e2d2f] text-white rounded-xl p-2.5 flex items-center justify-between border border-stone-800 shadow transition-all cursor-pointer text-left group"
            >
              <div className="space-y-0.5 select-text">
                <p className="text-[11.5px] font-sans font-extrabold tracking-tight text-neutral-100 group-hover:text-amber-400">
                  查看WiFi
                </p>
                <p className="text-[8.5px] font-mono text-neutral-400 uppercase tracking-widest">WIFI</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-amber-500 scale-95 shrink-0">
                <Wifi className="w-4 h-4 stroke-[2]" />
              </div>
            </button>

            {/* 2. CUSTOMER CELLAR */}
            <button
              id="home_btn_cellar"
              onClick={onOpenStoredAlcohol}
              className="flex-1 bg-white hover:bg-stone-50 text-stone-950 rounded-xl p-2.5 flex items-center justify-between border-2 border-stone-900 shadow-md transition-all cursor-pointer text-left group"
            >
              <div className="space-y-0.5">
                <p className="text-[11.5px] font-sans font-extrabold tracking-tight text-stone-950 group-hover:text-red-700">
                  存取酒
                </p>
                <p className="text-[8.5px] font-mono text-stone-500 uppercase tracking-widest">MY CELLAR</p>
              </div>
              {/* Premium red heart insignia instead */}
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#aa2c2c] scale-95 shrink-0 select-none">
                ❤️
              </div>
            </button>

            {/* 3. STORE LOCATION */}
            <button
              id="home_btn_location"
              onClick={() => setShowLocationModal(true)}
              className="flex-1 bg-[#1e1d1f] hover:bg-[#2e2d2f] text-white rounded-xl p-2.5 flex items-center justify-between border border-stone-800 shadow transition-all cursor-pointer text-left group"
            >
              <div className="space-y-0.5 select-text">
                <p className="text-[11.5px] font-sans font-extrabold tracking-tight text-neutral-100 group-hover:text-amber-400">
                  门店定位
                </p>
                <p className="text-[8.5px] font-mono text-neutral-400 uppercase tracking-widest">LOCATION</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-teal-400 scale-95 shrink-0">
                <MapPin className="w-4 h-4 stroke-[2]" />
              </div>
            </button>
          </div>
        </div>

        {/* INTERACTIVE FULL-WIDTH SECTION: "绿色娱乐 禁止赌博 点击查看" */}
        <button
          id="home_disclaimer_banner"
          onClick={() => setShowDisclaimerModal(true)}
          className="w-full bg-stone-950 text-white rounded-xl py-3 px-4 shadow-lg border border-stone-800 flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            {/* Small beautiful poker chip */}
            <div className="w-7 h-7 rounded-full bg-white text-stone-950 font-bold border border-dashed border-stone-900 flex items-center justify-center text-[10px] animate-spin-slow shrink-0 select-none">
              👑
            </div>
            <div className="text-left">
              <span className="text-[12px] font-sans font-extrabold tracking-widest text-[#ece6d3] block group-hover:text-red-400 transition-colors">
                绿色娱乐 禁止赌博
              </span>
              <span className="text-[8.5px] font-mono text-stone-500 block uppercase">
                POKER RULES • 点击查看
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-white transition-all transform group-hover:translate-x-0.5" />
        </button>

        {/* QUEEN OF DIAMONDS: RECHARGE CARD INTERACTIVE BLOCK */}
        <div className="w-full bg-white border-[3px] border-stone-900 rounded-2xl p-4 shadow-xl flex justify-between items-center relative overflow-hidden group">
          {/* Card inner decorations */}
          <div className="absolute top-1 left-1.5 text-[8px] text-red-700 font-mono font-bold leading-none select-none">
            Q<br />♦️
          </div>
          <div className="absolute bottom-1 right-1.5 text-[8px] text-red-700 font-mono font-bold leading-none select-none transform rotate-180">
            Q<br />♦️
          </div>

          <div className="space-y-3 z-10 pl-2">
            <div className="space-y-0.5">
              <h3 className="text-[15px] font-extrabold text-stone-950 tracking-tight flex items-center gap-1">
                <span className="text-red-700 text-xs">♦️</span>
                <span>充值 储值有礼</span>
              </h3>
              <p className="text-[9px] font-sans text-stone-500">
                储值即享酒水优惠与排卡竞技座特权
              </p>
            </div>

            <div className="py-1">
              <span className="text-[10px] text-stone-400 block font-mono">ACCOUNT BALANCE</span>
              <p className="text-xl font-black font-mono text-stone-900">
                余额：<span className="text-2xl text-red-700">¥ {user.balance}</span>
              </p>
            </div>

            <button
              id="home_quick_recharge_trigger"
              onClick={onOpenRecharge}
              className="px-4 py-1.5 bg-[#931c1c] hover:bg-[#7d1414] text-white text-[10.5px] font-bold rounded-full shadow-md transition-all cursor-pointer text-center"
            >
              立即充值 ‣
            </button>
          </div>

          {/* Right side beautifully styled Queen of Diamonds vintage line art illustration */}
          <div className="w-24 h-28 transform translate-x-1 translate-y-1 relative shrink-0 select-none border border-stone-400 bg-[#fbf9f4] p-1.5 rounded-lg shadow flex flex-col justify-between items-center">
            <span className="text-[7px] text-stone-400 absolute top-1 left-1.5">QUEEN OF DIAMONDS</span>
            <div className="w-full flex-1 flex items-center justify-center py-2">
              {/* Dynamic crown & diamond graphics */}
              <div className="text-center">
                <span className="text-3xl block filter drop-shadow">👸</span>
                <span className="text-red-600 block text-xs -mt-1">♦️</span>
              </div>
            </div>
            <span className="text-[7.5px] text-stone-400 uppercase tracking-widest font-mono">RAIVE AUTH</span>
          </div>
        </div>

        {/* BOTTOM ROW: TWO SPLIT COLUMN PROJECTS */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* 1st: POINTS MALL */}
          <button
            id="home_bottom_mall_card"
            onClick={onOpenPointsMall}
            className="bg-[#1e1d1f] hover:bg-[#2a292b] text-white rounded-xl p-3.5 border border-stone-800 shadow-md flex items-center gap-2.5 transition-all cursor-pointer text-left group"
          >
            {/* Shopping cart icon disguised inside a round chip indicator */}
            <div className="w-9 h-9 rounded-full bg-stone-900 text-amber-500 border border-stone-850 flex items-center justify-center text-sm shrink-0 select-none">
              🛒
            </div>
            <div className="space-y-0.5">
              <span className="text-[11.5px] font-sans font-extrabold text-neutral-105 block group-hover:text-amber-400">
                积分商城
              </span>
              <span className="text-[8px] font-mono text-neutral-500 block uppercase tracking-widest">
                POINTS MALL
              </span>
            </div>
          </button>

          {/* 2nd: SHAREHOLDER DYNAMIC BOARD */}
          <button
            id="home_bottom_shareholder_card"
            onClick={() => setShowShareholderModal(true)}
            className="bg-white hover:bg-stone-50 text-stone-950 rounded-xl p-3.5 border-[2.5px] border-stone-900 shadow-md flex items-center gap-2.5 transition-all cursor-pointer text-left group"
          >
            {/* Club symbol within tiny card background */}
            <div className="w-9 h-9 rounded-full bg-stone-100 text-[#aa2c2c] border border-stone-900/10 flex items-center justify-center text-sm shrink-0 select-none">
              ♣️
            </div>
            <div className="space-y-0.5">
              <span className="text-[11.5px] font-sans font-extrabold text-stone-950 block group-hover:text-red-700">
                共享股东
              </span>
              <span className="text-[8px] font-mono text-stone-500 block uppercase tracking-widest">
                SHAREHOLDER
              </span>
            </div>
          </button>
        </div>

      </div>



      {/* =========================================
                     MODALS POPUPS
         ========================================= */}

      {/* 1. WIFI MODAL */}
      {showWifiModal && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111115] text-white border border-neutral-800 rounded-3xl p-5 max-w-[320px] w-full relative shadow-2xl">
            <button
              id="close_wifi_modal"
              onClick={() => setShowWifiModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-neutral-850 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2 mb-4 select-none">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-2 border border-amber-500/20">
                <Wifi className="w-6 h-6 stroke-[2]" />
              </div>
              <h4 className="text-sm font-bold text-neutral-200">RAIVE HOUSE 尊享客户 WiFi</h4>
              <p className="text-[11px] text-[#8e8d95] tracking-wide">
                已调配千兆光纤，高速体验德州与点单
              </p>
            </div>

            <div className="bg-neutral-950 p-3.5 rounded-2xl border border-neutral-850 space-y-3 font-mono text-xs select-all">
              <div className="flex justify-between items-center border-b border-neutral-900 pb-2">
                <span className="text-neutral-500 text-[10.5px]">无线网络账号</span>
                <span className="text-white font-bold select-all">RAIVE_HOUSE_5G</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-neutral-500 text-[10.5px]">专属连接密码</span>
                <span className="text-white font-bold font-mono tracking-wider select-all">raive888888</span>
              </div>
            </div>

            <button
              onClick={copyWifiPassword}
              className="w-full mt-4 py-2.5 bg-gradient-to-r from-stone-800 to-stone-900 text-white font-bold text-xs rounded-xl shadow cursor-pointer text-center select-none"
            >
              {copiedWifi ? '✅ 密码已复制到剪贴板！' : '📋 复制 WiFi 密码'}
            </button>
          </div>
        </div>
      )}

      {/* 2. LOCATION MODAL */}
      {showLocationModal && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111115] text-white border border-neutral-800 rounded-3xl p-5 max-w-[320px] w-full relative shadow-2xl">
            <button
              id="close_location_modal"
              onClick={() => setShowLocationModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-neutral-850 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2 mb-4 select-none">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto mb-2 border border-teal-500/20">
                <MapPin className="w-6 h-6 stroke-[2]" />
              </div>
              <h4 className="text-sm font-bold text-neutral-200">RAIVE HOUSE 酒馆位置</h4>
              <p className="text-[11px] text-stone-500 font-sans">汇隆中心皇尊臻选店</p>
            </div>

            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 space-y-3.5 text-xs select-all text-justify">
              <p className="leading-relaxed">
                <strong className="text-teal-450 block mb-1">📍 门店地址: </strong>
                广东省东莞市黄江镇板湖路30号汇隆中心9楼
              </p>
              <p className="leading-relaxed text-neutral-400">
                <strong className="text-[#aa2c2c] block mb-1">⏱️ 营业时间:</strong>
                周一至周日 19:30 - 次日04:00 (含竞技配桌时段)
              </p>
              <p className="text-[10px] text-stone-500 leading-normal font-sans">
                💡 乘车建议：汇隆中心写字楼乘东侧3号梯直达9楼即是；地下车库配海量车位，客人离店免收5小时停车费。
              </p>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText('广东省东莞市黄江镇板湖路30号汇隆中心9楼 RAIVE HOUSE');
                alert('门店详细地址复制成功！已为您规划最优路线 🚗');
              }}
              className="w-full mt-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow cursor-pointer text-center transition-all"
            >
              📋 复制完整地址，去导航
            </button>
          </div>
        </div>
      )}

      {/* 3. SHAREHOLDER MODAL */}
      {showShareholderModal && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111115] text-white border border-neutral-800 rounded-3xl p-5 max-w-[325px] w-full relative shadow-2xl">
            <button
              id="close_shareholder_modal"
              onClick={() => setShowShareholderModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-neutral-850 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1.5 mb-4 select-none">
              <span className="text-[9.5px] bg-[#961e1e] text-white px-2 py-0.5 rounded uppercase font-mono font-bold">
                RAIVE HOUSE 合伙股份
              </span>
              <h4 className="text-sm font-bold text-neutral-200">
                共享股东特权看板
              </h4>
            </div>

            <div className="space-y-3.5 text-xs text-justify">
              <p className="text-neutral-400 text-xs leading-relaxed">
                欢迎参与 <b>“熠火合伙”</b> 共享股东计划。点单消费或累计德州竞技次数即可兑换虚拟期权点，无需投入资金，即可按股解锁全场折扣与每日返水：
              </p>

              <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-850 space-y-2.5 select-all font-mono">
                <div className="flex justify-between text-neutral-450 border-b border-neutral-900 pb-1.5">
                  <span>我的股东状态:</span>
                  <span className="text-amber-500 font-bold font-sans">🏆 黄金合伙人</span>
                </div>
                <div className="flex justify-between text-neutral-450 border-b border-neutral-900 pb-1.5">
                  <span>持股虚拟份额:</span>
                  <span className="text-white font-bold text-xs">0.245 %</span>
                </div>
                <div className="flex justify-between text-neutral-450">
                  <span>累计分红溢出:</span>
                  <span className="text-emerald-400 font-bold text-xs">¥ 284.12 元</span>
                </div>
              </div>

              <div className="space-y-1 bg-stone-900/30 p-2.5 rounded-xl border border-[#232228] select-none text-[10px] text-stone-400 leading-normal leading-relaxed">
                <p className="font-bold text-stone-300">💎 股东专属特权:</p>
                <p>1. 全场手工特调鸡尾酒、高端威士忌专享 <b>9.2折</b> 自动免扣结账。</p>
                <p>2. 排卡定座时拥有 <b>高阶包厢插队优先权</b>。</p>
                <p>3. 邀请新德友进店消费可得 3% 的期权股份返点。</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  alert('分享专属股东特权链接成功！邀请新玩家注册得 100 积分与股份返利 🎁');
                }}
                className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-850 text-white rounded-xl text-xs font-bold border border-neutral-800 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>邀请分红</span>
              </button>
              <button
                onClick={() => {
                  alert('恭喜虚拟期权金 ¥284.12 已成功转入您的账户余额！🎉');
                }}
                className="flex-1 py-2.5 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-950 text-white font-extrabold text-xs tracking-wide rounded-xl shadow-md cursor-pointer text-center text-center transition-all"
              >
                📥 提取分红
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. ANYA DISMISS disclaimer MODAL SCREEN (MATCHING SCREEN 2 SCREENSHOT) */}
      {showDisclaimerModal && (
        <div className="absolute inset-0 bg-[#07070a] text-white flex flex-col justify-between p-5 z-50 animate-in fade-in zoom-in-95 duration-200 select-all">
          
          {/* Top disclaimer dismiss */}
          <div className="flex justify-between items-center select-none pt-4">
            <span className="text-[10px] tracking-widest text-[#aa2c2c] font-mono uppercase font-black">
              RAIVE WARNING SCREEN
            </span>
            <button
              id="close_disclaimer_overlay"
              onClick={() => setShowDisclaimerModal(false)}
              className="px-3 py-1 bg-[#101014] border border-neutral-850 hover:border-neutral-700 text-neutral-350 hover:text-white rounded-full text-[10.5px] font-mono cursor-pointer transition-colors"
            >
              CLOSE 返回 ✕
            </button>
          </div>

          {/* Center visual layout matching Screen 2 */}
          <div className="my-auto space-y-6 flex flex-col items-center justify-center">
            
            {/* 4 Aces stack with Bluff lettering */}
            <div className="relative text-center select-none pt-2">
              {/* Stack of playing cards: Aces */}
              <div className="flex justify-center -space-x-4 mb-2 animate-pulse">
                {/* Spades */}
                <div className="w-12 h-16 bg-white border-2 border-stone-900 rounded shadow transform -rotate-12 flex flex-col justify-between p-1 text-stone-950">
                  <span className="text-[8px] font-extrabold leading-none">A<br />♠️</span>
                  <span className="text-base text-center self-center">♠️</span>
                  <span className="text-[8px] font-extrabold leading-none self-end transform rotate-180">A<br />♠️</span>
                </div>
                {/* Hearts */}
                <div className="w-12 h-16 bg-white border-2 border-stone-900 rounded shadow transform -rotate-3 flex flex-col justify-between p-1 text-red-600">
                  <span className="text-[8px] font-extrabold leading-none">A<br />♥️</span>
                  <span className="text-base text-center self-center">♥️</span>
                  <span className="text-[8px] font-extrabold leading-none self-end transform rotate-180">A<br />♥️</span>
                </div>
                {/* Clubs */}
                <div className="w-12 h-16 bg-white border-2 border-stone-900 rounded shadow transform rotate-6 flex flex-col justify-between p-1 text-stone-950">
                  <span className="text-[8px] font-extrabold leading-none">A<br />♣️</span>
                  <span className="text-base text-center self-center">♣️</span>
                  <span className="text-[8px] font-extrabold leading-none self-end transform rotate-180">A<br />♣️</span>
                </div>
                {/* Diamonds */}
                <div className="w-12 h-16 bg-white border-2 border-stone-900 rounded shadow transform rotate-12 flex flex-col justify-between p-1 text-red-600">
                  <span className="text-[8px] font-extrabold leading-none">A<br />♦️</span>
                  <span className="text-base text-center self-center">♦️</span>
                  <span className="text-[8px] font-extrabold leading-none self-end transform rotate-180">A<br />♦️</span>
                </div>
              </div>

              {/* Bold custom lettering header: RAIVE HOUSE */}
              <h2 className="text-4xl font-black tracking-widest text-[#f5f5f5] font-serif uppercase">
                RAIVE<span className="text-[#aa2c2c]"> HOUSE</span>
              </h2>
              <p className="text-[9px] font-sans text-neutral-500 uppercase tracking-[0.25em] mt-1">
                CIVILIZED DE友 CLUB
              </p>
            </div>

            {/* Anime Crying Anya crying tears (Anya mock character mockup) */}
            <div className="relative flex flex-col items-center">
              {/* Animated Crying Anime character wrapper */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Cartoon Tears/Flow lines (SVG-like animations) */}
                <div className="absolute top-12 left-4 text-cyan-400 text-xl animate-bounce">💧</div>
                <div className="absolute top-14 right-4 text-cyan-400 text-xl animate-bounce delay-150">💧</div>
                
                {/* Emoji/Character depiction matching anime mockup in screenshot */}
                <div className="text-[120px] filter drop-shadow-lg select-none leading-none animate-bounce">
                  😭
                </div>

                {/* Little speech bubble */}
                <div className="absolute -top-4 right-1 bg-white/10 backdrop-blur-md border border-white/20 text-[9.5px] px-2 py-1 rounded-xl text-neutral-300">
                  “老板，请文明竞技！”
                </div>
              </div>
              <p className="text-[10px] text-stone-400 max-w-[240px] text-center italic mt-1 leading-relaxed">
                德友切磋纯属休闲博弈，严禁任何形式的财物非法赌数与线下结算！
              </p>
            </div>

            {/* Red Felt Card Table Visual (with chips block) */}
            <div className="w-full max-w-[290px] aspect-[2.4/1] rounded-full border-4 border-amber-900/40 bg-gradient-to-b from-[#7a1010] to-[#510404] p-3 flex flex-col justify-between shadow-2xl relative overflow-hidden select-none border-stone-950">
              {/* Felt Pattern Circle lines */}
              <div className="absolute inset-1 rounded-full border border-teal-500/10 pointer-events-none" />
              
              {/* Minimal Logo inside felt */}
              <div className="my-auto text-center space-y-0.5 opacity-60">
                <span className="text-[14px] text-stone-200/90 font-serif leading-none tracking-widest block font-bold">
                  RAIVE HOUSE
                </span>
                <span className="text-[8px] font-mono text-amber-500 block">✦ CLUB ✦</span>
              </div>

              {/* Stack of Poker chips on felt */}
              <div className="absolute bottom-1.5 left-4 flex gap-0.5 filter drop-shadow">
                <div className="w-5 h-4 bg-neutral-900 border border-neutral-700 rounded flex flex-col justify-start text-[7px] text-white font-mono font-bold items-center leading-none">
                  <span>♦️</span>
                </div>
                <div className="w-5 h-4 bg-[#961e1e] border border-red-800 rounded flex flex-col justify-start text-[7px] text-white font-mono font-bold items-center leading-none -ml-1">
                  <span>♣️</span>
                </div>
                <div className="w-5 h-4 bg-amber-500 border border-amber-600 rounded flex flex-col justify-start text-[7px] text-stone-950 font-mono font-bold items-center leading-none -ml-1">
                  <span>⭐️</span>
                </div>
              </div>
            </div>

          </div>

          {/* Disclaimer text at footer */}
          <div className="space-y-3.5 select-none text-center">
            <div className="w-full text-center relative flex items-center justify-center gap-1.5 text-stone-500 text-xs">
              <span className="text-red-700">♣️</span>
              <span className="font-sans font-bold text-neutral-350 tracking-wide select-all">
                绿色娱乐 禁止赌博
              </span>
              <span className="text-red-705">♣️</span>
            </div>

            {/* Faint design credit progress bar */}
            <div className="h-0.5 bg-neutral-900 w-36 mx-auto rounded-full overflow-hidden">
              <div className="h-full bg-red-700 w-1/2 animate-pulse" />
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
