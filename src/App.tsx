import React, { useState, useEffect } from 'react';
import WeChatWrapper from './components/WeChatWrapper';
import HomeScreen from './components/HomeScreen';
import OrderScreen from './components/OrderScreen';
import CheckoutModal from './components/CheckoutModal';
import ReservationScreen from './components/ReservationScreen';
import RankingsScreen from './components/RankingsScreen';
import MineScreen from './components/MineScreen';

import { Drink, OrderItem, Order, Seat, PlayerRank, UserProfile } from './types';
import { 
  INITIAL_DRINKS, 
  INITIAL_MONTH_RANKS, 
  INITIAL_LAST_MONTH_RANKS, 
  INITIAL_ALL_TIME_RANKS 
} from './data';

export default function App() {
  const [activeTab, setActiveTab ] = useState<string>('order');
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [orderSubView, setOrderSubView] = useState<'home' | 'menu'>('home');

  // 1. User State (Initial default values)
  const [user, setUser] = useState<UserProfile>({
    isRegistered: false,
    nickname: '游客账户',
    phone: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
    balance: 0,
    couponsCount: 0,
    points: 0,
    masterScore: 0,
    storedAlcohol: []
  });

  // 2. Drinks Menu list
  const [drinks, setDrinks] = useState<Drink[]>(INITIAL_DRINKS);

  // 3. Shopping Basket state
  const [cart, setCart] = useState<OrderItem[]>([]);

  // 4. Past Orders records
  const [orders, setOrders] = useState<Order[]>([]);

  // 5. Seats layout on table 'A' (1-9) with prefilled members to create active atmosphere
  const [seats, setSeats] = useState<Seat[]>([
    { id: 1, status: 'booked', username: '王总 (Jerry)', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80', bookingTime: '21:05' },
    { id: 2, status: 'empty' },
    { id: 3, status: 'booked', username: '德州迷弟 (Jack)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', bookingTime: '21:12' },
    { id: 4, status: 'empty' },
    { id: 5, status: 'empty' },
    { id: 6, status: 'empty' },
    { id: 7, status: 'booked', username: '筹码收割机', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', bookingTime: '20:45' },
    { id: 8, status: 'empty' },
    { id: 9, status: 'empty' }
  ]);

  // 6. Live Ranks lists that user can dynamically climb or alter
  const [monthlyRanks, setMonthlyRanks] = useState<PlayerRank[]>(INITIAL_MONTH_RANKS);
  const [lastMonthRanks, setLastMonthRanks] = useState<PlayerRank[]>(INITIAL_LAST_MONTH_RANKS);
  const [allTimeRanks, setAllTimeRanks] = useState<PlayerRank[]>(INITIAL_ALL_TIME_RANKS);

  // 7. Event receivers for quick simulation actions
  const fetchAllData = () => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Error fetching user:', err));

    fetch('/api/seats')
      .then(res => res.json())
      .then(data => setSeats(data))
      .catch(err => console.error('Error fetching seats:', err));

    fetch('/api/ranks')
      .then(res => res.json())
      .then(data => {
        setMonthlyRanks(data.monthly);
        setLastMonthRanks(data.lastMonth);
        setAllTimeRanks(data.allTime);
      })
      .catch(err => console.error('Error fetching ranks:', err));

    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));

    fetch('/api/drinks')
      .then(res => res.json())
      .then(data => setDrinks(data))
      .catch(err => console.error('Error fetching drinks:', err));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    const handleSimRegister = () => {
      if (user.isRegistered) {
        // Toggle/replace account
        const randomNames = ['All-In霸王', '诈唬狂魔', '皇家同花顺', '深叠大佬', '河牌抓手'];
        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
        const randomPhone = '138' + Math.floor(10000000 + Math.random() * 90000000);
        registerUser(randomName, randomPhone);
      } else {
        registerUser('盲注大魔王', '13926880028');
      }
    };

    const handleSimAddMoney = () => {
      addBalance(100);
      alert('模拟：账户余额充值 ¥100 成功！💰');
    };

    const handleSimAddPoints = () => {
      if (!user.isRegistered) {
        alert('请先一键注册会员以统计积分及加入排行榜！✨');
        return;
      }
      fetch('/api/add-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: 50 })
      })
      .then(res => res.json())
      .then(u => {
        setUser(u);
        fetch('/api/ranks')
          .then(res => res.json())
          .then(ranksData => {
            setMonthlyRanks(ranksData.monthly);
            setLastMonthRanks(ranksData.lastMonth);
            setAllTimeRanks(ranksData.allTime);
          });
      })
      .catch(err => console.error('Error adding points:', err));
      alert('模拟：您的德州积分与大师分成功累积50积分！即时在服务器排行榜总榜刷新！🏆');
    };

    const handleSimResetBooking = () => {
      fetch('/api/reset', { method: 'POST' })
        .then(res => res.json())
        .then(() => {
          fetchAllData();
          setCart([]);
          alert('模拟沙盒重置完成。服务器已清空所有玩家定座及历史订单！🧹');
        })
        .catch(err => console.error('Error resetting simulation:', err));
    };

    window.addEventListener('sim-register', handleSimRegister);
    window.addEventListener('sim-add-money', handleSimAddMoney);
    window.addEventListener('sim-add-points', handleSimAddPoints);
    window.addEventListener('sim-reset-booking', handleSimResetBooking);

    return () => {
      window.removeEventListener('sim-register', handleSimRegister);
      window.removeEventListener('sim-add-money', handleSimAddMoney);
      window.removeEventListener('sim-add-points', handleSimAddPoints);
      window.removeEventListener('sim-reset-booking', handleSimResetBooking);
    };
  }, [user]);

  // Methods
  const registerUser = (nickname: string, phone: string) => {
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, phone })
    })
    .then(res => res.json())
    .then(data => {
      setUser(data);
      fetch('/api/ranks')
        .then(res => res.json())
        .then(ranksData => {
          setMonthlyRanks(ranksData.monthly);
          setLastMonthRanks(ranksData.lastMonth);
          setAllTimeRanks(ranksData.allTime);
        });
    })
    .catch(err => console.error('Error registering user:', err));
  };

  const addBalance = (amount: number) => {
    fetch('/api/recharge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    })
    .then(res => res.json())
    .then(data => {
      setUser(data);
    })
    .catch(err => console.error('Error adding balance:', err));
  };

  const addToCart = (drink: Drink) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.drink.id === drink.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { drink, quantity: 1 }];
    });
  };

  const removeFromCart = (drink: Drink) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.drink.id === drink.id);
      if (idx > -1) {
        const copy = [...prev];
        if (copy[idx].quantity <= 1) {
          return copy.filter(i => i.drink.id !== drink.id);
        }
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity - 1 };
        return copy;
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const bookSeat = (seatId: number, username: string, avatar: string) => {
    fetch('/api/seats/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId, username, avatar })
    })
    .then(res => res.json())
    .then(data => {
      setSeats(data);
      fetch('/api/user')
        .then(res => res.json())
        .then(u => setUser(u));
    })
    .catch(err => console.error('Error booking seat:', err));
  };

  const cancelSeat = (seatId: number) => {
    fetch('/api/seats/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId })
    })
    .then(res => res.json())
    .then(data => {
      setSeats(data);
    })
    .catch(err => console.error('Error cancelling seat:', err));
  };

  const handleOrderSubmission = (
    type: 'in-store' | 'takeaway', 
    phone: string, 
    notes: string, 
    couponValue: number
  ) => {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, type, phone, notes, couponValue })
    })
    .then(res => res.json())
    .then(data => {
      setUser(data.user);
      
      fetch('/api/orders')
        .then(res => res.json())
        .then(ordersData => setOrders(ordersData));

      fetch('/api/ranks')
        .then(res => res.json())
        .then(ranksData => {
          setMonthlyRanks(ranksData.monthly);
          setLastMonthRanks(ranksData.lastMonth);
          setAllTimeRanks(ranksData.allTime);
        });

      setTimeout(() => {
        setCart([]);
        setShowCheckout(false);
      }, 2000);
    })
    .catch(err => console.error('Error placing order:', err));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <WeChatWrapper
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      title="Bluff-7 Bar"
      isRegistered={user.isRegistered}
      cartCount={totalCartCount}
    >
      {/* Dynamic Tab Renderer */}
      {activeTab === 'order' && (
        orderSubView === 'home' ? (
          <HomeScreen
            user={user}
            onSelectTab={setActiveTab}
            onOpenOrderMenu={() => setOrderSubView('menu')}
            onOpenRecharge={() => {
              setActiveTab('mine');
              alert('已为您智能导航至【我的 - 账户充值】专区！💰');
            }}
            onOpenStoredAlcohol={() => {
              setActiveTab('mine');
              alert('已为您智能导航至【我的 - 私人存酒库】！🍷');
            }}
            onOpenPointsMall={() => {
              setActiveTab('mine');
              alert('已为您智能导航至【我的 - 积分商城】！🎁');
            }}
          />
        ) : (
          <OrderScreen
            drinks={drinks}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            onCheckout={() => setShowCheckout(true)}
            onBackToHome={() => setOrderSubView('home')}
          />
        )
      )}

      {activeTab === 'reservation' && (
        <ReservationScreen
          user={user}
          seats={seats}
          onBookSeat={bookSeat}
          onCancelSeat={cancelSeat}
        />
      )}

      {activeTab === 'rankings' && (
        <RankingsScreen
          monthlyRanks={monthlyRanks}
          lastMonthRanks={lastMonthRanks}
          allTimeRanks={allTimeRanks}
        />
      )}

      {activeTab === 'mine' && (
        <MineScreen
          user={user}
          orders={orders}
          registerUser={registerUser}
          onAddBalance={addBalance}
          onSelectTab={setActiveTab}
        />
      )}

      {/* Slide-Up checkout overlay modal screen matching Screen 4 */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          user={user}
          registerUser={registerUser}
          onClose={() => setShowCheckout(false)}
          onSubmitOrder={handleOrderSubmission}
        />
      )}
    </WeChatWrapper>
  );
}
