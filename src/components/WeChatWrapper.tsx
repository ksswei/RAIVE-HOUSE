import React, { useState, useEffect } from 'react';
import { Signal, Wifi, Battery, MoreHorizontal, Circle } from 'lucide-react';

interface WeChatWrapperProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  title: string;
  isRegistered: boolean;
  cartCount: number;
}

export default function WeChatWrapper({
  children,
  activeTab,
  setActiveTab,
  title,
  isRegistered,
  cartCount
}: WeChatWrapperProps) {
  const [time, setTime] = useState('21:28');

  // Let's grab the current hours and minutes for simulation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    {
      id: 'order',
      label: '首页',
      icon: (active: boolean) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6 transition-colors duration-200"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'reservation',
      label: '桌台预约',
      icon: (active: boolean) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6 transition-colors duration-200"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <circle cx="10" cy="13" r="2" />
          <path d="m14 17-3-3" />
        </svg>
      )
    },
    {
      id: 'rankings',
      label: '排行榜',
      icon: (active: boolean) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6 transition-colors duration-200"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      id: 'mine',
      label: '我的',
      icon: (active: boolean) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6 transition-colors duration-200"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 min-h-screen bg-neutral-950 text-white font-sans overflow-hidden">
      {/* Decorative Brand Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-red-800/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Simulator Card Component with phone shell styling */}
      <div className="relative w-full max-w-[412px] h-[840px] bg-black rounded-[42px] border-8 border-neutral-800 shadow-2xl flex flex-col overflow-hidden z-10">
        
        {/* Phone Top Speaker/Sensor Notched Bar */}
        <div className="absolute top-0 inset-x-0 h-7 bg-black z-50 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-4 bg-neutral-900 rounded-full flex items-center justify-center gap-1.5 border border-neutral-850">
            <span className="w-1.5 h-1.5 bg-neutral-750 rounded-full" />
            <span className="w-8 h-1 bg-black rounded-full" />
          </div>
        </div>

        {/* WeChat Screen Top Status Bar */}
        <div className="h-11 pt-4 px-6 bg-[#000000] flex justify-between items-center text-[11px] font-medium tracking-tight text-neutral-350 select-none z-40">
          {/* Time display aligned center but styled standard */}
          <span>{time}</span>
          
          {/* Signal, WiFi, Battery Icons */}
          <div className="flex items-center gap-1.5 text-neutral-300">
            <Signal className="w-3.5 h-3.5 stroke-[2]" />
            <span className="text-[9px] font-bold tracking-tight">5G</span>
            <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] scale-95 font-semibold">97%</span>
              <Battery className="w-4 h-4 text-emerald-500 fill-emerald-500/30 rotate-0" />
            </div>
          </div>
        </div>

        {/* WeChat Title Bar Navigator (WeChat top menu bar) */}
        <div className="h-12 px-4 bg-[#000000] border-b border-neutral-900/40 flex justify-between items-center shrink-0 z-40">
          <div className="w-1/3 flex items-center text-sm font-semibold select-all font-sans text-neutral-200">
            {activeTab === 'order' ? (
              <span className="truncate">点单</span>
            ) : activeTab === 'reservation' ? (
              <span className="truncate">桌面</span>
            ) : activeTab === 'rankings' ? (
              <span className="truncate">排行榜</span>
            ) : (
              <span className="truncate">我的</span>
            )}
          </div>
          
          {/* Page Center Theme Title */}
          <div className="w-1/3 text-center text-xs text-neutral-400 font-bold tracking-wider uppercase font-mono truncate">
            {title}
          </div>

          {/* Standard WeChat Capsule Controls: More button and Exit round button */}
          <div className="w-1/3 flex justify-end">
            <div className="h-8 px-2.5 rounded-full bg-neutral-900/90 border border-neutral-800 flex items-center justify-between gap-3.5">
              <button 
                id="wechat_more_button"
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
                onClick={() => alert('微信小程序菜单：\n- 添加到我的小程序\n- 股份本页\n- 关于 RAIVE HOUSE')}
              >
                <MoreHorizontal className="w-4 h-4 stroke-[2.5]" />
              </button>
              <div className="w-px h-3.5 bg-neutral-800" />
              <button 
                id="wechat_exit_button"
                className="text-neutral-300 hover:text-rose-500 transition-colors cursor-pointer"
                onClick={() => {
                  if (confirm('是否退出 RAIVE HOUSE 小程序并回到微信桌面？')) {
                    location.reload();
                  }
                }}
              >
                <Circle className="w-3.5 h-3.5 fill-current stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area of simulated app */}
        <div className="flex-1 bg-neutral-950 flex flex-col relative overflow-y-auto no-scrollbar scroll-smooth">
          {children}
        </div>

        {/* Bottom Simulated iOS Home Indicator bar overlay */}
        <div className="absolute bottom-1 inset-x-0 h-1 flex items-center justify-center pointer-events-none z-50">
          <span className="w-32 h-1 bg-neutral-600 rounded-full" />
        </div>

        {/* WeChat Tab Bar Simulator at absolute bottom */}
        <div className="h-[68px] pb-3 bg-neutral-950 border-t border-neutral-900 flex justify-around items-center shrink-0 z-40 relative">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab_nav_${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center pt-2 select-none relative group transition-all cursor-pointer ${
                  isActive ? 'text-amber-500' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {/* Active Indicator Ring or Glow */}
                <span className="relative z-10">
                  {tab.icon(isActive)}
                </span>
                
                <span className="text-[10px] mt-1 font-semibold tracking-wide select-all font-sans relative z-10">
                  {tab.label}
                </span>

                {/* Simulated Order Cart Badge counter bubble */}
                {tab.id === 'order' && cartCount > 0 && (
                  <span className="absolute top-1.5 left-[54%] bg-red-600 text-white font-mono text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-neutral-950 shadow z-20 animate-pulse">
                    {cartCount}
                  </span>
                )}

                {/* Profile notification badge if not registered */}
                {tab.id === 'mine' && !isRegistered && (
                  <span className="absolute top-1.5 left-[54%] w-2 h-2 rounded-full bg-red-500 z-20 border border-neutral-950" />
                )}

                {/* Background overlay on active */}
                {isActive && (
                  <span className="absolute inset-x-4 top-1 bottom-1 bg-amber-500/5 rounded-2xl filter blur-[2px] transition-all" />
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Developer info / Desktop Sidebar Panel with helper debug logs to enrich simulation */}
      <div className="hidden lg:flex flex-col gap-4 absolute left-8 top-1/2 -translate-y-1/2 w-80 bg-neutral-900/40 backdrop-blur-md rounded-2xl p-5 border border-neutral-800 text-neutral-300 shadow-xl max-h-[80%] overflow-y-auto">
        <h3 className="text-amber-500 font-mono font-bold tracking-wider text-sm border-b border-neutral-800 pb-2 mb-2 flex items-center gap-1.5">
          <span>●</span> RAIVE HOUSE SIMULATOR
        </h3>
        <p className="text-xs text-neutral-400 leading-relaxed">
          这是一个完美的 <b>微信小程序沙盒交互环境</b>。模拟了 <i>RAIVE HOUSE 为德州扑克与鸡尾酒精调酒吧</i> 深度定制的私享小程序。
        </p>

        <div className="space-y-3.5 my-3">
          <div className="bg-black/40 border border-neutral-850 rounded-lg p-2.5">
            <span className="text-[10px] text-amber-500/80 font-mono block mb-1">【点单与结算】</span>
            <span className="text-xs text-neutral-400">
              点单页面完美融合了教父、尼格罗尼等酒水，点击购物车结算时，可以切换<b>“店内消费”</b>或<b>“打包带走”</b>并触发微信原生般的位置权限授权！
            </span>
          </div>

          <div className="bg-black/40 border border-neutral-850 rounded-lg p-2.5">
            <span className="text-[10px] text-amber-500/80 font-mono block mb-1">【竞技桌预约】</span>
            <span className="text-xs text-neutral-400">
              德州竞技桌A配备 9 个座位，可以通过实名注册后，自选任意空闲机位，实时进行锁定、退座或加入排队候补列表！
            </span>
          </div>

          <div className="bg-black/40 border border-neutral-850 rounded-lg p-2.5">
            <span className="text-[10px] text-amber-500/80 font-mono block mb-1">【排行榜与积分】</span>
            <span className="text-xs text-neutral-400">
              在【排行榜】中切换本月、上月及总榜，加入会员后可以通过点单增加大师分（积分），自动登上荣耀榜首。
            </span>
          </div>
        </div>

        <div className="text-[10px] text-neutral-500 font-mono flex flex-col gap-1 border-t border-neutral-800 pt-3">
          <div className="flex justify-between">
            <span>注册会员名:</span>
            <span className={isRegistered ? "text-emerald-400 font-semibold" : "text-amber-500"}>
              {isRegistered ? "已注册" : "未注册"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>购物车数量:</span>
            <span>{cartCount} 杯</span>
          </div>
          <div className="flex justify-between">
            <span>模拟小程序包大小:</span>
            <span>1.84 MB</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col gap-4 absolute right-8 top-1/2 -translate-y-1/2 w-80 bg-neutral-900/40 backdrop-blur-md rounded-2xl p-5 border border-neutral-800 text-neutral-300 shadow-xl">
        <h3 className="text-amber-500 font-mono font-bold tracking-wider text-sm border-b border-neutral-800 pb-2 mb-2 flex items-center gap-1.5">
          <span>◆</span> 快速模拟操作
        </h3>
        <p className="text-xs text-neutral-400">
          通过此面板一键重置、或者快速测试不同的情景：
        </p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button 
            id="sim_btn_register"
            onClick={() => {
              const registerEvent = new CustomEvent('sim-register');
              window.dispatchEvent(registerEvent);
            }} 
            className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-amber-500/30 text-xs text-center rounded-lg transition-all font-mono font-bold outline-none cursor-pointer"
          >
            {isRegistered ? "🔄 更换账号" : "✨ 快捷注册"}
          </button>
          <button 
            id="sim_btn_add_money"
            onClick={() => {
              const moneyEvent = new CustomEvent('sim-add-money');
              window.dispatchEvent(moneyEvent);
            }}
            className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-amber-500/30 text-xs text-center rounded-lg transition-all font-mono font-bold outline-none cursor-pointer"
          >
            💰 充值100元
          </button>
          <button 
            id="sim_btn_add_points"
            onClick={() => {
              const pointsEvent = new CustomEvent('sim-add-points');
              window.dispatchEvent(pointsEvent);
            }}
            className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-amber-500/30 text-xs text-center rounded-lg transition-all font-mono font-bold outline-none cursor-pointer"
          >
            🌟 大师分+50
          </button>
          <button 
            id="sim_btn_reset_booking"
            onClick={() => {
              const resetEvent = new CustomEvent('sim-reset-booking');
              window.dispatchEvent(resetEvent);
            }}
            className="px-2.5 py-1.5 bg-red-950/40 hover:bg-red-900/30 border border-red-900/40 hover:border-red-700 text-xs text-rose-300 text-center rounded-lg transition-all font-mono font-bold outline-none cursor-pointer"
          >
            🧹 清空定位/订座
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-800">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">熠火系统支持 • V1.4.1</span>
        </div>
      </div>
    </div>
  );
}
