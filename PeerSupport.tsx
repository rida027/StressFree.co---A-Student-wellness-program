import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Reply, 
  Plus, 
  Search, 
  TrendingUp,
  Clock,
  Pin,
  ArrowLeft,
  Send
} from 'lucide-react';

const forumThreads = [
  {
    id: 1,
    title: "How I overcame exam stress",
    author: "Sarah_2024",
    authorInitials: "S",
    content: "I wanted to share some strategies that helped me manage my anxiety during finals week. The key was breaking everything down into smaller, manageable chunks...",
    category: "Study Tips",
    replies: 23,
    likes: 45,
    timeAgo: "2 hours ago",
    isPinned: true,
    tags: ["anxiety", "study-tips", "finals"]
  },
  {
    id: 2,
    title: "Tips for better sleep as a college student",
    author: "SleepyButTrying",
    authorInitials: "SB",
    content: "After struggling with insomnia for months, I finally found a routine that works. Here's what helped me get better sleep even with a crazy schedule...",
    category: "Wellness",
    replies: 17,
    likes: 32,
    timeAgo: "5 hours ago",
    isPinned: false,
    tags: ["sleep", "wellness", "routine"]
  },
  {
    id: 3,
    title: "Making friends when you have social anxiety",
    author: "QuietButTrying",
    authorInitials: "Q",
    content: "Starting college with social anxiety felt overwhelming, but I've learned some strategies that actually work. Small steps really do make a difference...",
    category: "Social Skills",
    replies: 31,
    likes: 67,
    timeAgo: "1 day ago",
    isPinned: false,
    tags: ["social-anxiety", "friendship", "college"]
  },
  {
    id: 4,
    title: "Dealing with imposter syndrome in STEM",
    author: "FutureCoder",
    authorInitials: "FC",
    content: "Anyone else feel like they don't belong in their major? I'm in computer science and constantly feel like everyone else is smarter than me...",
    category: "Academic",
    replies: 28,
    likes: 54,
    timeAgo: "1 day ago",
    isPinned: false,
    tags: ["imposter-syndrome", "stem", "confidence"]
  },
  {
    id: 5,
    title: "Budget-friendly meal prep for students",
    author: "BrokeButHealthy",
    authorInitials: "BB",
    content: "Living on a tight budget but still want to eat well? Here are my go-to meal prep ideas that cost less than $5 per day...",
    category: "Lifestyle",
    replies: 12,
    likes: 28,
    timeAgo: "2 days ago",
    isPinned: false,
    tags: ["budget", "meal-prep", "health"]
  },
  {
    id: 6,
    title: "Transitioning from online to in-person classes",
    author: "BackToCampus",
    authorInitials: "BC",
    content: "After two years of online learning, going back to in-person classes has been an adjustment. Here's what's helped me adapt...",
    category: "Academic",
    replies: 19,
    likes: 36,
    timeAgo: "3 days ago",
    isPinned: false,
    tags: ["transition", "online-learning", "campus-life"]
  }
];

const categories = [
  { id: 'all', label: 'All Topics', count: forumThreads.length },
  { id: 'study-tips', label: 'Study Tips', count: 8 },
  { id: 'wellness', label: 'Wellness', count: 12 },
  { id: 'social-skills', label: 'Social Skills', count: 6 },
  { id: 'academic', label: 'Academic', count: 15 },
  { id: 'lifestyle', label: 'Lifestyle', count: 9 }
];

const threadReplies = [
  {
    id: 1,
    author: "StudyBuddy",
    authorInitials: "SB",
    content: "This is so helpful! I especially liked your point about breaking tasks down. I've started using the Pomodoro technique and it's been a game changer.",
    timeAgo: "1 hour ago",
    likes: 8
  },
  {
    id: 2,
    author: "AnxiousAlex",
    authorInitials: "AA",
    content: "Thank you for sharing this. I've been struggling with exam anxiety too. Do you have any specific breathing exercises you'd recommend?",
    timeAgo: "45 minutes ago",
    likes: 3
  },
  {
    id: 3,
    author: "Sarah_2024",
    authorInitials: "S",
    content: "@AnxiousAlex Yes! I use the 4-7-8 breathing technique. Inhale for 4, hold for 7, exhale for 8. It really helps calm my nerves before exams.",
    timeAgo: "30 minutes ago",
    likes: 12
  }
];

