import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import HeroKPIPanel from './components/HeroKPIPanel';
import InnovationTrackerCard from './components/InnovationTrackerCard';
import HolographicGlobe from './components/HolographicGlobe';
import MilestoneTracker from './components/MilestoneTracker';
import RegionalRankings from './components/RegionalRankings';
import AnimatedTimeline from './components/AnimatedTimeline';
import GlobalFilters from './components/GlobalFilters';
import Icon from '../../components/AppIcon';

const GlobalHealthcareInnovationCommandCenter = () => {
  const [filters, setFilters] = useState({
    region: 'all',
    technology: 'all',
    timeRange: 'real-time'
  });
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock KPI Data
  const kpiData = [
    {
      id: 1,
      title: "AI Diagnostics Adoption",
      description: "Global healthcare AI implementation",
      value: 78,
      change: 12.5,
      target: 85,
      icon: "Brain"
    },
    {
      id: 2,
      title: "Telemedicine Growth",
      description: "Remote healthcare delivery expansion",
      value: 89,
      change: 8.3,
      target: 95,
      icon: "Video"
    },
    {
      id: 3,
      title: "Surgical Robotics",
      description: "Robotic surgery deployment rate",
      value: 65,
      change: 15.7,
      target: 80,
      icon: "Bot"
    },
    {
      id: 4,
      title: "Global Health Impact",
      description: "Overall transformation score",
      value: 82,
      change: 6.2,
      target: 90,
      icon: "Heart"
    },
    {
      id: 5,
      title: "2030 Progress",
      description: "Transformation milestone completion",
      value: 73,
      change: 9.8,
      target: 100,
      icon: "Target"
    }
  ];

  // Mock Innovation Tracker Data
  const innovationData = [
    {
      id: 1,
      title: "AI Diagnostics",
      description: "Machine learning algorithms revolutionizing medical diagnosis with 95% accuracy rates in radiology and pathology.",
      adoptionRate: 78,
      status: "leading",
      icon: "Brain",
      regionalLeader: "North America",
      investmentFlow: 24.5,
      growthRate: 12.5,
      marketSize: 156.8,
      implementations: "12.5K",
      countries: 47
    },
    {
      id: 2,
      title: "Surgical Robotics",
      description: "Advanced robotic systems enabling precision surgery with minimal invasive procedures and faster recovery times.",
      adoptionRate: 65,
      status: "growing",
      icon: "Bot",
      regionalLeader: "Asia Pacific",
      investmentFlow: 18.2,
      growthRate: 15.7,
      marketSize: 89.3,
      implementations: "8.7K",
      countries: 32
    },
    {
      id: 3,
      title: "VR/AR Therapy",
      description: "Immersive technologies transforming mental health treatment and rehabilitation with personalized therapy sessions.",
      adoptionRate: 52,
      status: "emerging",
      icon: "Glasses",
      regionalLeader: "Europe",
      investmentFlow: 12.8,
      growthRate: 22.3,
      marketSize: 45.6,
      implementations: "5.2K",
      countries: 28
    },
    {
      id: 4,
      title: "CRISPR Gene Editing",
      description: "Revolutionary gene therapy treatments targeting genetic disorders with unprecedented precision and success rates.",
      adoptionRate: 43,
      status: "emerging",
      icon: "Dna",
      regionalLeader: "North America",
      investmentFlow: 31.7,
      growthRate: 28.9,
      marketSize: 78.4,
      implementations: "2.8K",
      countries: 19
    }
  ];

  // Mock Global Data
  const globalData = {
    regions: [
      {
        id: 1,
        name: "North America",
        x: 25,
        y: 35,
        penetration: 85,
        telemedicine: 92,
        wearables: 78,
        aiDiagnostics: 81,
        lifespanImprovement: 3.2
      },
      {
        id: 2,
        name: "Europe",
        x: 50,
        y: 30,
        penetration: 82,
        telemedicine: 88,
        wearables: 85,
        aiDiagnostics: 76,
        lifespanImprovement: 2.8
      },
      {
        id: 3,
        name: "Asia Pacific",
        x: 75,
        y: 45,
        penetration: 78,
        telemedicine: 85,
        wearables: 92,
        aiDiagnostics: 73,
        lifespanImprovement: 2.5
      },
      {
        id: 4,
        name: "Latin America",
        x: 30,
        y: 65,
        penetration: 65,
        telemedicine: 72,
        wearables: 58,
        aiDiagnostics: 61,
        lifespanImprovement: 1.8
      },
      {
        id: 5,
        name: "Middle East & Africa",
        x: 55,
        y: 60,
        penetration: 58,
        telemedicine: 68,
        wearables: 45,
        aiDiagnostics: 52,
        lifespanImprovement: 1.5
      }
    ]
  };

  // Mock Milestone Data
  const milestoneData = [
    {
      id: 1,
      title: "Universal AI Diagnostics Deployment",
      description: "Complete rollout of AI-powered diagnostic systems across all major healthcare facilities globally.",
      targetDate: "Q2 2025",
      progress: 78,
      status: "in-progress",
      impact: 95,
      investment: 45.2,
      stakeholders: 156
    },
    {
      id: 2,
      title: "Telemedicine Infrastructure Completion",
      description: "Establishment of comprehensive telemedicine networks in rural and underserved areas worldwide.",
      targetDate: "Q4 2025",
      progress: 89,
      status: "in-progress",
      impact: 88,
      investment: 32.7,
      stakeholders: 203
    },
    {
      id: 3,
      title: "Surgical Robotics Standardization",
      description: "Implementation of standardized robotic surgery protocols and training programs across healthcare systems.",
      targetDate: "Q2 2026",
      progress: 65,
      status: "in-progress",
      impact: 82,
      investment: 28.9,
      stakeholders: 124
    },
    {
      id: 4,
      title: "Personalized Medicine Integration",
      description: "Full integration of genomic data and personalized treatment protocols into standard healthcare delivery.",
      targetDate: "Q4 2027",
      progress: 43,
      status: "upcoming",
      impact: 91,
      investment: 67.3,
      stakeholders: 89
    },
    {
      id: 5,
      title: "Global Health Data Interoperability",
      description: "Achievement of seamless health data exchange between all healthcare systems and providers worldwide.",
      targetDate: "Q2 2030",
      progress: 25,
      status: "upcoming",
      impact: 97,
      investment: 89.5,
      stakeholders: 312
    }
  ];

  // Mock Regional Rankings Data
  const rankingsData = [
    {
      id: 1,
      name: "Singapore",
      score: 94,
      change: 2.3,
      category: "overall",
      description: "Leading in healthcare innovation adoption",
      flag: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=60&fit=crop"
    },
    {
      id: 2,
      name: "United States",
      score: 91,
      change: 1.8,
      category: "overall",
      description: "Advanced medical technology infrastructure",
      flag: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=100&h=60&fit=crop"
    },
    {
      id: 3,
      name: "Switzerland",
      score: 89,
      change: 3.1,
      category: "overall",
      description: "Excellence in precision medicine",
      flag: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=60&fit=crop"
    },
    {
      id: 4,
      name: "South Korea",
      score: 87,
      change: 4.2,
      category: "overall",
      description: "Digital health transformation leader",
      flag: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=100&h=60&fit=crop"
    },
    {
      id: 5,
      name: "Germany",
      score: 85,
      change: 1.5,
      category: "overall",
      description: "Robust healthcare technology ecosystem",
      flag: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=100&h=60&fit=crop"
    },
    {
      id: 6,
      name: "Japan",
      score: 84,
      change: 2.7,
      category: "overall",
      description: "Aging population healthcare solutions",
      flag: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=100&h=60&fit=crop"
    },
    {
      id: 7,
      name: "United Kingdom",
      score: 82,
      change: 0.9,
      category: "overall",
      description: "NHS digital transformation progress",
      flag: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=100&h=60&fit=crop"
    },
    {
      id: 8,
      name: "Canada",
      score: 81,
      change: 1.3,
      category: "overall",
      description: "Universal healthcare innovation",
      flag: "https://images.unsplash.com/photo-1503614472-8c93d56cd9db?w=100&h=60&fit=crop"
    }
  ];

  // Mock Timeline Data
  const timelineData = [
    {
      year: 2025,
      milestones: [
        {
          title: "AI Diagnostics Breakthrough",
          description: "95% accuracy in cancer detection achieved",
          icon: "Brain"
        },
        {
          title: "Telemedicine Expansion",
          description: "Rural healthcare access improved by 300%",
          icon: "Video"
        },
        {
          title: "Wearable Integration",
          description: "Real-time health monitoring for 2B people",
          icon: "Watch"
        }
      ],
      metrics: [
        { label: "AI Adoption", value: "78%", trend: "up", change: 12 },
        { label: "Telemedicine", value: "89%", trend: "up", change: 8 },
        { label: "Robotics", value: "65%", trend: "up", change: 15 },
        { label: "Gene Therapy", value: "43%", trend: "up", change: 28 }
      ]
    },
    {
      year: 2026,
      milestones: [
        {
          title: "Surgical Robotics Standard",
          description: "Robotic surgery becomes standard practice",
          icon: "Bot"
        },
        {
          title: "Precision Medicine",
          description: "Personalized treatments for 80% of patients",
          icon: "Target"
        },
        {
          title: "Mental Health VR",
          description: "VR therapy available in 10,000 clinics",
          icon: "Glasses"
        }
      ],
      metrics: [
        { label: "AI Adoption", value: "85%", trend: "up", change: 9 },
        { label: "Telemedicine", value: "92%", trend: "up", change: 3 },
        { label: "Robotics", value: "78%", trend: "up", change: 20 },
        { label: "Gene Therapy", value: "58%", trend: "up", change: 35 }
      ]
    },
    {
      year: 2027,
      milestones: [
        {
          title: "CRISPR Commercialization",
          description: "Gene editing treatments widely available",
          icon: "Dna"
        },
        {
          title: "Digital Health Records",
          description: "Universal health data interoperability",
          icon: "Database"
        },
        {
          title: "Preventive Care AI",
          description: "Predictive health analytics for all",
          icon: "Shield"
        }
      ],
      metrics: [
        { label: "AI Adoption", value: "91%", trend: "up", change: 7 },
        { label: "Telemedicine", value: "95%", trend: "up", change: 3 },
        { label: "Robotics", value: "86%", trend: "up", change: 10 },
        { label: "Gene Therapy", value: "72%", trend: "up", change: 24 }
      ]
    },
    {
      year: 2028,
      milestones: [
        {
          title: "Nano-medicine Deployment",
          description: "Targeted drug delivery at cellular level",
          icon: "Atom"
        },
        {
          title: "Brain-Computer Interfaces",
          description: "Neural implants for paralysis treatment",
          icon: "Cpu"
        },
        {
          title: "Regenerative Medicine",
          description: "Organ printing becomes commercially viable",
          icon: "Heart"
        }
      ],
      metrics: [
        { label: "AI Adoption", value: "96%", trend: "up", change: 5 },
        { label: "Telemedicine", value: "97%", trend: "up", change: 2 },
        { label: "Robotics", value: "92%", trend: "up", change: 7 },
        { label: "Gene Therapy", value: "84%", trend: "up", change: 17 }
      ]
    },
    {
      year: 2029,
      milestones: [
        {
          title: "Longevity Treatments",
          description: "Anti-aging therapies extend lifespan by 20 years",
          icon: "Clock"
        },
        {
          title: "Quantum Health Computing",
          description: "Quantum computers solve complex medical problems",
          icon: "Zap"
        },
        {
          title: "Space Medicine",
          description: "Healthcare systems operational in space colonies",
          icon: "Rocket"
        }
      ],
      metrics: [
        { label: "AI Adoption", value: "98%", trend: "up", change: 2 },
        { label: "Telemedicine", value: "99%", trend: "up", change: 2 },
        { label: "Robotics", value: "96%", trend: "up", change: 4 },
        { label: "Gene Therapy", value: "91%", trend: "up", change: 8 }
      ]
    },
    {
      year: 2030,
      milestones: [
        {
          title: "Healthcare Singularity",
          description: "AI surpasses human doctors in all specialties",
          icon: "Infinity"
        },
        {
          title: "Disease Eradication",
          description: "Cancer, Alzheimer's, and diabetes eliminated",
          icon: "Award"
        },
        {
          title: "Universal Health Access",
          description: "Advanced healthcare available to all humans",
          icon: "Globe"
        }
      ],
      metrics: [
        { label: "AI Adoption", value: "100%", trend: "up", change: 2 },
        { label: "Telemedicine", value: "100%", trend: "up", change: 1 },
        { label: "Robotics", value: "100%", trend: "up", change: 4 },
        { label: "Gene Therapy", value: "98%", trend: "up", change: 8 }
      ]
    }
  ];

  // Auto-refresh data every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 900000); // 15 minutes

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="pt-16">
        <div className="max-w-full px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
                  Global Healthcare Innovation Command Center
                </h1>
                <p className="text-lg text-muted-foreground font-caption">
                  Comprehensive oversight of global healthcare transformation metrics for 2030
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-card/30 border border-border">
                  <Icon name="Activity" size={16} className="text-success" />
                  <span className="text-sm font-data text-success">Live Dashboard</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-data text-foreground">
                    Last Updated: {lastUpdate?.toLocaleTimeString()}
                  </div>
                  <div className="text-xs text-muted-foreground font-caption">
                    Auto-refresh: 15 min
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Global Filters */}
          <GlobalFilters 
            currentFilters={filters}
            onFiltersChange={handleFiltersChange}
          />

          {/* Hero KPI Panel */}
          <HeroKPIPanel kpiData={kpiData} />

          {/* Innovation Tracker Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {innovationData?.map((innovation) => (
              <InnovationTrackerCard 
                key={innovation?.id} 
                innovation={innovation} 
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Holographic Globe - Spans 2 columns */}
            <div className="lg:col-span-2">
              <HolographicGlobe 
                globalData={globalData}
                onRegionSelect={handleRegionSelect}
              />
            </div>

            {/* Sidebar - Milestone Tracker */}
            <div className="space-y-8">
              <MilestoneTracker milestones={milestoneData} />
            </div>
          </div>

          {/* Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Regional Rankings */}
            <div className="lg:col-span-1">
              <RegionalRankings rankings={rankingsData} />
            </div>

            {/* Animated Timeline - Spans 2 columns */}
            <div className="lg:col-span-2">
              <AnimatedTimeline timelineData={timelineData} />
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-caption">
                  Healthcare 2030 Dashboard • Real-time global healthcare innovation analytics
                </p>
                <p className="text-xs text-muted-foreground font-caption mt-1">
                  Data sources: WHO, FDA, EMA, Global Health Organizations • Updated every 15 minutes
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-smooth">
                  <Icon name="Download" size={16} />
                  <span className="text-sm font-heading font-medium">Export Report</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card/70 transition-smooth">
                  <Icon name="Share" size={16} />
                  <span className="text-sm font-heading font-medium">Share Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GlobalHealthcareInnovationCommandCenter;