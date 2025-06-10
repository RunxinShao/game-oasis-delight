
import { Game } from '@/types/game';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rating } from './Rating';
import { Heart, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const formatPrice = (price: number) => {
    if (price === 0) return '免费';
    return `¥${price}`;
  };

  return (
    <Card className="game-card-hover bg-game-card border-white/10 overflow-hidden group">
      <div className="relative">
        <img 
          src={game.imageUrl} 
          alt={game.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
            <Heart className="h-4 w-4 text-white" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
            <Plus className="h-4 w-4 text-white" />
          </Button>
        </div>
        {game.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-game-purple to-game-cyan">
            精选
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Link to={`/game/${game.id}`}>
              <h3 className="font-semibold text-lg text-white hover:text-game-accent transition-colors cursor-pointer line-clamp-1">
                {game.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{game.developer}</p>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {game.description}
          </p>
          
          <div className="flex items-center justify-between">
            <Rating rating={game.rating} size="sm" />
            <Badge variant="secondary" className="bg-white/10 text-white">
              {game.category}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {game.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-white/20 text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-game-accent">
                {formatPrice(game.price)}
              </span>
              {game.originalPrice && game.originalPrice > game.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ¥{game.originalPrice}
                </span>
              )}
            </div>
            <Button size="sm" className="bg-gradient-to-r from-game-purple to-game-cyan hover:opacity-90">
              {game.price === 0 ? '下载' : '购买'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
