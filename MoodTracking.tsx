import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, TrendingUp, Smile, Frown, Meh, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

// Generate mock mood data for the last 3 months
const generateMoodData = () => {
  const data = {};
  const today = new Date();
  
  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    
    // Randomly assign mood levels (skip some days)
    if (Math.random() > 0.3) {
      const moods = ['excellent', 'good', 'okay', 'low', 'stressed'];
      const mood = moods[Math.floor(Math.random() * moods.length)];
      data[dateKey] = {
        mood,
        stress: Math.floor(Math.random() * 100),
        energy: Math.floor(Math.random() * 100),
        sleep: Math.floor(Math.random() * 10) + 1
      };
    }
  }
  
  return data;
};

const moodData = generateMoodData();

const moodColors = {
  excellent: '#10b981', // green
  good: '#84cc16',      // light green
  okay: '#eab308',      // yellow
  low: '#f97316',       // orange
  stressed: '#ef4444'   // red
};

const moodEmojis = {
  excellent: '😄',
  good: '😊',
  okay: '😐',
  low: '😔',
  stressed: '😫'
};

const moodLabels = {
  excellent: 'Excellent',
  good: 'Good',
  okay: 'Okay',
  low: 'Low',
  stressed: 'Stressed'
};

export function MoodTracking() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        day,
        dateKey,
        data: moodData[dateKey] || null
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getMoodStats = () => {
    const entries = Object.values(moodData);
    const totalEntries = entries.length;
    
    if (totalEntries === 0) return { avgStress: 0, avgEnergy: 0, avgSleep: 0, totalDays: 0 };
    
    const avgStress = entries.reduce((sum, entry) => sum + entry.stress, 0) / totalEntries;
    const avgEnergy = entries.reduce((sum, entry) => sum + entry.energy, 0) / totalEntries;
    const avgSleep = entries.reduce((sum, entry) => sum + entry.sleep, 0) / totalEntries;
    
    return {
      avgStress: Math.round(avgStress),
      avgEnergy: Math.round(avgEnergy),
      avgSleep: avgSleep.toFixed(1),
      totalDays: totalEntries
    };
  };

  const stats = getMoodStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Mood Tracking</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-slate-800">{stats.totalDays}</div>
            <div className="text-sm text-slate-600">Days Tracked</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.avgStress}%</div>
            <div className="text-sm text-slate-600">Avg Stress</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.avgEnergy}%</div>
            <div className="text-sm text-slate-600">Avg Energy</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.avgSleep}h</div>
            <div className="text-sm text-slate-600">Avg Sleep</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Heatmap */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Mood Calendar
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={previousMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[140px] text-center">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <Button size="sm" variant="outline" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-xs font-medium text-slate-600 text-center">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((dayData, index) => {
                  if (!dayData) {
                    return <div key={index} className="p-2 h-12"></div>;
                  }
                  
                  const { day, dateKey, data } = dayData;
                  const isToday = dateKey === new Date().toISOString().split('T')[0];
                  const isSelected = selectedDate === dateKey;
                  
                  return (
                    <button
                      key={dateKey}
                      onClick={() => setSelectedDate(isSelected ? null : dateKey)}
                      className={`
                        relative p-1 h-12 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center
                        ${isSelected ? 'border-blue-500 scale-105' : 'border-transparent hover:border-slate-300'}
                        ${isToday ? 'ring-2 ring-blue-300' : ''}
                      `}
                      style={{
                        backgroundColor: data ? moodColors[data.mood] + '20' : '#f8fafc'
                      }}
                    >
                      <span className="text-xs font-medium text-slate-700">{day}</span>
                      {data && (
                        <span className="text-xs leading-none">
                          {moodEmojis[data.mood]}
                        </span>
                      )}
                      {data && (
                        <div
                          className="absolute inset-0 rounded-lg opacity-30"
                          style={{ backgroundColor: moodColors[data.mood] }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="text-slate-600 font-medium">Mood:</span>
                  {Object.entries(moodLabels).map(([mood, label]) => (
                    <div key={mood} className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: moodColors[mood] }}
                      />
                      <span className="text-slate-600">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Day Details */}
        <div className="space-y-6">
          {selectedDate && moodData[selectedDate] ? (
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-4xl mb-2">
                    {moodEmojis[moodData[selectedDate].mood]}
                  </div>
                  <div className="font-medium text-slate-800">
                    {moodLabels[moodData[selectedDate].mood]}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Stress Level</span>
                    <Badge variant="secondary">{moodData[selectedDate].stress}%</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Energy Level</span>
                    <Badge variant="secondary">{moodData[selectedDate].energy}%</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Sleep Hours</span>
                    <Badge variant="secondary">{moodData[selectedDate].sleep}h</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : selectedDate ? (
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="font-medium text-slate-800 mb-2">No data for this day</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Start tracking your mood to see insights here.
                </p>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  Add Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">👆</div>
                <h3 className="font-medium text-slate-800 mb-2">Select a day</h3>
                <p className="text-sm text-slate-600">
                  Click on any day in the calendar to view details.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white justify-start">
                <Smile className="w-4 h-4 mr-2" />
                Log Today's Mood
              </Button>
              
              <Button variant="outline" className="w-full justify-start hover:bg-blue-50">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Trends
              </Button>
              
              <Button variant="outline" className="w-full justify-start hover:bg-purple-50">
                <Zap className="w-4 h-4 mr-2" />
                Set Mood Reminder
              </Button>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">This Week's Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">💚 Positive Trend</div>
                <div className="text-xs text-green-700">Your energy levels have improved 15% this week!</div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800">😴 Sleep Pattern</div>
                <div className="text-xs text-blue-700">Most productive days follow 7+ hours of sleep.</div>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">⚡ Energy Dip</div>
                <div className="text-xs text-yellow-700">Consider afternoon breaks on Wednesdays.</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}