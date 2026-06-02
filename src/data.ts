import { Drink, PlayerRank } from './types';

export const CATEGORIES = [
  { id: 'cocktail', name: '鸡尾酒' },
  { id: 'whiskey', name: '威士忌' },
  { id: 'beer', name: '精酿啤酒' },
  { id: 'snack', name: '经典小食' }
];

export const INITIAL_DRINKS: Drink[] = [
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
  // Extra premium items for the menu to make it rich but adhering to the bar theme
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

export const INITIAL_MONTH_RANKS: PlayerRank[] = [
  { rank: 1, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80', nickname: '盲注大恶魔', masterScore: 1250 },
  { rank: 2, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', nickname: '诈唬之王', masterScore: 1120 },
  { rank: 3, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80', nickname: '全下不看牌', masterScore: 980 },
  { rank: 4, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80', nickname: '深栈老狐狸', masterScore: 840 },
  { rank: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', nickname: '筹码粉碎机', masterScore: 710 },
  { rank: 6, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80', nickname: '皇家同花顺', masterScore: 600 }
];

export const INITIAL_LAST_MONTH_RANKS: PlayerRank[] = [
  { rank: 1, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', nickname: '筹码粉碎机', masterScore: 1420 },
  { rank: 2, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80', nickname: '盲注大恶魔', masterScore: 1300 },
  { rank: 3, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', nickname: '诈唬之王', masterScore: 1050 },
  { rank: 4, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80', nickname: '皇家同花顺', masterScore: 780 }
];

export const INITIAL_ALL_TIME_RANKS: PlayerRank[] = [
  { rank: 1, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', nickname: '诈唬之王', masterScore: 4890 },
  { rank: 2, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80', nickname: '盲注大恶魔', masterScore: 4320 },
  { rank: 3, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', nickname: '筹码粉碎机', masterScore: 3950 },
  { rank: 4, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80', nickname: '全下不看牌', masterScore: 3510 },
  { rank: 5, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80', nickname: '深栈老狐狸', masterScore: 2840 },
  { rank: 6, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80', nickname: '皇家同花顺', masterScore: 2100 }
];

export const MOCK_SEATS: { [key: number]: string } = {
  1: '王总 (Jerry)',
  3: '德州迷弟 (Jack)',
  7: '筹码收割机',
};

export const MOCK_COUPONS = [
  { id: 'c1', title: '全场首杯半价券', desc: '新会员体验专享，酒水产品立减29元', minSpend: 58, value: 29, expiry: '2026-12-31' },
  { id: 'c2', title: '5元无门槛酒水抵用券', desc: '任意消费可用，全场直降5元', minSpend: 0, value: 5, expiry: '2026-08-31' },
  { id: 'c3', title: '满100元自存酒立减15元', desc: '存酒、开会员赠送专项优惠券', minSpend: 100, value: 15, expiry: '2026-10-15' }
];

export const MOCK_STORES = [
  { id: 's1', name: 'Bluff-7 Bar(Bluff-7 Bar)', address: '广东省东莞市黄江镇板湖路30号汇隆中心9楼', distance: '12.4km' }
];
