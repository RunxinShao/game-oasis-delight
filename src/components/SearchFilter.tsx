
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { categories, platforms } from '@/data/games';

interface SearchFilterProps {
  selectedCategory: string;
  selectedPlatform: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onPlatformChange: (platform: string) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export const SearchFilter = ({
  selectedCategory,
  selectedPlatform,
  sortBy,
  onCategoryChange,
  onPlatformChange,
  onSortChange,
  onReset
}: SearchFilterProps) => {
  return (
    <div className="glass-effect rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4 text-white">筛选与排序</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">游戏类型</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="选择类型" />
            </SelectTrigger>
            <SelectContent className="bg-game-card border-white/10">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white hover:bg-white/10">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">平台</label>
          <Select value={selectedPlatform} onValueChange={onPlatformChange}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="选择平台" />
            </SelectTrigger>
            <SelectContent className="bg-game-card border-white/10">
              {platforms.map((platform) => (
                <SelectItem key={platform} value={platform} className="text-white hover:bg-white/10">
                  {platform}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">排序方式</label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent className="bg-game-card border-white/10">
              <SelectItem value="rating" className="text-white hover:bg-white/10">评分最高</SelectItem>
              <SelectItem value="price-low" className="text-white hover:bg-white/10">价格最低</SelectItem>
              <SelectItem value="price-high" className="text-white hover:bg-white/10">价格最高</SelectItem>
              <SelectItem value="newest" className="text-white hover:bg-white/10">最新发布</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-end">
          <Button 
            variant="outline" 
            onClick={onReset}
            className="w-full border-white/20 text-white hover:bg-white/10"
          >
            重置筛选
          </Button>
        </div>
      </div>
    </div>
  );
};
