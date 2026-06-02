export interface Drink {
  id: string;
  name: string;
  englishName?: string;
  ingredients: string[];
  sales: number;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface OrderItem {
  drink: Drink;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
  type: 'in-store' | 'takeaway';
  status: 'pending' | 'completed';
  phone?: string;
  notes?: string;
}

export interface Seat {
  id: number; // 1-9
  status: 'empty' | 'booked';
  username?: string;
  avatar?: string;
  bookingTime?: string;
}

export interface PlayerRank {
  rank: number;
  avatar: string;
  nickname: string;
  masterScore: number;
}

export interface UserProfile {
  isRegistered: boolean;
  nickname: string;
  phone: string;
  avatar: string;
  balance: number;
  couponsCount: number;
  points: number;
  masterScore: number;
  address?: string;
  storedAlcohol?: string[];
}
