import React, { useState } from 'react';
import { PlayerRank } from '../types';
import { INITIAL_MONTH_RANKS, INITIAL_LAST_MONTH_RANKS, INITIAL_ALL_TIME_RANKS } from '../data';
import { Award, RefreshCw, Trophy } from 'lucide-react';

interface RankingsScreenProps {
  monthlyRanks: PlayerRank[];
  lastMonthRanks: PlayerRank[];
  allTimeRanks: PlayerRank[];
  onRefreshRanks?: () => void;
}

export default function RankingsScreen({
  monthlyRanks,
  lastMonthRanks,
  allTimeRanks,
  onRefreshRanks
}: RankingsScreenProps) {
  const [activeTab, setActiveTab] = useState<'month' | 'lastMonth' | 'all'>('all');

  // Dynamically select the list
  const activeRanksList = 
    activeTab === 'month' 
      ? monthlyRanks 
      : activeTab === 'lastMonth' 
        ? lastMonthRanks 
        : allTimeRanks;

  // Grab the top 1, 2, 3 players for the podium
  const top1 = activeRanksList.find(r => r.rank === 1);
  const top2 = activeRanksList.find(r => r.rank === 2);
  const top3 = activeRanksList.find(r => r.rank === 3);

  // The rest (ranks 4+)
  const restRanks = activeRanksList.filter(r => r.rank > 3);

  return (
    <div className="flex-1 bg-neutral-950 p-4 font-sans text-neutral-200 select-all flex flex-col no-scrollbar">
      
      {/* 1. Laurel Wreath and Header Trophy icon matching Screen 2 */}
      <div className="flex flex-col items-center justify-center my-2 text-center select-none relative">
        <Trophy className="w-6 h-6 text-amber-500 mb-1" />
        
        {/* Laurel vector branches container */}
        <div className="flex items-center gap-2 justify-center">
          <span className="text-xl text-amber-500 font-bold opacity-60">🌿</span>
          <div>
            <h2 className="text-lg font-black tracking-widest text-[#f5ebd2] select-all">
              排行榜
            </h2>
            <p className="text-[9px] tracking-widest text-amber-500 font-mono font-bold uppercase mt-0.5">
              SCORE RANK
            </p>
          </div>
          <span className="text-xl text-amber-500 font-bold opacity-60 scale-x-[-1] inline-block">🌿</span>
        </div>
      </div>

      {/* 2. Top Tabs toggles: 本月榜, 上月榜, 总榜 */}
      <div className="flex justify-center bg-neutral-900 border border-neutral-850 p-1 rounded-2xl my-3 w-64 mx-auto select-none">
        <button
          id="rank_tab_month"
          onClick={() => setActiveTab('month')}
          className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'month'
              ? 'bg-neutral-800 text-stone-100 border border-neutral-750'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          本月榜
        </button>
        <button
          id="rank_tab_last"
          onClick={() => setActiveTab('lastMonth')}
          className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'lastMonth'
              ? 'bg-neutral-800 text-stone-100 border border-neutral-750'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          上月榜
        </button>
        <button
          id="rank_tab_all"
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-amber-500 text-neutral-950 font-extrabold'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          总榜
        </button>
      </div>

      {/* 3. PODIUM (3D golden silver bronze cylinders representing top 1, 2, 3 players) */}
      {activeRanksList.length > 0 ? (
        <div className="h-[175px] mt-2 mb-4 w-full flex items-end justify-center select-none relative">
          
          {/* Rank 2 (Left) - Silver Podium */}
          <div className="flex flex-col items-center w-24 translate-y-1.5 z-10 shrink-0">
            {/* Crown circle and Avatar */}
            <div className="relative mb-2">
              <div className="w-[44px] h-[44px] rounded-full border-2 border-neutral-300 overflow-hidden bg-neutral-900 shadow p-0.5">
                <img 
                  src={top2 ? top2.avatar : "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80"} 
                  alt={top2 ? top2.nickname : "Seat 2"} 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#d7d7d7] text-black font-sans font-black text-[8px] tracking-tight px-1.5 rounded-full border border-neutral-200">
                TOP 2
              </div>
            </div>
            
            {/* Nickname, score */}
            {top2 && (
              <div className="text-center w-full mb-1">
                <h4 className="text-[9.5px] font-bold text-neutral-300 truncate max-w-[80px]">{top2.nickname}</h4>
                <span className="text-[8.5px] text-amber-500/80 font-mono block">{top2.masterScore}分</span>
              </div>
            )}

            {/* Cylinder pedestal */}
            <div className="w-16 h-[50px] bg-gradient-to-b from-[#e5e5e6] to-[#afafb0] rounded-t-xl flex flex-col justify-start items-center p-1.5 shadow-md border-l border-t border-r border-[#ffffff]/30">
              <div className="w-4 h-4 bg-[#7a7a7d] text-white font-mono text-[9px] font-black rounded-full flex items-center justify-center shadow-inner">
                2
              </div>
            </div>
          </div>

          {/* Rank 1 (Center) - Golden Podium */}
          <div className="flex flex-col items-center w-28 z-20 shrink-0">
            {/* Gold Crown and Avatar */}
            <div className="relative mb-2 scale-110">
              <div className="w-[48px] h-[48px] rounded-full border-2 border-amber-400 overflow-hidden bg-neutral-900 shadow-lg p-0.5 relative">
                <img 
                  src={top1 ? top1.avatar : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"} 
                  alt={top1 ? top1.nickname : "Seat 1"} 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              
              {/* Gold Crown marker */}
              <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 text-sm drop-shadow">👑</div>
              <div className="absolute top-[-9px] left-1/2 -translate-x-1/2 bg-amber-400 text-stone-950 font-sans font-black text-[8px] tracking-tight px-1.5 rounded-full border border-yellow-200 shadow">
                TOP 1
              </div>
            </div>

            {/* Nickname, score */}
            {top1 && (
              <div className="text-center w-full mb-1">
                <h4 className="text-[10px] font-black text-white truncate max-w-[90px]">{top1.nickname}</h4>
                <span className="text-[9px] text-amber-400 font-mono font-bold block">{top1.masterScore}分</span>
              </div>
            )}

            {/* Pedestal */}
            <div className="w-[72px] h-[68px] bg-gradient-to-b from-[#fad961] to-[#f76b1c] rounded-t-xl flex flex-col justify-start items-center p-1.5 shadow-2xl border-l border-t border-r border-[#ffffff]/50 relative">
              <div className="w-4.5 h-4.5 bg-[#df5702] text-white font-mono text-[10px] font-black rounded-full flex items-center justify-center shadow-inner">
                1
              </div>
            </div>
          </div>

          {/* Rank 3 (Right) - Bronze Podium */}
          <div className="flex flex-col items-center w-24 translate-y-2 z-10 shrink-0">
            {/* Bronze Crown and Avatar */}
            <div className="relative mb-2">
              <div className="w-[42px] h-[42px] rounded-full border-2 border-amber-800 overflow-hidden bg-neutral-900 shadow p-0.5">
                <img 
                  src={top3 ? top3.avatar : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"} 
                  alt={top3 ? top3.nickname : "Seat 3"} 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#c9a77c] text-black font-sans font-black text-[8px] tracking-tight px-1.5 rounded-full border border-amber-700">
                TOP 3
              </div>
            </div>

            {/* Nickname, score */}
            {top3 && (
              <div className="text-center w-full mb-1">
                <h4 className="text-[9.5px] font-bold text-neutral-300 truncate max-w-[80px]">{top3.nickname}</h4>
                <span className="text-[8.5px] text-amber-500/80 font-mono block">{top3.masterScore}分</span>
              </div>
            )}

            {/* Pedestal */}
            <div className="w-16 h-[44px] bg-gradient-to-b from-[#e3b890] to-[#aa7d53] rounded-t-xl flex flex-col justify-start items-center p-1.5 shadow-md border-l border-t border-r border-[#ffffff]/20">
              <div className="w-4 h-4 bg-[#7a5026] text-white font-mono text-[9px] font-black rounded-full flex items-center justify-center shadow-inner">
                3
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-10 bg-neutral-900/40 rounded-2xl border border-neutral-850 border-dashed my-4">
          <Award className="w-10 h-10 text-neutral-600 mb-2" />
          <span className="text-xs text-neutral-400 font-bold">暂无数据</span>
          <p className="text-[10px] text-neutral-500 mt-1">目前排行暂缺，请在结算下单参与获得大师分。</p>
        </div>
      )}

      {/* 4. LEADERBOARD LIST CONTAINER matching Screen 2 table */}
      <div className="flex-1 bg-neutral-900/60 border border-neutral-850/80 rounded-2xl shadow flex flex-col overflow-hidden pb-2 select-all">
        
        {/* Table Headers */}
        <div className="grid grid-cols-4 py-2.5 px-4 bg-neutral-900 border-b border-neutral-850 text-[10px] text-neutral-500 font-bold tracking-wider select-none text-center">
          <div>排名</div>
          <div>头像</div>
          <div className="text-left pl-3">昵称</div>
          <div>大师分</div>
        </div>

        {/* Dynamic score block matching table list */}
        <div className="flex-1 overflow-y-auto no-scrollbar max-h-[300px]">
          {activeRanksList.length > 0 ? (
            activeRanksList.map((player) => {
              const isCup = player.rank <= 3;
              return (
                <div
                  key={player.rank}
                  id={`rank_row_${player.rank}`}
                  className={`grid grid-cols-4 items-center py-2.5 px-4 border-b border-neutral-900/40 hover:bg-neutral-850/30 transition-colors text-center text-xs select-all`}
                >
                  {/* Rank Column */}
                  <div className="font-mono font-bold">
                    {isCup ? (
                      <span className={`inline-block w-5 h-5 rounded-full leading-5 text-[10px] font-black ${
                        player.rank === 1 ? 'bg-amber-400 text-stone-950 font-bold' :
                        player.rank === 2 ? 'bg-neutral-300 text-stone-950' : 'bg-amber-700 text-stone-50'
                      }`}>
                        {player.rank}
                      </span>
                    ) : (
                      <span className="text-neutral-400">{player.rank}</span>
                    )}
                  </div>

                  {/* Avatar Column */}
                  <div className="flex justify-center select-none">
                    <img 
                      src={player.avatar} 
                      alt={player.nickname} 
                      className="w-7.5 h-7.5 rounded-full border border-neutral-800 object-cover" 
                    />
                  </div>

                  {/* Nickname Column */}
                  <div className="text-left pl-3 font-semibold text-neutral-200 truncate max-w-[90px]">
                    {player.nickname}
                  </div>

                  {/* Master Score Column */}
                  <div className="font-mono font-bold text-amber-500/90 text-right pr-6">
                    {player.masterScore} 积分
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-14 text-center select-all">
              <span className="text-[11px] text-neutral-500 font-medium">暂无数据</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
