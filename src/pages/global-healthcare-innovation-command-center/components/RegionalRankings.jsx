import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RegionalRankings = ({ rankings }) => {
  const [selectedMetric, setSelectedMetric] = useState('overall');

  const metrics = [
    { id: 'overall', label: 'Overall', icon: 'Trophy' },
    { id: 'innovation', label: 'Innovation', icon: 'Lightbulb' },
    { id: 'adoption', label: 'Adoption', icon: 'TrendingUp' },
    { id: 'investment', label: 'Investment', icon: 'DollarSign' }
  ];

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-warning';
    if (rank === 2) return 'text-muted-foreground';
    if (rank === 3) return 'text-warning/70';
    return 'text-muted-foreground';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return 'Crown';
    if (rank === 2) return 'Medal';
    if (rank === 3) return 'Award';
    return 'Hash';
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-warning';
    return 'text-muted-foreground';
  };

  const filteredRankings = rankings?.filter(region => 
    selectedMetric === 'overall' || region?.category === selectedMetric
  )?.sort((a, b) => b?.score - a?.score);

  return (
    <div className="glassmorphism p-6 rounded-xl neon-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Regional Rankings
          </h2>
          <p className="text-sm text-muted-foreground font-caption">
            Comparative performance analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={16} className="text-primary" />
          <span className="text-xs font-data text-primary">Live Rankings</span>
        </div>
      </div>
      {/* Metric Selector */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {metrics?.map((metric) => (
          <button
            key={metric?.id}
            onClick={() => setSelectedMetric(metric?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth whitespace-nowrap ${
              selectedMetric === metric?.id
                ? 'bg-primary/20 text-primary neon-border' :'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card/70'
            }`}
          >
            <Icon name={metric?.icon} size={16} />
            <span className="text-sm font-heading font-medium">{metric?.label}</span>
          </button>
        ))}
      </div>
      {/* Rankings List */}
      <div className="space-y-3">
        {filteredRankings?.slice(0, 10)?.map((region, index) => {
          const rank = index + 1;
          return (
            <div key={region?.id} className="flex items-center space-x-4 p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-smooth">
              {/* Rank */}
              <div className="flex items-center justify-center w-8 h-8">
                <Icon 
                  name={getRankIcon(rank)} 
                  size={20} 
                  className={getRankColor(rank)} 
                />
              </div>
              {/* Region Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-heading font-semibold text-foreground">
                    {region?.name}
                  </h3>
                  <div className="w-6 h-4 rounded overflow-hidden">
                    <img 
                      src={region?.flag} 
                      alt={`${region?.name} flag`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-caption">
                  {region?.description}
                </p>
              </div>
              {/* Score */}
              <div className="text-right">
                <div className={`text-xl font-heading font-bold ${getScoreColor(region?.score)}`}>
                  {region?.score}
                </div>
                <div className="text-xs text-muted-foreground font-caption">
                  Score
                </div>
              </div>
              {/* Change Indicator */}
              <div className="flex items-center space-x-1">
                <Icon 
                  name={region?.change >= 0 ? "TrendingUp" : "TrendingDown"} 
                  size={16} 
                  className={region?.change >= 0 ? "text-success" : "text-destructive"} 
                />
                <span className={`text-xs font-data ${region?.change >= 0 ? "text-success" : "text-destructive"}`}>
                  {Math.abs(region?.change)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Top Performers Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-heading font-semibold text-foreground mb-4">
          Top Performers Insights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-card/30">
            <Icon name="Crown" size={24} className="text-warning mx-auto mb-2" />
            <div className="text-sm font-heading font-bold text-foreground">
              {filteredRankings?.[0]?.name || 'N/A'}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Leading Region
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-card/30">
            <Icon name="TrendingUp" size={24} className="text-success mx-auto mb-2" />
            <div className="text-sm font-heading font-bold text-foreground">
              {filteredRankings?.filter(r => r?.change > 0)?.length}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Improving Regions
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-card/30">
            <Icon name="Target" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-sm font-heading font-bold text-foreground">
              {Math.round(filteredRankings?.reduce((acc, r) => acc + r?.score, 0) / filteredRankings?.length)}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Average Score
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalRankings;