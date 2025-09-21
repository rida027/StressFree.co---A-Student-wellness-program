import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Send, TrendingUp } from 'lucide-react';

const moodOptions = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😐', label: 'Moderate', value: 'moderate' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😫', label: 'Anxious/Stressed', value: 'anxious' },
];

const averageStressData = [
  { day: 'Mon', stress: 45 },
  { day: 'Tue', stress: 52 },
  { day: 'Wed', stress: 38 },
  { day: 'Thu', stress: 65 },
  { day: 'Fri', stress: 42 },
  { day: 'Sat', stress: 35 },
  { day: 'Sun', stress: 40 },
];

export function Survey() {
  const [selectedMood, setSelectedMood] = useState('');
  const [stressLevel, setStressLevel] = useState([50]);
  const [focusLevel, setFocusLevel] = useState([60]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedMood) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Daily Wellness Survey</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Survey Form */}
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Mood Selection */}
            <div>
              <h3 className="font-medium text-slate-700 mb-4">Select your mood:</h3>
              <div className="grid grid-cols-2 gap-3">
                {moodOptions.map((mood) => (
                  <Button
                    key={mood.value}
                    variant={selectedMood === mood.value ? 'default' : 'outline'}
                    className={`h-16 flex flex-col gap-1 ${
                      selectedMood === mood.value 
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white border-0' 
                        : 'hover:bg-blue-50 border-blue-200'
                    }`}
                    onClick={() => setSelectedMood(mood.value)}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-sm">{mood.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Stress Level Slider */}
            <div>
              <h3 className="font-medium text-slate-700 mb-4">
                Rate your stress during today's lectures: <span className="text-blue-600 font-semibold">{stressLevel[0]}%</span>
              </h3>
              <div className="px-3">
                <Slider
                  value={stressLevel}
                  onValueChange={setStressLevel}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-500 mt-2">
                  <span>No Stress</span>
                  <span>Very Stressed</span>
                </div>
              </div>
            </div>

            {/* Focus Level Slider */}
            <div>
              <h3 className="font-medium text-slate-700 mb-4">
                Rate your focus level: <span className="text-green-600 font-semibold">{focusLevel[0]}%</span>
              </h3>
              <div className="px-3">
                <Slider
                  value={focusLevel}
                  onValueChange={setFocusLevel}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-500 mt-2">
                  <span>Cannot Focus</span>
                  <span>Highly Focused</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit}
              disabled={!selectedMood}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-0"
            >
              <Send className="w-4 h-4 mr-2" />
              {submitted ? 'Submitted!' : 'Submit Survey'}
            </Button>

            {submitted && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-center">
                  Thank you! Your response has been recorded. 🌟
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Average Stress Chart */}
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Your Weekly Stress Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={averageStressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="stress" 
                  stroke="url(#gradientLine)" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#3b82f6', strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient id="gradientLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Weekly Average</p>
                  <p className="text-xl font-semibold text-slate-800">46%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Trend</p>
                  <p className="text-green-600 font-medium">↓ Improving</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Today's Wellness Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Deep Breathing Exercise</h4>
              <p className="text-slate-600">
                Try the 4-7-8 technique: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. 
                Repeat 3-4 times to reduce stress and improve focus.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}