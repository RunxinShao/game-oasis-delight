
import { useParams, Link } from 'react-router-dom';
import { gamesData } from '@/data/games';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Rating } from '@/components/Rating';
import { Heart, Plus, Star } from 'lucide-react';
import { Header } from '@/components/Header';
import { useState } from 'react';

export default function GameDetail() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const game = gamesData.find(g => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-game-bg">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">游戏未找到</h1>
          <Link to="/">
            <Button>返回首页</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price === 0) return '免费';
    return `¥${price}`;
  };

  return (
    <div className="min-h-screen bg-game-bg">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 游戏图片和基本信息 */}
          <div className="lg:col-span-2">
            <Card className="bg-game-card border-white/10 overflow-hidden">
              <div className="relative">
                <img 
                  src={game.imageUrl} 
                  alt={game.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button variant="ghost" className="bg-black/50 hover:bg-black/70">
                    <Heart className="h-5 w-5 text-white mr-2" />
                    收藏
                  </Button>
                  <Button variant="ghost" className="bg-black/50 hover:bg-black/70">
                    <Plus className="h-5 w-5 text-white mr-2" />
                    愿望单
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
                    <p className="text-muted-foreground">开发商: {game.developer}</p>
                    <p className="text-muted-foreground">发布日期: {game.releaseDate}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Rating rating={game.rating} size="lg" />
                    <Badge className="bg-gradient-to-r from-game-purple to-game-cyan">
                      {game.category}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed">{game.description}</p>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {game.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-white/20 text-muted-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">支持平台</h3>
                    <div className="flex flex-wrap gap-2">
                      {game.platforms.map((platform) => (
                        <Badge key={platform} variant="secondary" className="bg-white/10 text-white">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 购买侧边栏 */}
          <div className="space-y-6">
            <Card className="bg-game-card border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-3xl font-bold text-game-accent">
                        {formatPrice(game.price)}
                      </span>
                      {game.originalPrice && game.originalPrice > game.price && (
                        <span className="text-lg text-muted-foreground line-through">
                          ¥{game.originalPrice}
                        </span>
                      )}
                    </div>
                    {game.originalPrice && game.originalPrice > game.price && (
                      <Badge className="bg-red-600">
                        -{Math.round((1 - game.price / game.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-game-purple to-game-cyan hover:opacity-90 text-lg py-3">
                    {game.price === 0 ? '免费下载' : '立即购买'}
                  </Button>
                  
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    添加到购物车
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* 用户评价 */}
            <Card className="bg-game-card border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">用户评价</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-game-accent">{game.rating}/5</span>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-muted-foreground">基于1,234条评价</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-2">
                        <span className="text-sm w-8">{stars}星</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-8">{stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
