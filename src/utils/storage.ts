
const STORAGE_KEYS = {
  USERS: 'gamehub_users',
  CURRENT_USER: 'gamehub_current_user',
  GAME_REVIEWS: 'gamehub_reviews',
  USER_FAVORITES: 'gamehub_favorites',
};

export const storage = {
  // 用户存储
  getUsers: (): any[] => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },

  saveUsers: (users: any[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getCurrentUser: (): any | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: any) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  clearCurrentUser: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // 游戏评论存储
  getReviews: (): any[] => {
    const reviews = localStorage.getItem(STORAGE_KEYS.GAME_REVIEWS);
    return reviews ? JSON.parse(reviews) : [];
  },

  saveReviews: (reviews: any[]) => {
    localStorage.setItem(STORAGE_KEYS.GAME_REVIEWS, JSON.stringify(reviews));
  },

  // 用户收藏存储
  getFavorites: (userId: string): string[] => {
    const favorites = localStorage.getItem(`${STORAGE_KEYS.USER_FAVORITES}_${userId}`);
    return favorites ? JSON.parse(favorites) : [];
  },

  saveFavorites: (userId: string, gameIds: string[]) => {
    localStorage.setItem(`${STORAGE_KEYS.USER_FAVORITES}_${userId}`, JSON.stringify(gameIds));
  },
};
