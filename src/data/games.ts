
import { Game } from '@/types/game';

export const gamesData: Game[] = [
  {
    id: '1',
    title: 'Cyberpunk 2077',
    description: '在2077年的夜之城中体验开放世界冒险RPG游戏，在这个权力、魅力和身体改造的城市中雕刻出你的传奇。',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop',
    rating: 4.2,
    price: 298,
    originalPrice: 398,
    category: 'RPG',
    tags: ['开放世界', '科幻', '动作', '单人'],
    releaseDate: '2020-12-10',
    developer: 'CD Projekt RED',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    featured: true,
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop'
    ]
  },
  {
    id: '2',
    title: 'The Witcher 3: Wild Hunt',
    description: '在广阔的开放世界中追寻失踪的养女，这是一个充满商人城市、海盗岛屿、危险山口和被遗忘洞穴的世界。',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    rating: 4.8,
    price: 199,
    category: 'RPG',
    tags: ['开放世界', '奇幻', '冒险', '单人'],
    releaseDate: '2015-05-19',
    developer: 'CD Projekt RED',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
    featured: true
  },
  {
    id: '3',
    title: 'Elden Ring',
    description: '在辽阔的幻想世界中踏上旅程，创造你自己的传奇。FromSoftware和乔治·R·R·马丁合作的巅峰之作。',
    imageUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd045c?w=400&h=600&fit=crop',
    rating: 4.7,
    price: 359,
    category: 'Action',
    tags: ['魂系列', '开放世界', '困难', '单人'],
    releaseDate: '2022-02-25',
    developer: 'FromSoftware',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    featured: true
  },
  {
    id: '4',
    title: 'Valorant',
    description: '5v5角色射击游戏，每个角色都有独特的能力。精准射击与独特技能的完美结合。',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop',
    rating: 4.3,
    price: 0,
    category: 'FPS',
    tags: ['多人', '竞技', '战术', '免费'],
    releaseDate: '2020-06-02',
    developer: 'Riot Games',
    platforms: ['PC'],
    featured: false
  },
  {
    id: '5',
    title: 'Minecraft',
    description: '在无限的世界中建造、探索和生存。释放你的创造力，与朋友一起创造令人惊叹的建筑。',
    imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop',
    rating: 4.6,
    price: 165,
    category: 'Sandbox',
    tags: ['沙盒', '建造', '创造', '多人'],
    releaseDate: '2011-11-18',
    developer: 'Mojang Studios',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Mobile', 'Nintendo Switch']
  },
  {
    id: '6',
    title: 'League of Legends',
    description: '世界上最受欢迎的多人在线战斗竞技场游戏。与朋友组队，选择你的冠军，进入战斗！',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop',
    rating: 4.1,
    price: 0,
    category: 'MOBA',
    tags: ['多人', '竞技', '团队', '免费'],
    releaseDate: '2009-10-27',
    developer: 'Riot Games',
    platforms: ['PC']
  }
];

export const categories = ['全部', 'RPG', 'Action', 'FPS', 'MOBA', 'Sandbox'];
export const platforms = ['全部', 'PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'];
