import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, Bot, User, Wind, Anchor, Phone, TrendingUp } from 'lucide-react';

const initialMessages = [
  {
    id: 1,
    type: 'bot',
    content: "Hi! I'm your mental health assistant. Let's work on breathing exercises today. How are you feeling?",
    timestamp: new Date(Date.now() - 300000)
  }
];

const quickReplies = [
  { id: 'breathing', label: 'Breathing Exercise', icon: Wind },
  { id: 'grounding', label: 'Grounding', icon: Anchor },
  { id: 'counselor', label: 'Talk to a Counselor', icon: Phone },
  { id: 'career', label: 'Career Roadmap', icon: TrendingUp },
];

const botResponses = {
  breathing: "Great choice! Let's try the 4-7-8 breathing technique:\n\n1. Exhale completely through your mouth\n2. Close your mouth and inhale through your nose for 4 counts\n3. Hold your breath for 7 counts\n4. Exhale through your mouth for 8 counts\n\nRepeat this cycle 3-4 times. How do you feel?",
  grounding: "Let's practice the 5-4-3-2-1 grounding technique:\n\n👀 Name 5 things you can see\n🤚 Name 4 things you can touch\n👂 Name 3 things you can hear\n👃 Name 2 things you can smell\n👅 Name 1 thing you can taste\n\nThis helps bring you back to the present moment. Take your time with each step.",
  counselor: "I'd be happy to help you connect with a professional counselor. Our licensed therapists are available for:\n\n• Individual therapy sessions\n• Group therapy\n• Crisis support\n• Academic stress counseling\n\nWould you like me to show you available appointment times?",
  career: "Let's explore your career path! For Data Analyst roles, here's a roadmap:\n\n📊 Essential Skills:\n• SQL & Database management\n• Python/R programming\n• Data visualization (Tableau, Power BI)\n• Statistics & Analytics\n\n🎯 Next Steps:\n• Build a portfolio with real projects\n• Practice on Kaggle datasets\n• Network with professionals\n• Consider internships\n\nWhat specific area interests you most?",
  default: "I understand you're reaching out. I'm here to help with breathing exercises, grounding techniques, connecting you with counselors, or discussing your career goals. What would be most helpful right now?"
};

export function Chatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content, type = 'user') => {
    const newMessage = {
      id: messages.length + 1,
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    addMessage(inputValue, 'user');
    setInputValue('');
    
    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(botResponses.default, 'bot');
    }, 1500);
  };

  const handleQuickReply = (replyId) => {
    const reply = quickReplies.find(r => r.id === replyId);
    addMessage(reply.label, 'user');
    
    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(botResponses[replyId] || botResponses.default, 'bot');
    }, 1500);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">AI Mental Health Assistant</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0 border-b border-slate-200">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Bot className="w-5 h-5 text-blue-500" />
                Mental Health Assistant
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Online</span>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        ${message.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-green-500' 
                          : 'bg-slate-100'
                        }
                      `}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-slate-600" />
                        )}
                      </div>
                      
                      <div className={`
                        p-3 rounded-2xl
                        ${message.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                          : 'bg-slate-100 text-slate-800'
                        }
                      `}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className={`
                          text-xs mt-1 opacity-70
                          ${message.type === 'user' ? 'text-blue-100' : 'text-slate-500'}
                        `}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-100">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="border-t border-slate-200 p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickReplies.map((reply) => {
                    const Icon = reply.icon;
                    return (
                      <Button
                        key={reply.id}
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickReply(reply.id)}
                        className="flex items-center gap-2 hover:bg-blue-50 border-blue-200"
                      >
                        <Icon className="w-3 h-3" />
                        {reply.label}
                      </Button>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">How I Can Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Wind className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-slate-800">Breathing Exercises</h4>
                  <p className="text-sm text-slate-600">Guided breathing techniques to reduce stress and anxiety</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <Anchor className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-slate-800">Grounding Techniques</h4>
                  <p className="text-sm text-slate-600">Mindfulness exercises to stay present and calm</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <Phone className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-slate-800">Counselor Connection</h4>
                  <p className="text-sm text-slate-600">Connect with licensed mental health professionals</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-slate-800">Career Guidance</h4>
                  <p className="text-sm text-slate-600">Academic and career planning support</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Crisis Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Emergency Support</h4>
                <p className="text-sm text-red-700 mb-2">
                  If you're in crisis or having thoughts of self-harm:
                </p>
                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Call Crisis Hotline
                </Button>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-slate-800 mb-2">24/7 Text Support</h4>
                <p className="text-sm text-slate-600">
                  Text "HOME" to 741741 for crisis text line support
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}