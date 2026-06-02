import React, { useState } from 'react';
import { UserProfile, Order } from '../types';
import { MOCK_COUPONS } from '../data';
import { 
  MapPin, 
  Wine, 
  ShoppingBag, 
  Ticket, 
  ClipboardList, 
  Award, 
  Phone, 
  Flame, 
  X,
  CreditCard,
  Plus
} from 'lucide-react';

interface MineScreenProps {
  user: UserProfile;
  orders: Order[];
  registerUser: (nickname: string, phone: string) => void;
  onAddBalance: (amount: number) => void;
  onSelectTab: (tab: string) => void;
}

export default function MineScreen({
  user,
  orders,
  registerUser,
  onAddBalance,
  onSelectTab
}: MineScreenProps) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // Active details modal status
  const [activeFeatureModal, setActiveFeatureModal] = useState<string | null>(null);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      alert('请填写完整的会员昵称和电话号码');
      return;
    }
    registerUser(regName.trim(), regPhone.trim());
    setShowRegisterModal(false);
    alert(`恭喜注册成功！已为您派发全场【全场首杯半价券】及 100 初始积分！🎁`);
  };

  const featureItems = [
    { id: 'address', label: '我的地址', icon: <MapPin className="w-6 h-6 stroke-[1.8]" />, subtitle: '管理收货信息' },
    { id: 'stored', label: '我的存酒', icon: <Wine className="w-6 h-6 stroke-[1.8]" />, subtitle: '您的私人存酒库' },
    { id: 'mall', label: '积分商城', icon: <ShoppingBag className="w-6 h-6 stroke-[1.8]" />, subtitle: '积分专享好物' },
    { id: 'coupons', label: '我的优惠券', icon: <Ticket className="w-6 h-6 stroke-[1.8]" />, subtitle: '待使用抵用金' },
    { id: 'orders', label: '订单中心', icon: <ClipboardList className="w-6 h-6 stroke-[1.8]" />, subtitle: '查看历史详情' },
    { id: 'master', label: '大师分', icon: <Award className="w-6 h-6 stroke-[1.8]" />, subtitle: '德州竞技排位' },
  ];

  return (
    <div className="flex-1 bg-[#101014] p-4 text-neutral-200 select-all flex flex-col no-scrollbar justify-between">
      
      <div className="space-y-4">
        {/* SECTION 1: Registered Profile vs Member Registration Card */}
        {!user.isRegistered ? (
          <div className="bg-[#e4e1d9] text-[#1a1a1a] rounded-[24px] p-5 border border-amber-100 shadow-xl relative overflow-hidden flex justify-between items-center select-none">
            <div className="space-y-1.5 max-w-[200px]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#a62b2b] text-base">👑</span>
                <h3 className="text-base font-extrabold tracking-tight text-neutral-900 select-all">
                  会员注册
                </h3>
              </div>
              <p className="text-[11px] text-neutral-550 leading-relaxed font-medium select-all">
                注册后解锁首杯半价、存酒托管及德州竞技订座特权
              </p>
            </div>

            <button
              id="mine_register_trigger"
              onClick={() => setShowRegisterModal(true)}
              className="px-4 py-2 bg-[#961e1e] hover:bg-[#800d0d] text-white text-xs font-bold rounded-full shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] outline-none cursor-pointer text-center"
            >
              立即注册
            </button>

            {/* Faint chess backing design */}
            <div className="absolute right-[-10px] bottom-[-22px] text-stone-900/10 font-serif text-[110px] pointer-events-none">
              ♠️
            </div>
          </div>
        ) : (
          /* Profile Card on successful registration */
          <div className="bg-gradient-to-br from-[#1c1c24] to-[#141419] rounded-[24px] p-5 border border-neutral-800 shadow-xl relative overflow-hidden flex justify-between items-center select-all">
            <div className="flex items-center gap-4.5">
              <div className="w-[52px] h-[52px] rounded-full border border-amber-500/20 overflow-hidden bg-neutral-950 shrink-0">
                <img src={user.avatar} alt={user.nickname} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-extrabold text-white">{user.nickname}</h3>
                  <span className="text-[9px] bg-red-950 text-amber-500 font-bold border border-red-900/40 px-1.5 py-0.2 rounded-full font-sans">
                    尊贵会员
                  </span>
                </div>
                <p className="text-[10.5px] text-neutral-450 font-mono">
                  {user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
                </p>
              </div>
            </div>

            <div className="text-right z-10 select-none">
              <span className="text-[9px] tracking-widest text-[#d4af37] font-mono font-bold uppercase block">
                BLUFF皇冠尊享
              </span>
              <span className="text-[8.5px] text-neutral-500 block mt-0.5">会员卡号: B7-00281</span>
            </div>

            {/* Faint poker chip decor */}
            <div className="absolute right-[-2px] bottom-[-18px] text-neutral-800/25 font-serif text-[90px] pointer-events-none">
              ♣️
            </div>
          </div>
        )}

        {/* SECTION 2: Horizontal Count Stats Row (余额, 优惠券, 积分) */}
        <div className="bg-[#15151b] border border-neutral-850 rounded-[20px] p-4.5 select-all shadow-sm grid grid-cols-3 divide-x divide-neutral-850 text-center relative overflow-hidden">
          {/* Balance Item */}
          <div 
            id="stat_col_balance"
            onClick={() => setActiveFeatureModal('balance')}
            className="flex flex-col justify-center cursor-pointer hover:bg-neutral-900/30 transition-all py-1 rounded"
          >
            <span className="text-[10px] text-neutral-500 font-bold block mb-1">余额</span>
            <span className="text-lg font-black text-white font-mono">
              {user.balance} <span className="text-[10px] text-neutral-500 font-normal">元</span>
            </span>
          </div>

          {/* Coupon Count Item */}
          <div 
            id="stat_col_coupons"
            onClick={() => setActiveFeatureModal('coupons')}
            className="flex flex-col justify-center cursor-pointer hover:bg-neutral-900/30 transition-all py-1 rounded"
          >
            <span className="text-[10px] text-neutral-500 font-bold block mb-1">优惠券</span>
            <span className="text-lg font-black text-amber-400 font-mono">
              {user.isRegistered ? user.couponsCount : 0} <span className="text-[10px] text-neutral-500 font-normal">张</span>
            </span>
          </div>

          {/* Points/Score Item */}
          <div 
            id="stat_col_points"
            onClick={() => setActiveFeatureModal('master')}
            className="flex flex-col justify-center cursor-pointer hover:bg-neutral-900/30 transition-all py-1 rounded"
          >
            <span className="text-[10px] text-neutral-500 font-bold block mb-1">积分</span>
            <span className="text-lg font-black text-white font-mono">
              {user.isRegistered ? user.points : 0} <span className="text-[10px] text-neutral-500 font-normal">分</span>
            </span>
          </div>
        </div>

        {/* SECTION 3: Common Features Grid ("常用功能") */}
        <div className="bg-[#15151b] border border-[#1f1f26] rounded-[24px] p-4.5 shadow-sm space-y-4">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-xs font-bold text-neutral-300 font-sans tracking-wide">
              常用功能
            </h4>
            <span className="text-[9.5px] font-mono text-neutral-550">SERVICE LIST</span>
          </div>

          {/* 3x2 Grid matches Screen 3 layout */}
          <div className="grid grid-cols-3 gap-y-5 gap-x-2 text-center">
            {featureItems.map((item) => (
              <button
                key={item.id}
                id={`feature_tile_${item.id}`}
                onClick={() => setActiveFeatureModal(item.id)}
                className="flex flex-col items-center justify-center group outline-none select-none cursor-pointer"
              >
                {/* Round icon casing styled like a chip */}
                <div className="w-[46px] h-[46px] rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 group-hover:text-amber-400 group-hover:border-amber-500/70 shadow flex items-center justify-center transition-all bg-radial relative overflow-hidden">
                  {item.icon}
                  {/* Subtle inner accent ring */}
                  <span className="absolute inset-0.5 rounded-full border border-dotted border-neutral-900/80 pointer-events-none" />
                </div>
                
                <span className="text-[11px] mt-2 font-bold tracking-tight text-neutral-200 group-hover:text-amber-500 transition-colors">
                  {item.label}
                </span>
                
                <span className="text-[8px] text-neutral-550 scale-95 mt-0.5 max-w-[62px] block truncate text-center">
                  ✦ {item.label === '我的地址' ? '地址' : item.label === '我的存酒' ? '存酒' : item.label === '积分商城' ? '商城' : item.label === '我的优惠券' ? '礼包' : item.label === '订单中心' ? '订单' : '排位'} ✦
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* SECTION 4: BLUFF-7 BAR contact us banner */}
        <div className="bg-[#15151b] border border-[#1f1f26] rounded-[24px] p-4.5 shadow flex flex-col gap-3 select-all">
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-xs tracking-wider uppercase font-mono text-neutral-300">
              BLUFF-7 BAR
            </span>
            <button
              id="mine_contact_us"
              onClick={() => {
                alert('Bluff-7 Bar 专席尊享客服热线：\n0769-8288XXXX （黄江汇隆中心店）\n欢迎致电预约或提供宝贵意见！');
              }}
              className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white rounded-full text-[10.5px] font-bold cursor-pointer transition-all"
            >
              联系我们
            </button>
          </div>
          <p className="text-[11px] text-neutral-400 leading-relaxed text-justify">
            Hi~ 欢迎光临本店<br />
            如有需要，请点击联系我们按钮或直接前往前台，我们将竭诚为您快速提供点单制作与德州配桌服务~
          </p>
        </div>

      </div>

      {/* SECTION 5: Footer branding matching screen 3 footer */}
      <div className="mt-8 flex flex-col items-center justify-center text-center select-none shrink-0 py-2">
        <div className="flex items-center gap-1 text-xs text-neutral-350">
          <Flame className="w-4.5 h-4.5 text-amber-500 fill-amber-500/20 animate-pulse" />
          <span className="font-sans font-black tracking-widest text-[#f5ebd2]">熠火</span>
        </div>
        <span className="text-[9.5px] text-neutral-600 font-mono tracking-wider mt-1 uppercase block">
          熠火提供技术支持 • Yihuo Tech Support
        </span>
      </div>

      {/* 1. Register Member Overlay Popup Modal */}
      {showRegisterModal && (
        <div className="absolute inset-0 bg-black/85 flex items-center justify-center p-4 z-50">
          <form 
            onSubmit={handleRegisterSubmit} 
            className="bg-[#111115] border border-neutral-800 rounded-3xl p-5 max-w-[325px] w-full relative shadow-2xl animate-in scale-in duration-200"
          >
            <button
              type="button"
              id="close_register_modal"
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-neutral-850 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1.5 mb-5 select-none">
              <span className="text-[10px] bg-[#961e1e] text-white font-semibold tracking-wider px-2 py-0.5 rounded uppercase font-mono">
                Bluff尊享会员
              </span>
              <h4 className="text-sm font-bold text-neutral-100">
                创建您的 Bluff-7 会员账户
              </h4>
            </div>

            <div className="space-y-4 select-all text-xs">
              <div className="space-y-1.5 text-left">
                <label className="text-neutral-400 font-bold block">会员专属昵称</label>
                <input
                  id="reg_nickname_input"
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="请输入您的德友昵称"
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-neutral-200 px-3 py-2 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-neutral-400 font-bold block">手机号码 (绑定优惠券)</label>
                <input
                  id="reg_phone_input"
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="请输入绑定手机号"
                  required
                  pattern="^1[3-9]\d{9}$"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-neutral-200 px-3 py-2 rounded-xl text-xs outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                id="submit_register_btn"
                className="w-full py-3 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-950 text-white font-extrabold text-xs tracking-wider rounded-xl shadow-md transition-all cursor-pointer text-center uppercase mt-2"
              >
                🔒 同意协议并一键注册会员
              </button>
              
              <p className="text-[9.5px] text-neutral-500 text-justify leading-relaxed select-all">
                注册即代表您同意《Bluff-7 Bar 俱乐部隐私协约》及《德州文明牌友社区规章》。
              </p>
            </div>
          </form>
        </div>
      )}

      {/* 2. Generic Feature Detailed Popups for Interactive Grid */}
      {activeFeatureModal && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50 select-all">
          <div className="bg-[#111115] border border-neutral-800 rounded-3xl p-5 max-w-[325px] w-full relative shadow-2xl animate-in scale-in duration-150">
            <button
              id="close_feature_modal"
              onClick={() => setActiveFeatureModal(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-neutral-850 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Address Modal content */}
            {activeFeatureModal === 'address' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-200 border-b border-neutral-900 pb-2 flex items-center gap-1.5">
                  <MapPin className="w-4.5 h-4.5 text-amber-500" />
                  <span>我的收货地址 My Address</span>
                </h4>
                {user.isRegistered ? (
                  <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-850 space-y-2">
                    <p className="text-xs text-neutral-300">
                      <strong>宿主地址 (默认)：</strong><br />
                      广东省东莞市黄江镇板湖路30号汇隆中心9楼
                    </p>
                    <span className="text-[10px] text-neutral-500 block">注册会员送达，暂不需要派送费。</span>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 text-center py-6 leading-relaxed">
                    ⚠️ 请先加入会员注册，随后可解锁配送地址管理。
                  </p>
                )}
              </div>
            )}

            {/* Stored alcohol depot content: Awesome highly customized */}
            {activeFeatureModal === 'stored' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-200 border-b border-neutral-[#1e1e23] pb-2 flex items-center gap-1.5">
                  <Wine className="w-4.5 h-4.5 text-amber-400" />
                  <span>我的私人存酒库 Stored Alcohol</span>
                </h4>
                {user.isRegistered ? (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto no-scrollbar">
                    {user.storedAlcohol && user.storedAlcohol.length > 0 ? (
                      user.storedAlcohol.map((item, idx) => (
                        <div key={idx} className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-850 flex justify-between items-center font-mono">
                          <div>
                            <span className="text-xs text-neutral-200 font-bold font-sans">{item}</span>
                            <span className="text-[9px] text-neutral-500 block">托管到期: 30天内</span>
                          </div>
                          <span className="text-[9.5px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded select-none">
                            已封存密
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-xs text-neutral-400 leading-relaxed max-w-[200px] mx-auto">
                          酒库暂无存酒。您可在点单页面购买<b>“麦卡伦 12年单一麦芽”</b>等并封存到该私人酒库托管！
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 text-center py-6 leading-relaxed">
                    ⚠️ 存酒库属于高级实名制服务，请注册后体验。
                  </p>
                )}
              </div>
            )}

            {/* Points Mall content */}
            {activeFeatureModal === 'mall' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-200 border-b border-neutral-[#1e1e23] pb-2 flex items-center gap-1.5">
                  <ShoppingBag className="w-4.5 h-4.5 text-amber-500" />
                  <span>积分商城 Points Mall</span>
                </h4>
                <div className="space-y-2.5 max-h-[220px] overflow-y-auto no-scrollbar text-xs">
                  <p className="text-[10px] text-neutral-500">当前可用积分: {user.isRegistered ? user.points : 0} 积分</p>
                  
                  <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-850 flex justify-between items-center">
                    <div>
                      <strong className="text-neutral-200 font-sans block">Bluff-7 德州金币水晶卡套</strong>
                      <span className="text-[10px] text-neutral-500">120 积分兑换</span>
                    </div>
                    <button className="px-2.5 py-1 bg-amber-500 text-stone-950 font-bold rounded text-[10px] outline-none cursor-pointer">兑换</button>
                  </div>

                  <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-850 flex justify-between items-center">
                    <div>
                      <strong className="text-neutral-200 font-sans block">经典黑椒薯角兑换券</strong>
                      <span className="text-[10px] text-neutral-500">80 积分兑换</span>
                    </div>
                    <button className="px-2.5 py-1 bg-amber-500 text-stone-950 font-bold rounded text-[10px] outline-none cursor-pointer">兑换</button>
                  </div>
                </div>
              </div>
            )}

            {/* My Coupons list in modal */}
            {activeFeatureModal === 'coupons' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-200 border-b border-neutral-900 pb-2 flex items-center gap-1.5">
                  <Ticket className="w-4.5 h-4.5 text-amber-500" />
                  <span>我的优惠卷 My Coupons</span>
                </h4>
                
                <div className="space-y-2 max-h-[200px] overflow-y-auto no-scrollbar">
                  {user.isRegistered ? (
                    MOCK_COUPONS.map((coupon) => (
                      <div key={coupon.id} className="bg-neutral-950 p-3 rounded-xl border border-neutral-850 flex justify-between items-center font-mono select-all">
                        <div>
                          <strong className="text-xs text-stone-200 font-sans block">{coupon.title}</strong>
                          <span className="text-[9px] text-neutral-500 block">有效期到 {coupon.expiry}</span>
                        </div>
                        <div className="text-right text-amber-500 font-black text-xs shrink-0 pl-2">
                          立减 ¥{coupon.value}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-neutral-500 text-center py-6 leading-relaxed select-none">
                      暂无可用专属优惠，请先创建会员！注册立即赠首杯半价。
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Orders history checklist modal */}
            {activeFeatureModal === 'orders' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-200 border-b border-neutral-[#1e1e23] pb-2 flex items-center gap-1.5">
                  <ClipboardList className="w-4.5 h-4.5 text-amber-500" />
                  <span>订单中心 Order Center</span>
                </h4>
                <div className="space-y-2.5 max-h-[240px] overflow-y-auto no-scrollbar text-xs">
                  {orders.length > 0 ? (
                    orders.map((o) => (
                      <div key={o.id} className="bg-neutral-950 p-3 rounded-xl border border-neutral-850 space-y-1.5 font-mono select-all text-neutral-400">
                        <div className="flex justify-between font-bold text-neutral-200">
                          <span>订单: {o.id}</span>
                          <span className="text-amber-500">¥ {o.totalAmount}</span>
                        </div>
                        <div className="text-[10px] space-y-0.5 select-all">
                          <div>件数: 共 {o.items.reduce((sum, i) => sum + i.quantity, 0)} 杯</div>
                          <div>类型: {o.type === 'in-store' ? '店内消费' : '自提带走'}</div>
                          <div>时间: {o.createdAt}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-neutral-500 text-center py-8">
                      暂无点单记录。前往【首页】挑选您的专属酒水。
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Master Points ranking score list */}
            {activeFeatureModal === 'master' && (
              <div className="space-y-4 select-all">
                <h4 className="text-sm font-bold text-neutral-200 border-b border-neutral-900 pb-2 flex items-center gap-1.5">
                  <Award className="w-4.5 h-4.5 text-amber-500" />
                  <span>大师积分排位 Master Points</span>
                </h4>
                <div className="space-y-3.5 text-xs text-neutral-400 leading-relaxed text-justify">
                  <p>
                    <b>“大师分”</b>是 Bluff-7 俱乐部专设的德州扑克段位标志。系统依照您在卡台的累加、胜负记录以及日常在酒吧内的存开酒消费，为您核定评数。
                  </p>
                  
                  <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-850 flex justify-between items-center select-none">
                    <div>
                      <span className="text-[10px] text-neutral-500 block">当前段位 Tier info</span>
                      <strong className="text-xs text-amber-400 font-sans">
                        {user.isRegistered ? (user.points >= 150 ? '🥈 钻石德杰段位' : '🥉 黄金常驻段位') : '无排位记录'}
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-500 block">当前大师分 points</span>
                      <strong className="text-xs text-white font-mono">{user.isRegistered ? user.points : 0} 分</strong>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-500 leading-normal">
                    📈 大师分增加诀窍：<br />
                    1. 参与德州主桌竞技并进入本期奖励区 (+50-100分)<br />
                    2. 主动在小程序完成酒类托管或自提消费 (+20分)
                  </p>
                </div>
              </div>
            )}

            {/* Balance Details and Quick simulator cash additions */}
            {activeFeatureModal === 'balance' && (
              <div className="space-y-4 text-xs select-all">
                <h4 className="text-sm font-bold text-neutral-205 border-b border-neutral-[#1e1e23] pb-2 flex items-center gap-1.5">
                  <CreditCard className="w-4.5 h-4.5 text-amber-500" />
                  <span>极速充值账户 Balance Recharge</span>
                </h4>
                
                <p className="text-neutral-450 leading-relaxed text-justify">
                  充值到您的账户余额后，可专享<b>结账时直接抵扣余额</b>及首发杯减免福利！
                </p>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-850 flex justify-between items-center">
                  <span className="text-neutral-400">目前可用余额:</span>
                  <strong className="text-sm text-white font-mono">¥ {user.balance}</strong>
                </div>

                <div className="space-y-2 mt-2">
                  <span className="text-[10.5px] text-neutral-500 uppercase block font-mono">
                    选择充值金额 Select top-up
                  </span>
                  <div className="grid grid-cols-2 gap-2 font-mono">
                    <button
                      onClick={() => {
                        onAddBalance(50);
                        alert('成功模拟充值 ¥50 元！💰');
                      }}
                      className="py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-850 hover:border-amber-500 text-xs rounded-xl font-bold cursor-pointer text-center text-neutral-200 transition-all font-mono"
                    >
                      + ¥ 50
                    </button>
                    <button
                      onClick={() => {
                        onAddBalance(100);
                        alert('成功模拟充值 ¥100 元！💰');
                      }}
                      className="py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-850 hover:border-amber-500 text-xs rounded-xl font-bold cursor-pointer text-center text-neutral-200 transition-all font-mono"
                    >
                      + ¥ 100
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
