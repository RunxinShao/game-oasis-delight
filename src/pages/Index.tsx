
import { useState, useMemo } from 'react';
import { gamesData, categories, platforms } from '@/data/games';
import { GameCard } from '@/components/GameCard';
import { SearchFilter } from '@/components/SearchFilter';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedPlatform, setSelectedPlatform] = useState('全部');
  const [sortBy, setSortBy] = useState('rating');

  const filteredAndSortedGames = useMemo(() => {
    let filtered = gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === '全部' || game.category === selectedCategory;
      const matchesPlatform = selectedPlatform === '全部' || game.platforms.includes(selectedPlatform);
      
      return matchesSearch && matchesCategory && matchesPlatform;
    });

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedPlatform, sortBy]);

  const featuredGames = gamesData.filter(game => game.featured);

  const handleReset = () => {
    setSelectedCategory('全部');
    setSelectedPlatform('全部');
    setSortBy('rating');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-game-bg">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-game-purple/20 to-game-cyan/20 border-white/10 overflow-hidden">
            <CardContent className="p-8 text-center">
              <h2 className="text-4xl font-bold gradient-text mb-4">
                发现你的下一个最爱游戏
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                探索数千款精选游戏，从独立制作到3A大作，找到完美适合你的游戏体验
              </p>
              <div className="flex justify-center space-x-4">
                <Badge className="bg-game-accent text-white">最新游戏</Badge>
                <Badge className="bg-game-purple text-white">独家折扣</Badge>
                <Badge className="bg-game-cyan text-white">免费游戏</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Featured Games */}
        {!searchTerm && selectedCategory === '全部' && selectedPlatform === '全部' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">精选游戏</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <SearchFilter
          selectedCategory={selectedCategory}
          selectedPlatform={selectedPlatform}
          sortBy={sortBy}
          onCategoryChange={setSelectedCategory}
          onPlatformChange={setSelectedPlatform}
          onSortChange={setSortBy}
          onReset={handleReset}
        />

        {/* Games Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {searchTerm ? `搜索结果: "${searchTerm}"` : '所有游戏'}
            </h2>
            <p className="text-muted-foreground">
              找到 {filteredAndSortedGames.length} 款游戏
            </p>
          </div>
          
          {filteredAndSortedGames.length === 0 ? (
            <Card className="bg-game-card border-white/10">
              <CardContent className="p-12 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">未找到匹配的游戏</h3>
                <p className="text-muted-foreground mb-4">尝试调整搜索条件或筛选器</p>
                <button 
                  onClick={handleReset}
                  className="text-game-accent hover:text-game-cyan transition-colors"
                >
                  重置所有筛选条件
                </button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedGames.map((game, index) => (
                <div key={game.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Index;
