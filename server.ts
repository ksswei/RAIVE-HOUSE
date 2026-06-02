import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Drink, PlayerRank, UserProfile, Seat, Order } from './src/types';

// Let's load the initial datasets
const INITIAL_DRINKS: Drink[] = [
  {
    id: '1',
    name: '教父',
    englishName: 'Godfather',
    ingredients: ['苏格兰威士忌', '杏仁利口酒'],
    sales: 142,
    price: 58,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80',
    category: 'cocktail',
    description: '苏格兰威士忌的深邃烟熏香气与杏仁利口酒的甜美馨香相互交融，烈性而优雅，犹如黑帮教父般冷酷下隐藏着一丝温情。'
  },
  {
    id: '2',
    name: '尼格罗尼',
    englishName: 'Negroni',
    ingredients: ['金酒', '金巴利', '甜味美思'],
    sales: 218,
    price: 58,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
    category: 'cocktail',
    description: '经典的意大利鸡尾酒。草本金酒、微苦的金马利以及甜美思一比一完美交织，红宝石般的色泽散发出柑橘和草药馥郁的微苦香气。'
  },
  {
    id: '3',
    name: '止痛药',
    englishName: 'Painkiller',
    ingredients: ['朗姆酒', '橙汁', '菠萝汁', '椰奶'],
    sales: 185,
    price: 58,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=400&q=80',
    category: 'cocktail',
    description: '来自英属维尔京群岛的经典配方。浓郁的热带椰香与甜蜜菠萝汁平衡了朗姆酒的烈度，再撒上少许肉豆蔻粉，一口便能抚平生活的浮躁。'
  },
  {
    id: '4',
    name: '威士忌酸',
    englishName: 'Whiskey Sour',
    ingredients: ['波本威士忌', '柠檬汁', '蛋清'],
    sales: 320,
    price: 58,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80',
    category: 'cocktail',
    description: '浓烈的波本威士忌香气在柠檬的凛冽爽酸中释放开来，细密的蛋清泡沫增添了如丝绸般绵密温和的手感与口感，经典而耐人寻味。'
  },
  {
    id: '5',
    name: '罗勒黄瓜金',
    englishName: 'Basil Cucumber Gin',
    ingredients: ['亨利金酒', '黄瓜', '罗勒', '柠檬'],
    sales: 96,
    price: 58,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
    category: 'cocktail',
    description: '极致清爽的夏日特调。青翠的罗勒叶与新鲜多汁的黄瓜片在亨利金酒的芬芳中相遇，散发出雨后草地般的清爽自然。'
  },
  {
    id: '6',
    name: '高潮',
    englishName: 'Orgasm',
    ingredients: ['君度', '百利甜', '橙汁'],
    sales: 164,
    price: 58,
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80',
    category: 'cocktail',
    description: '甜美细腻的利口酒组合。百利甜的丝滑奶油风味与君度橙酒的清凉蜜橙香气在冰块中相融，入口甘甜丝滑，如奶油般化在心头。'
  },
  {
    id: '7',
    name: '麦卡伦 12年 单一麦芽',
    englishName: 'The Macallan 12 Years',
    ingredients: ['苏格兰麦卡伦12年雪莉桶'],
    sales: 58,
    price: 98,
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=400&q=80',
    category: 'whiskey',
    description: '享有“单一麦芽威士忌中的罗曼尼康帝”美誉。历经西班牙雪莉橡木桶十二年熟化，带来浓郁的干果、香料以及太妃糖和木质烟熏醇香。'
  },
  {
    id: '8',
    name: '泰斯卡 10年 泥煤风味',
    englishName: 'Talisker 10 Years',
    ingredients: ['苏格兰泰斯卡10年'],
    sales: 42,
    price: 78,
    image: 'https://images.unsplash.com/photo-1508253730749-0f04079a4de3?auto=format&fit=crop&w=400&q=80',
    category: 'whiskey',
    description: '独具一格的重火山岛泥煤泥土与胡椒辛香。入口后海盐的咸湿与泥煤的烈火相融，是探索威士忌狂野风味的极致代表。'
  },
  {
    id: '9',
    name: '迷失海岸 IPA',
    englishName: 'Lost Coast IPA',
    ingredients: ['美式精酿啤酒IPA'],
    sales: 135,
    price: 45,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80',
    category: 'beer',
    description: '经典的西海岸风格IPA，散发着热烈奔放的热带水果、百香果和松针香气，苦度纯正持久，回甘连绵。'
  },
  {
    id: '10',
    name: '经典黑椒薯角',
    englishName: 'Black Pepper Potato Wedges',
    ingredients: ['深炸厚切薯角', '秘制黑椒粉', '番茄沙司'],
    sales: 290,
    price: 38,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=400&q=80',
    category: 'snack',
    description: '金黄熟透、外焦里嫩的加厚原切薯角，撒上主厨精选研磨的黑胡椒粒，搭配经典番茄蘸酱，佐酒首选。'
  },
  {
    id: '11',
    name: '黑胡椒鸡块',
    englishName: 'Black Pepper Chicken Nuggets',
    ingredients: ['黑椒酥脆鸡块', '泰式甜辣酱'],
    sales: 198,
    price: 42,
    image: 'https://images.unsplash.com/photo-1562967914-6c41b89d3144?auto=format&fit=crop&w=400&q=80',
    category: 'snack',
    description: '精选嫩滑鸡胸肉秘制，外皮超级金黄酥脆，咬开肉汁饱满，微辛椒香，配以泰式甜辣酱，越嚼越香。'
  }
];

