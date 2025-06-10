
import { Star, StarHalf } from 'lucide-react';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export const Rating = ({ rating, maxRating = 5, size = 'md', showNumber = true }: RatingProps) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  const stars = [];
  
  for (let i = 1; i <= maxRating; i++) {
    if (i <= rating) {
      stars.push(
        <Star key={i} className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
      );
    } else if (i - 0.5 <= rating) {
      stars.push(
        <StarHalf key={i} className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
      );
    } else {
      stars.push(
        <Star key={i} className={`${sizeClasses[size]} text-gray-400`} />
      );
    }
  }
  
  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {stars}
      </div>
      {showNumber && (
        <span className="text-sm text-muted-foreground ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