export function PeerSupport() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThread, setSelectedThread] = useState(null);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newThreadCategory, setNewThreadCategory] = useState('');

  const filteredThreads = forumThreads.filter(thread => {
    const categoryMatch = selectedCategory === 'all' || thread.category.toLowerCase().replace(' ', '-') === selectedCategory;
    const searchMatch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       thread.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  const handleSubmitReply = () => {
    if (newReply.trim()) {
      // In a real app, this would submit to the backend
      setNewReply('');
    }
  };

  const handleSubmitThread = () => {
    if (newThreadTitle.trim() && newThreadContent.trim() && newThreadCategory) {
      // In a real app, this would submit to the backend
      setShowNewThread(false);
      setNewThreadTitle('');
      setNewThreadContent('');
      setNewThreadCategory('');
    }
  };

  if (showNewThread) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            onClick={() => setShowNewThread(false)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Forum
          </Button>
          <h1 className="text-2xl font-semibold text-slate-800">Create New Thread</h1>
        </div>

        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-slate-800">Share Your Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Thread Title</label>
              <Input
                placeholder="What's your thread about?"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.slice(1).map((category) => (
                  <Button
                    key={category.id}
                    size="sm"
                    variant={newThreadCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setNewThreadCategory(category.id)}
                    className={newThreadCategory === category.id 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                      : 'hover:bg-blue-50 border-blue-200'
                    }
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Your Story</label>
              <Textarea
                placeholder="Share your experience, tips, or ask for advice from the community..."
                value={newThreadContent}
                onChange={(e) => setNewThreadContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-slate-800 mb-2">💙 Community Guidelines</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Be respectful and supportive of others</li>
                <li>• Share personal experiences, not medical advice</li>
                <li>• Use trigger warnings when discussing sensitive topics</li>
                <li>• Keep discussions constructive and helpful</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowNewThread(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitThread}
                disabled={!newThreadTitle.trim() || !newThreadContent.trim() || !newThreadCategory}
                className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 text-white"
              >
                Post Thread
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedThread) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            onClick={() => setSelectedThread(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Forum
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Thread Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Original Post */}
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                      {selectedThread.authorInitials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-800">{selectedThread.author}</span>
                      <Badge variant="secondary">{selectedThread.category}</Badge>
                      {selectedThread.isPinned && <Pin className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="text-sm text-slate-600 mb-3">{selectedThread.timeAgo}</div>
                    <h1 className="text-xl font-semibold text-slate-800 mb-3">{selectedThread.title}</h1>
                    <p className="text-slate-700 leading-relaxed">{selectedThread.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedThread.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-blue-200">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-200">
                      <Button size="sm" variant="ghost" className="flex items-center gap-2 text-slate-600">
                        <Heart className="w-4 h-4" />
                        {selectedThread.likes}
                      </Button>
                      <Button size="sm" variant="ghost" className="flex items-center gap-2 text-slate-600">
                        <MessageSquare className="w-4 h-4" />
                        {selectedThread.replies} replies
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Replies */}
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">
                  Replies ({threadReplies.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {threadReplies.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                    <Avatar>
                      <AvatarFallback className="bg-slate-200 text-slate-700">
                        {reply.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-800">{reply.author}</span>
                        <span className="text-sm text-slate-600">{reply.timeAgo}</span>
                      </div>
                      <p className="text-slate-700 mb-3">{reply.content}</p>
                      
                      <div className="flex items-center gap-3">
                        <Button size="sm" variant="ghost" className="flex items-center gap-1 text-slate-600">
                          <Heart className="w-3 h-3" />
                          {reply.likes}
                        </Button>
                        <Button size="sm" variant="ghost" className="flex items-center gap-1 text-slate-600">
                          <Reply className="w-3 h-3" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Reply Form */}
                <div className="border-t border-slate-200 pt-6">
                  <h4 className="font-medium text-slate-800 mb-3">Add a reply</h4>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Share your thoughts or offer support..."
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSubmitReply}
                        disabled={!newReply.trim()}
                        className="bg-gradient-to-r from-blue-500 to-green-500 text-white"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Post Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Thread Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Views</span>
                  <span className="font-medium text-slate-800">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Replies</span>
                  <span className="font-medium text-slate-800">{selectedThread.replies}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Likes</span>
                  <span className="font-medium text-slate-800">{selectedThread.likes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Created</span>
                  <span className="font-medium text-slate-800">{selectedThread.timeAgo}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Related Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start hover:bg-blue-50">
                  📚 Study Techniques Guide
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start hover:bg-green-50">
                  🧘 Anxiety Management Tips
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start hover:bg-purple-50">
                  💬 Chat with Counselor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Peer Support Forum</h1>
        <Button 
          onClick={() => setShowNewThread(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Thread
        </Button>
      </div>

      {/* Search and Categories */}
      <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
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
                {category.label}
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Forum Threads */}
      <div className="space-y-4">
        {filteredThreads.map((thread) => (
          <Card 
            key={thread.id} 
            className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedThread(thread)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                    {thread.authorInitials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {thread.isPinned && <Pin className="w-4 h-4 text-blue-500" />}
                    <Badge variant="secondary">{thread.category}</Badge>
                    <span className="text-sm text-slate-600">{thread.timeAgo}</span>
                  </div>
                  
                  <h3 className="font-semibold text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                    {thread.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                    {thread.content}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {thread.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-blue-200">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-slate-600">
                      <span className="text-sm font-medium">{thread.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {thread.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {thread.replies}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredThreads.length === 0 && (
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No discussions found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search terms or category filter.</p>
            <Button 
              onClick={() => setShowNewThread(true)}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white"
            >
              Start a New Discussion
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Community Stats */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Users className="w-5 h-5 text-blue-500" />
            Community Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">1,247</div>
              <div className="text-sm text-slate-600">Active Members</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">523</div>
              <div className="text-sm text-slate-600">Discussions This Month</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">89%</div>
              <div className="text-sm text-slate-600">Helpful Response Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}