// STATE STORED IN SERVER RAM (resets on restart, behaves like a real backend memory DB)
let serverUser: UserProfile = {
  isRegistered: false,
  nickname: '游客账户',
  phone: '',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
  balance: 0,
  couponsCount: 0,
  points: 0,
  masterScore: 0,
  storedAlcohol: []
};

let serverSeats: Seat[] = [
  { id: 1, status: 'booked', username: '王总 (Jerry)', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80', bookingTime: '21:05' },
  { id: 2, status: 'empty' },
  { id: 3, status: 'booked', username: '德州迷弟 (Jack)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', bookingTime: '21:12' },
  { id: 4, status: 'empty' },
  { id: 5, status: 'empty' },
  { id: 6, status: 'empty' },
  { id: 7, status: 'booked', username: '筹码收割机', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', bookingTime: '20:45' },
  { id: 8, status: 'empty' },
  { id: 9, status: 'empty' }
];

let serverOrders: Order[] = [];

let monthlyRankings: PlayerRank[] = [
  { rank: 1, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80', nickname: '盲注大恶魔', masterScore: 1250 },
  { rank: 2, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', nickname: '诈唬之王', masterScore: 1120 },
  { rank: 3, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80', nickname: '全下不看牌', masterScore: 980 },
  { rank: 4, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80', nickname: '深栈老狐狸', masterScore: 840 },
  { rank: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', nickname: '筹码粉碎机', masterScore: 710 },
  { rank: 6, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80', nickname: '皇家同花顺', masterScore: 600 }
];

let lastMonthRankings: PlayerRank[] = [
  { rank: 1, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', nickname: '筹码粉碎机', masterScore: 1420 },
  { rank: 2, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80', nickname: '盲注大恶魔', masterScore: 1300 },
  { rank: 3, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', nickname: '诈唬之王', masterScore: 1050 },
  { rank: 4, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80', nickname: '皇家同花顺', masterScore: 780 }
];

let allTimeRankings: PlayerRank[] = [
  { rank: 1, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', nickname: '诈唬之王', masterScore: 4890 },
  { rank: 2, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80', nickname: '盲注大恶魔', masterScore: 4320 },
  { rank: 3, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', nickname: '筹码粉碎机', masterScore: 3950 },
  { rank: 4, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80', nickname: '全下不看牌', masterScore: 3510 },
  { rank: 5, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80', nickname: '深栈老狐狸', masterScore: 2840 },
  { rank: 6, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80', nickname: '皇家同花顺', masterScore: 2100 }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // -------------------------------------------------------------
  // API ENDPOINTS
  // -------------------------------------------------------------

  // Get drinks list
  app.get('/api/drinks', (req, res) => {
    res.json(INITIAL_DRINKS);
  });

  // Get user profile
  app.get('/api/user', (req, res) => {
    res.json(serverUser);
  });

  // Register user profile
  app.post('/api/register', (req, res) => {
    const { nickname, phone } = req.body;
    if (!nickname || !phone) {
      return res.status(400).json({ error: 'Please provide nickname and phone number' });
    }

    serverUser = {
      isRegistered: true,
      nickname,
      phone,
      avatar: `https://images.unsplash.com/photo-${1535713875002 + Math.floor(Math.random() * 100)}?auto=format&fit=crop&w=80&q=80`,
      balance: serverUser.balance + 60, // Give some signature gift allowance
      couponsCount: 3,
      points: 100, // starting welcome points
      masterScore: 680, // starting poker performance segment
      storedAlcohol: []
    };

    // Insert or update user inside all-time rankings list
    const existsInAllTime = allTimeRankings.some(r => r.nickname === nickname);
    if (!existsInAllTime) {
      allTimeRankings.push({
        rank: 99,
        avatar: serverUser.avatar,
        nickname,
        masterScore: 680
      });
      // Sort and recalculate
      allTimeRankings = allTimeRankings
        .sort((a, b) => b.masterScore - a.masterScore)
        .map((player, idx) => ({ ...player, rank: idx + 1 }));
    }

    res.json(serverUser);
  });

  // Add balance (Recharge)
  app.post('/api/recharge', (req, res) => {
    const { amount } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid recharge amount' });
    }

    serverUser.balance += amount;
    res.json(serverUser);
  });

  // Get seats map
  app.get('/api/seats', (req, res) => {
    res.json(serverSeats);
  });

  // Book a seat
  app.post('/api/seats/book', (req, res) => {
    const { seatId, username, avatar } = req.body;
    if (!seatId || !username) {
      return res.status(400).json({ error: 'Seat ID and username required' });
    }

    const now = new Date();
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    serverSeats = serverSeats.map(seat => {
      if (seat.id === seatId) {
        return {
          id: seatId,
          status: 'booked',
          username,
          avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
          bookingTime: formattedTime
        };
      }
      return seat;
    });

    // Reward active user for sitting down
    if (username === serverUser.nickname && serverUser.isRegistered) {
      serverUser.points += 20; // Sit down welcome points
    }

    res.json(serverSeats);
  });

  // Cancel seat
  app.post('/api/seats/cancel', (req, res) => {
    const { seatId } = req.body;
    if (!seatId) {
      return res.status(400).json({ error: 'Seat ID required' });
    }

    serverSeats = serverSeats.map(seat => {
      if (seat.id === seatId) {
        return { id: seatId, status: 'empty' };
      }
      return seat;
    });

    res.json(serverSeats);
  });

  // Get rankings
  app.get('/api/ranks', (req, res) => {
    res.json({
      monthly: monthlyRankings,
      lastMonth: lastMonthRankings,
      allTime: allTimeRankings
    });
  });

  // Get orders list
  app.get('/api/orders', (req, res) => {
    res.json(serverOrders);
  });

  // Place a new order
  app.post('/api/orders', (req, res) => {
    const { items, type, phone, notes, couponValue } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Valid order items array required' });
    }

    const subtotal = items.reduce((sum: number, item: any) => sum + (item.drink.price * item.quantity), 0);
    const finalBillPrice = Math.max(0, subtotal - (couponValue || 0));

    // Point calculations
    const pointGain = Math.floor(finalBillPrice / 2) + 10;

    // Detect if top-end whiskeys are ordered and auto-vault them
    const wineVaultList: string[] = [];
    items.forEach((item: any) => {
      if (item.drink.category === 'whiskey') {
        wineVaultList.push(item.drink.name);
      }
    });

    // Create unique order
    const now = new Date();
    const timestampStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newOrder: Order = {
      id: 'RH-' + Math.floor(100000 + Math.random() * 900000),
      items,
      totalAmount: finalBillPrice,
      createdAt: timestampStr,
      type: type || 'in-store',
      status: 'completed',
      phone,
      notes
    };

    serverOrders = [newOrder, ...serverOrders];

    // Deduct user balance and update points
    const deductions = Math.min(serverUser.balance, finalBillPrice);
    serverUser.balance = Math.max(0, serverUser.balance - deductions);
    
    if (serverUser.isRegistered) {
      serverUser.points += pointGain;
      serverUser.masterScore += pointGain;
      serverUser.couponsCount = Math.max(0, serverUser.couponsCount - (couponValue > 0 ? 1 : 0));
      serverUser.storedAlcohol = [...(serverUser.storedAlcohol || []), ...wineVaultList];

      // Update all rankings
      const updateScores = (list: PlayerRank[]) => {
        const hasUser = list.some(p => p.nickname === serverUser.nickname);
        let updatedList = [...list];
        if (hasUser) {
          updatedList = updatedList.map(p => p.nickname === serverUser.nickname ? { ...p, masterScore: serverUser.masterScore } : p);
        } else {
          updatedList.push({
            rank: 99,
            avatar: serverUser.avatar,
            nickname: serverUser.nickname,
            masterScore: serverUser.masterScore
          });
        }
        return updatedList
          .sort((a, b) => b.masterScore - a.masterScore)
          .map((player, idx) => ({ ...player, rank: idx + 1 }));
      };

      allTimeRankings = updateScores(allTimeRankings);
      monthlyRankings = updateScores(monthlyRankings);
    }

    res.json({ order: newOrder, user: serverUser });
  });

  // Add points manually (Simulation support)
  app.post('/api/add-points', (req, res) => {
    const { points } = req.body;
    if (serverUser.isRegistered) {
      serverUser.points += points;
      serverUser.masterScore += points;

      // Update all rankings
      const updateScores = (list: PlayerRank[]) => {
        const hasUser = list.some(p => p.nickname === serverUser.nickname);
        let updatedList = [...list];
        if (hasUser) {
          updatedList = updatedList.map(p => p.nickname === serverUser.nickname ? { ...p, masterScore: serverUser.masterScore } : p);
        } else {
          updatedList.push({
            rank: 99,
            avatar: serverUser.avatar,
            nickname: serverUser.nickname,
            masterScore: serverUser.masterScore
          });
        }
        return updatedList
          .sort((a, b) => b.masterScore - a.masterScore)
          .map((player, idx) => ({ ...player, rank: idx + 1 }));
      };

      allTimeRankings = updateScores(allTimeRankings);
      monthlyRankings = updateScores(monthlyRankings);
    }
    res.json(serverUser);
  });

  // Reset sandbox memory
  app.post('/api/reset', (req, res) => {
    serverUser = {
      isRegistered: false,
      nickname: '游客账户',
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      balance: 0,
      couponsCount: 0,
      points: 0,
      masterScore: 0,
      storedAlcohol: []
    };

    serverSeats = [
      { id: 1, status: 'booked', username: '王总 (Jerry)', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80', bookingTime: '21:05' },
      { id: 2, status: 'empty' },
      { id: 3, status: 'booked', username: '德州迷弟 (Jack)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', bookingTime: '21:12' },
      { id: 4, status: 'empty' },
      { id: 5, status: 'empty' },
      { id: 6, status: 'empty' },
      { id: 7, status: 'booked', username: '筹码收割机', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', bookingTime: '20:45' },
      { id: 8, status: 'empty' },
      { id: 9, status: 'empty' }
    ];

    serverOrders = [];

    res.json({ message: 'Sandbox state restored!' });
  });

  // -------------------------------------------------------------
  // VITE DEV SERVER OR STATIC SERVING MIDDLEWARE
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[RAIVE HOUSE Server] Running full-stack environment at: http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
