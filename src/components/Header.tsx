
import { useState } from 'react';
import { Search, Gamepad, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthDialog } from './AuthDialog';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ searchTerm, onSearchChange }: HeaderProps) => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, logout } = useAuth();

  const openLoginDialog = () => {
    setAuthMode('login');
    setAuthDialogOpen(true);
  };

  const openRegisterDialog = () => {
    setAuthMode('register');
    setAuthDialogOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gamepad className="h-8 w-8 text-game-accent" />
              <h1 className="text-2xl font-bold gradient-text">GameHub</h1>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="搜索游戏..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-game-accent" />
                    <span className="text-white">{user.username}</span>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="text-white hover:bg-white/10"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    退出
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={openLoginDialog}
                    className="text-white hover:bg-white/10"
                  >
                    登录
                  </Button>
                  <Button
                    onClick={openRegisterDialog}
                    className="bg-gradient-to-r from-game-purple to-game-cyan hover:opacity-90"
                  >
                    注册
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        defaultMode={authMode}
      />
    </>
  );
};
