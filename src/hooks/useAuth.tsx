
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserCredentials, RegisterData } from '@/types/user';
import { storage } from '@/utils/storage';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  login: (credentials: UserCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = storage.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (credentials: UserCredentials): Promise<boolean> => {
    try {
      const users = storage.getUsers();
      const foundUser = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        storage.setCurrentUser(userWithoutPassword);
        toast({
          title: "登录成功",
          description: `欢迎回来，${foundUser.username}！`,
        });
        return true;
      } else {
        toast({
          title: "登录失败",
          description: "邮箱或密码错误",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "登录失败",
        description: "登录过程中出现错误",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const users = storage.getUsers();
      
      // 检查邮箱是否已存在
      if (users.some((u) => u.email === data.email)) {
        toast({
          title: "注册失败",
          description: "该邮箱已被注册",
          variant: "destructive",
        });
        return false;
      }

      // 检查用户名是否已存在
      if (users.some((u) => u.username === data.username)) {
        toast({
          title: "注册失败",
          description: "该用户名已被使用",
          variant: "destructive",
        });
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        username: data.username,
        email: data.email,
        password: data.password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      storage.saveUsers(users);

      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      storage.setCurrentUser(userWithoutPassword);

      toast({
        title: "注册成功",
        description: `欢迎加入GameHub，${newUser.username}！`,
      });
      return true;
    } catch (error) {
      toast({
        title: "注册失败",
        description: "注册过程中出现错误",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    storage.clearCurrentUser();
    toast({
      title: "已退出登录",
      description: "期待您的再次光临！",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
