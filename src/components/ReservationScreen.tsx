import React, { useState } from 'react';
import { Seat, UserProfile } from '../types';
import { Star, Users, ShieldAlert, CheckCircle2, UserCheck, HelpCircle } from 'lucide-react';

interface ReservationScreenProps {
  user: UserProfile;
  seats: Seat[];
  onBookSeat: (seatId: number, username: string, avatar: string) => void;
  onCancelSeat: (seatId: number) => void;
}

export default function ReservationScreen({
  user,
  seats,
  onBookSeat,
  onCancelSeat
}: ReservationScreenProps) {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(4);
  const [isUserOnWaitlist, setIsUserOnWaitlist] = useState(false);
  const [guestName, setGuestName] = useState('');

  const bookedCount = seats.filter(s => s.status === 'booked').length;
  
  // Custom absolute-coordinate-percentage layout matching the screenshots for the 9 oval chairs
  // Coordinates are designed to align around a central oval table perfectly in a responsive container
  const seatPositions: { [key: number]: { top: string; left: string; name: string } } = {
    9: { top: '3%', left: '26%', name: 'Seat 9' },
    1: { top: '3%', left: '60%', name: 'Seat 1' },
    8: { top: '23%', left: '3%', name: 'Seat 8' },
    2: { top: '23%', left: '83%', name: 'Seat 2' },
    7: { top: '53%', left: '3%', name: 'Seat 7' },
    3: { top: '53%', left: '83%', name: 'Seat 3' },
    6: { top: '78%', left: '20%', name: 'Seat 6' },
    5: { top: '83%', left: '43%', name: 'Seat 5' },
    4: { top: '78%', left: '66%', name: 'Seat 4' },
  };

  const handleSeatClick = (seat: Seat) => {
    setSelectedSeat(seat);
    if (seat.status === 'empty' && user.isRegistered) {
      setGuestName(user.nickname);
    } else {
      setGuestName('');
    }
  };

  const handleConfirmReservation = () => {
    if (!selectedSeat) return;
    
    let reservationName = guestName.trim();
    if (!reservationName) {
      reservationName = user.isRegistered ? user.nickname : '匿名雀友';
    }

    const defaultAvatarIdx = Math.floor(Math.random() * 4) + 1;
    const placeholderAvatar = user.isRegistered ? user.avatar : `https://images.unsplash.com/photo-${1500000000000 + defaultAvatarIdx * 10000}?auto=format&fit=crop&w=80&q=80`;

    onBookSeat(selectedSeat.id, reservationName, placeholderAvatar);
    setSelectedSeat(null);
  };

  const handleLeaveWaitlistToggle = () => {
    if (isUserOnWaitlist) {
      setWaitlistCount(prev => prev - 1);
      setIsUserOnWaitlist(false);
    } else {
      setWaitlistCount(prev => prev + 1);
      setIsUserOnWaitlist(true);
    }
  };

  return (
    <div className="flex-1 bg-neutral-950 p-4 font-sans text-neutral-200 select-all flex flex-col no-scrollbar justify-between">
      
      {/* Scrollable Container section */}
      <div className="space-y-4">
        
        {/* Sub-Header bar matching Screen 5 "Bluff-7 Bar >" and "牌桌礼仪以及预约规则" */}
        <div className="flex justify-between items-center text-xs tracking-wide text-neutral-400 select-none px-1">
          <div className="flex items-center gap-1 hover:opacity-85 cursor-pointer">
            <span className="font-bold text-neutral-200">Bluff-7 Bar</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </div>
          
          <button 
            id="rule_open_trigger"
            onClick={() => setShowRules(true)}
            className="text-amber-500 font-bold hover:underline cursor-pointer flex items-center gap-1 outline-none"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>牌桌礼仪以及预约规则</span>
          </button>
        </div>

        {/* Daily Bonus Banner */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 text-center select-none">
          <span className="text-xs font-bold text-amber-500 tracking-wide uppercase">
            🎁 每日消费领积分 • 存酒开瓶累积大师积分
          </span>
        </div>

        {/* Competitor Arena Header Box: 竞技桌A info */}
        <div className="bg-neutral-900 border border-neutral-850/80 rounded-2xl p-4 flex justify-between items-center select-none shadow-sm relative overflow-hidden">
          <div className="space-y-1 z-10">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white select-all">竞技桌 A</h3>
              <span className="text-[10px] bg-amber-500/15 text-amber-500 border border-amber-500/20 px-1.5 py-0.5 rounded-full font-bold">
                开桌时间 14:00-17:00
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Bluff-7 旗舰店王牌主理德州竞技区
            </p>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 font-mono z-10 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse block" />
            <span>预约中</span>
          </div>

          {/* Abstract subtle Card suites backing */}
          <div className="absolute right-4 bottom-[-10px] text-neutral-800/15 font-serif text-6xl select-none pointer-events-none font-bold">
            ♠️
          </div>
        </div>

        {/* Double Stats Grid (基础积分 and 座位) */}
        <div className="grid grid-cols-2 gap-3 select-none">
          {/* Base Score info */}
          <div className="bg-neutral-900/60 border border-neutral-850/80 rounded-2xl p-3.5 flex items-center gap-3 shadow-inner">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-bold block">基础积分 Base Score</span>
              <span className="text-sm font-extrabold text-neutral-200 font-mono select-all">10/20 积分</span>
            </div>
          </div>

          {/* Seat Status Occupancy info */}
          <div className="bg-neutral-900/60 border border-neutral-850/80 rounded-2xl p-3.5 flex items-center gap-3 shadow-inner">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-bold block">桌内席位 Seats</span>
              <span className="text-sm font-extrabold text-neutral-200 font-mono select-all">{bookedCount}/9 席</span>
            </div>
          </div>
        </div>

        {/* MAIN VISUAL: 9-Seat Oval Poker Table Layout Area */}
        <div className="relative w-full aspect-[4/3] max-w-[370px] mx-auto mt-4 bg-black rounded-[32px] border border-neutral-900 shadow-2xl p-4 flex items-center justify-center overflow-hidden">
          
          {/* Green-Felt or Carbon-Grey Central Graphic oval table representation */}
          <div className="w-[84%] h-[74%] rounded-[110px] bg-gradient-to-b from-[#1b1b22] to-[#141419] border-[14px] border-[#292931] shadow-[inset_0_4px_24px_rgba(0,0,0,0.9),_0_8px_32px_rgba(0,0,0,0.6)] flex items-center justify-center relative select-none z-10">
            {/* Center Felt gold line accent */}
            <div className="absolute inset-2 border border-dashed border-amber-500/35 rounded-[90px] flex items-center justify-center pointer-events-none">
              
              {/* Central Branded Text Logo & Suits */}
              <div className="text-center font-serif tracking-tight select-all">
                {/* Suites iconography */}
                <div className="text-[12px] opacity-75 tracking-wider mb-2 flex justify-center gap-1">
                  <span className="text-rose-500">♥️</span>
                  <span className="text-neutral-400">♠️</span>
                  <span className="text-neutral-400">♣️</span>
                  <span className="text-rose-500">♦️</span>
                </div>
                {/* Bluff-7 signature brand */}
                <h2 className="text-xl font-black font-sans tracking-wide italic text-stone-100 flex items-center justify-center gap-1 select-all">
                  Bluff<span className="text-rose-600 font-serif font-black">-7</span>
                </h2>
                <p className="text-[7.5px] tracking-widest text-neutral-500 mt-1 uppercase font-mono">
                  CHAMPIONSHIP TOUR
                </p>
              </div>

            </div>
          </div>

          {/* Visual representations of the 9 seats wrapping the centralized table */}
          {seats.map((seat) => {
            const pos = seatPositions[seat.id];
            if (!pos) return null;
            const isBooked = seat.status === 'booked';
            const isMe = isBooked && seat.username === user.nickname && user.isRegistered;

            return (
              <button
                key={seat.id}
                id={`seat_spot_${seat.id}`}
                onClick={() => handleSeatClick(seat)}
                style={{ top: pos.top, left: pos.left }}
                className={`absolute w-12 h-16 flex flex-col items-center justify-center group outline-none z-20 cursor-pointer`}
              >
                {/* Visual Seat Indicator sphere with numbers matched to Screen 5 */}
                <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center font-bold text-[10px] font-mono border-2 transition-all shadow-md relative ${
                  isMe
                    ? 'bg-amber-500 text-black border-yellow-200 scale-105'
                    : isBooked
                      ? 'bg-neutral-800 text-neutral-300 border-neutral-700'
                      : 'bg-[#181820] text-neutral-400 border-neutral-800 group-hover:border-amber-500/70 group-hover:text-amber-500'
                }`}>
                  {seat.id}
                  
                  {/* Subtle red indicator overlay if current user */}
                  {isMe && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-600 rounded-full border border-black" />
                  )}
                </div>

                {/* Seat description Text box */}
                <div className="mt-1 w-14 text-center">
                  <span className={`text-[8.5px] font-semibold block leading-tight truncate px-0.5 select-all ${
                    isMe 
                      ? 'text-amber-400 font-bold bg-amber-950/40 rounded py-0.2'
                      : isBooked 
                        ? 'text-neutral-300' 
                        : 'text-neutral-500 font-medium group-hover:text-amber-500/80'
                  }`}>
                    {isBooked ? (seat.username || '玩家占位') : '空座位'}
                  </span>
                </div>
              </button>
            );
          })}

        </div>

      </div>

      {/* Bottom Option Bar with avatar register status, and Waitlist button ("候桌") */}
      <div className="bg-neutral-900 border border-neutral-850 p-2.5 rounded-2xl flex justify-between items-center gap-3 select-none mt-4 shrink-0 shadow-md">
        <div className="flex items-center gap-2 px-1 text-xs text-neutral-300">
          <div className="w-[30px] h-[30px] rounded-full border border-neutral-800 overflow-hidden bg-neutral-950 shrink-0">
            <img 
              id="reservation_user_avatar"
              src={user.isRegistered ? user.avatar : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"} 
              alt={user.nickname} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <span className="font-bold text-neutral-200 block truncate max-w-[130px] select-all">
              {user.isRegistered ? user.nickname : '游客账户'}
            </span>
            <span className="text-[9.5px] text-neutral-500">
              {user.isRegistered ? `大师分: ${user.points}分` : '注册可参与座位锁定'}
            </span>
          </div>
        </div>

        <button
          id="waitlist_modal_open"
          onClick={() => setShowWaitlistModal(true)}
          className="px-4 py-2 bg-neutral-800 hover:bg-[#1f1f2a] border border-neutral-750 text-neutral-200 hover:text-amber-500 font-bold text-xs rounded-xl shadow-inner cursor-pointer transition-all flex items-center gap-1"
        >
          <span>候桌</span>
          {isUserOnWaitlist && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          )}
        </button>
      </div>

      {/* Seat Booking confirmation/detail modal overlay */}
      {selectedSeat && (
        <div className="absolute inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-[#111115] border border-neutral-800 rounded-3xl p-5 max-w-[320px] w-full relative shadow-2xl animate-in scale-in duration-150">
            {/* Close */}
            <button
              id="close_seat_modal_btn"
              onClick={() => setSelectedSeat(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-neutral-800 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center space-y-2 mb-4 select-all">
              <span className="text-[10px] bg-amber-500 text-black font-semibold font-mono tracking-wider uppercase px-2 py-0.5 rounded">
                竞技席位 SEAT {selectedSeat.id}
              </span>
              <h4 className="text-md font-bold text-neutral-100">
                {selectedSeat.status === 'booked' ? '座位信息' : '预约竞技席位'}
              </h4>
            </div>

            {selectedSeat.status === 'booked' ? (
              /* Occupied detail screen */
              <div className="space-y-4">
                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-850 flex items-center gap-3">
                  <img src={selectedSeat.avatar} className="w-10 h-10 rounded-full border border-neutral-800 object-cover" />
                  <div>
                    <h5 className="text-[13px] font-bold text-white select-all">{selectedSeat.username}</h5>
                    <p className="text-[10px] text-neutral-500 select-all">入座时间: {selectedSeat.bookingTime || '系统初始'}</p>
                  </div>
                </div>

                {/* Cancel Reservation Option if it belongs to user */}
                {(selectedSeat.username === user.nickname && user.isRegistered) || selectedSeat.username?.includes('游客') || selectedSeat.id === 5 ? (
                  <button
                    id="cancel_booking_btn"
                    onClick={() => {
                      onCancelSeat(selectedSeat.id);
                      setSelectedSeat(null);
                    }}
                    className="w-full py-2.5 bg-rose-950/40 hover:bg-rose-900/35 border border-rose-900/40 text-rose-300 hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                  >
                    退座 (放回虚席)
                  </button>
                ) : (
                  <p className="text-[10.5px] text-neutral-500 text-center leading-normal">
                    ⚠️ 此席位由其他德友预约，您无法退座。
                  </p>
                )}
              </div>
            ) : (
              /* Empty seat booking flow screen */
              <div className="space-y-4 select-all">
                {user.isRegistered ? (
                  <div className="bg-neutral-950/80 p-3 rounded-xl border border-neutral-850 text-xs flex items-center justify-between">
                    <div>
                      <span className="text-neutral-500 block">注册会员入座</span>
                      <strong className="text-neutral-200">{user.nickname}</strong>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.5 rounded font-mono">
                      ✓ 信息已自动载入
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1.5 text-xs text-left">
                    <label className="text-neutral-400 font-bold block">游客备用名</label>
                    <input
                      id="guest_seat_name_input"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="快给自己取一个帅气的德友绰号"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-neutral-200 px-3 py-2 rounded-xl text-xs outline-none"
                    />
                    <span className="text-[9.5px] text-neutral-500 block mt-1 uppercase">
                      ⚠️ 非注册会员订座，只能获得临时游玩额度。
                    </span>
                  </div>
                )}

                <button
                  id="confirm_reservation_btn"
                  onClick={handleConfirmReservation}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-xs rounded-xl shadow-md cursor-pointer text-center hover:shadow-lg transition-transform hover:scale-[1.01] active:opacity-90"
                >
                  🔒 确定锁定入座
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rules sheet modal overlay */}
      {showRules && (
        <div className="absolute inset-0 bg-black/85 flex items-center justify-center p-4 z-50 select-all overflow-y-auto">
          <div className="bg-[#111115] border border-neutral-850 rounded-3xl p-5 max-w-[340px] w-full max-h-[82%] flex flex-col justify-between shadow-2xl relative">
            <button
              id="close_rules_btn"
              onClick={() => setShowRules(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-neutral-850 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-3 border-b border-neutral-900 pb-2">
              <h3 className="text-md font-bold text-amber-500 font-mono tracking-wider uppercase flex items-center gap-1">
                <span>✦</span> Bluff-7 牌桌预约规则
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar text-[11.5px] text-neutral-400 space-y-3.5 pr-1 py-1 text-justify leading-relaxed">
              <section className="space-y-1">
                <h5 className="font-extrabold text-neutral-200">一、首杯预约绑定</h5>
                <p>德州竞技席位不收取直接座位占用费，但所有订座德友入席当天需在小程序【首页】点单并实际消费至少一杯饮品饮用。</p>
              </section>

              <section className="space-y-1">
                <h5 className="font-extrabold text-neutral-200">二、退座时间契约</h5>
                <p>若因个人事务无法按时出席，请在所订开桌时间前<b>至少1.5小时</b>通过小程序进行一键“退座”，让出机位，否则将可能影响您个人的“大师分”评级。</p>
              </section>

              <section className="space-y-1">
                <h5 className="font-extrabold text-neutral-200">三、文明德州公约</h5>
                <p>Bluff-7 Bar 秉持正能量竞技理念，拒绝言语谩骂或任何形式的不端行为，桌台内支持合理的诈唬技巧(Bluff)展示，严禁作弊勾兑行为。</p>
              </section>

              <section className="space-y-1">
                <h5 className="font-extrabold text-neutral-200">四、关于候补(Waitlist)</h5>
                <p>若竞技台显示座位满额，您可通过候桌注册领取排队号码。当有预约玩家退座时，我们将通过消息弹窗或预留电话提醒您递补入座。</p>
              </section>
            </div>

            <button
              id="rules_acknowledge_btn"
              onClick={() => setShowRules(false)}
              className="mt-4 w-full py-2.5 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-250 font-bold text-xs rounded-xl cursor-pointer text-center outline-none"
            >
              我已阅读并知悉规则
            </button>
          </div>
        </div>
      )}

      {/* Waitlist Modal overlay */}
      {showWaitlistModal && (
        <div className="absolute inset-0 bg-black/85 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111115] border border-neutral-850 rounded-3xl p-5 max-w-[320px] w-full shadow-2xl relative">
            <button
              id="close_waitlist_btn"
              onClick={() => setShowWaitlistModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-neutral-850 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center space-y-1.5 mb-4 py-1">
              <h4 className="text-md font-bold text-neutral-200 flex items-center justify-center gap-1 font-mono uppercase">
                <span>⏱️</span> 候桌排队系统
              </h4>
              <p className="text-xs text-neutral-400">目前已有 <b>{waitlistCount}</b> 位玩家正在线上排席</p>
            </div>

            <div className="bg-neutral-950 p-4.5 rounded-2xl border border-neutral-850/80 mb-4 select-all text-center space-y-2">
              {isUserOnWaitlist ? (
                <>
                  <span className="inline-block bg-amber-500/10 text-amber-500 border border-amber-500/25 px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider">
                    排队中 WAITLIST ACTIVE
                  </span>
                  <div className="text-xl font-black text-amber-550 font-mono">第 5 号</div>
                  <p className="text-[10.5px] text-neutral-400 leading-normal">
                    预计等待时间: <b>15-25 分钟</b><br />如有席位释放，系统会立即通过注册手机短信通知您，请确保电话接听。
                  </p>
                </>
              ) : (
                <>
                  <span className="text-[10.5px] text-neutral-500 uppercase block tracking-wider font-mono">
                    STATUS: AVAILABLE FOR WAITLIST
                  </span>
                  <p className="text-[11.5px] text-neutral-400 leading-relaxed max-w-[220px] mx-auto text-center">
                    当前暂未加入排队。若竞技桌没有心仪的席位，您可一键加入排位。
                  </p>
                </>
              )}
            </div>

            <div className="flex gap-2">
              <button
                id="waitlist_action_toggle"
                onClick={handleLeaveWaitlistToggle}
                className={`flex-1 py-2.5 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer text-center ${
                  isUserOnWaitlist
                    ? 'bg-rose-950/30 hover:bg-rose-900/40 border border-rose-900/40 text-rose-300'
                    : 'bg-amber-500 text-stone-950 hover:bg-amber-600'
                }`}
              >
                {isUserOnWaitlist ? '取消候桌 (离队)' : '加入候桌队伍 (排号)'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
