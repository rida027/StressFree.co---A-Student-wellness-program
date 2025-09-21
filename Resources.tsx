import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { BookOpen, Clock, Star, Search, Filter, TrendingUp, Heart, Brain, GraduationCap, Target, Users, Coffee } from 'lucide-react';

const resourceCategories = [
  { id: 'all', label: 'All Resources', icon: BookOpen },
  { id: 'mindfulness', label: 'Mindfulness', icon: Heart },
  { id: 'stress', label: 'Stress Management', icon: Brain },
  { id: 'academic', label: 'Academic Success', icon: GraduationCap },
  { id: 'career', label: 'Career Planning', icon: TrendingUp },
  { id: 'social', label: 'Social Skills', icon: Users },
  { id: 'lifestyle', label: 'Healthy Lifestyle', icon: Coffee },
];

const resources = [
  {
    id: 1,
    title: "Mindfulness Basics",
    description: "Learn the fundamentals of mindfulness meditation and how to incorporate it into your daily routine as a student.",
    category: 'mindfulness',
    readTime: '8 min read',
    difficulty: 'Beginner',
    rating: 4.8,
    tags: ['meditation', 'beginner-friendly', 'daily-practice'],
    imageEmoji: '🧘‍♀️'
  },
  {
    id: 2,
    title: "How to Manage Exam Stress",
    description: "Evidence-based strategies to reduce anxiety before and during exams, including preparation techniques and coping mechanisms.",
    category: 'stress',
    readTime: '12 min read',
    difficulty: 'Intermediate',
    rating: 4.9,
    tags: ['exam-prep', 'anxiety-relief', 'study-tips'],
    imageEmoji: '📚'
  },
  {
    id: 3,
    title: "Career Roadmap for Data Analyst",
    description: "Complete guide to becoming a successful data analyst, including required skills, tools, and step-by-step career progression.",
    category: 'career',
    readTime: '15 min read',
    difficulty: 'Intermediate',
    rating: 4.7,
    tags: ['career-planning', 'data-science', 'skill-building'],
    imageEmoji: '📊'
  },
  {
    id: 4,
    title: "Building Healthy Sleep Habits",
    description: "Science-backed methods to improve sleep quality and establish consistent sleep patterns for better academic performance.",
    category: 'lifestyle',
    readTime: '10 min read',
    difficulty: 'Beginner',
    rating: 4.6,
    tags: ['sleep-hygiene', 'wellness', 'productivity'],
    imageEmoji: '😴'
  },
  {
    id: 5,
    title: "Overcoming Procrastination",
    description: "Practical techniques to beat procrastination, improve time management, and maintain consistent study habits.",
    category: 'academic',
    readTime: '11 min read',
    difficulty: 'Intermediate',
    rating: 4.8,
    tags: ['time-management', 'productivity', 'motivation'],
    imageEmoji: '⏰'
  },
  {
    id: 6,
    title: "Social Anxiety in College",
    description: "Understanding and managing social anxiety in college settings, with practical tips for building connections.",
    category: 'social',
    readTime: '9 min read',
    difficulty: 'Beginner',
    rating: 4.5,
    tags: ['social-skills', 'anxiety', 'college-life'],
    imageEmoji: '🤝'
  },
  {
    id: 7,
    title: "Deep Breathing Techniques",
    description: "Master various breathing exercises to instantly reduce stress and improve focus during challenging situations.",
    category: 'mindfulness',
    readTime: '6 min read',
    difficulty: 'Beginner',
    rating: 4.9,
    tags: ['breathing', 'stress-relief', 'quick-techniques'],
    imageEmoji: '🫁'
  },
  {
    id: 8,
    title: "Creating a Study Schedule That Works",
    description: "Design an effective study schedule that balances academics, social life, and personal well-being.",
    category: 'academic',
    readTime: '14 min read',
    difficulty: 'Intermediate',
    rating: 4.7,
    tags: ['study-planning', 'time-management', 'work-life-balance'],
    imageEmoji: '📅'
  }
];

export function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);

  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const searchMatch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedResource) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            onClick={() => setSelectedResource(null)}
            className="flex items-center gap-2"
          >
            ← Back to Resources
          </Button>
        </div>

        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{selectedResource.imageEmoji}</div>
              <h1 className="text-3xl font-semibold text-slate-800 mb-4">{selectedResource.title}</h1>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedResource.readTime}
                </span>
                <Badge className={getDifficultyColor(selectedResource.difficulty)}>
                  {selectedResource.difficulty}
                </Badge>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {selectedResource.rating}
                </span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 mb-6">{selectedResource.description}</p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">📖 What You'll Learn</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Core concepts and practical applications</li>
                  <li>• Step-by-step implementation strategies</li>
                  <li>• Real-world examples and case studies</li>
                  <li>• Tools and resources for continued learning</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">🎯 Key Takeaways</h3>
                <div className="space-y-3 text-slate-600">
                  <p>This comprehensive guide provides you with evidence-based strategies and practical tools that you can implement immediately in your daily routine.</p>
                  <p>Whether you're dealing with academic pressure, career uncertainty, or personal challenges, this resource offers actionable insights tailored specifically for students.</p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">💡 Quick Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-1">Before You Start</h4>
                    <p className="text-sm">Set aside dedicated time and create a comfortable learning environment.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-1">After Reading</h4>
                    <p className="text-sm">Practice the techniques and track your progress over time.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Wellness Resources</h1>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {resourceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  size="sm"
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                      : 'hover:bg-blue-50 border-blue-200'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{resource.imageEmoji}</div>
                <h3 className="font-semibold text-slate-800 mb-2">{resource.title}</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{resource.description}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {resource.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {resource.rating}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <Badge className={getDifficultyColor(resource.difficulty)}>
                  {resource.difficulty}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {resource.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{resource.tags.length - 2}
                  </Badge>
                )}
              </div>

              <Button 
                onClick={() => setSelectedResource(resource)}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Read Article
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No resources found</h3>
            <p className="text-slate-600">Try adjusting your search terms or category filter.</p>
          </CardContent>
        </Card>
      )}

      {/* Featured Section */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Star className="w-5 h-5 text-yellow-500" />
            Featured This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">Goal Setting Workshop</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Join our interactive workshop on setting and achieving academic and personal goals.
                </p>
                <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-50">
                  Register Now
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-3xl">🧠</div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">Mental Health Awareness Week</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Special collection of resources and activities focused on mental health awareness.
                </p>
                <Button size="sm" variant="outline" className="border-green-200 hover:bg-green-50">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}