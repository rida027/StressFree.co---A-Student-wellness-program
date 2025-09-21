import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { 
  Calendar, 
  Clock, 
  Star, 
  MapPin, 
  Phone, 
  Video, 
  MessageSquare, 
  User, 
  Award,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const counselors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Academic Stress"],
    rating: 4.9,
    reviews: 127,
    experience: "8 years",
    availability: "Mon-Fri",
    sessionTypes: ["Video", "Phone", "In-person"],
    bio: "Specializing in cognitive behavioral therapy and mindfulness-based approaches for students dealing with academic pressure and mental health challenges.",
    languages: ["English", "Spanish"],
    initials: "SM"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Student Counseling Specialist",
    specialties: ["Career Guidance", "Social Anxiety", "Time Management"],
    rating: 4.8,
    reviews: 89,
    experience: "6 years",
    availability: "Tue-Sat",
    sessionTypes: ["Video", "In-person"],
    bio: "Helping students navigate career decisions, improve social skills, and develop effective study habits. Experienced in working with international students.",
    languages: ["English", "Mandarin"],
    initials: "MC"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Trauma-Informed Therapist",
    specialties: ["PTSD", "Grief Counseling", "Relationship Issues"],
    rating: 4.9,
    reviews: 156,
    experience: "10 years",
    availability: "Mon-Thu",
    sessionTypes: ["Video", "Phone"],
    bio: "Providing trauma-informed care with a focus on creating safe spaces for healing. Specialized in EMDR and somatic therapy approaches.",
    languages: ["English", "Spanish", "Portuguese"],
    initials: "ER"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Behavioral Health Counselor",
    specialties: ["ADHD", "Learning Disabilities", "Executive Functioning"],
    rating: 4.7,
    reviews: 73,
    experience: "5 years",
    availability: "Wed-Sun",
    sessionTypes: ["Video", "In-person"],
    bio: "Supporting students with ADHD and learning differences to develop effective strategies for academic success and personal growth.",
    languages: ["English"],
    initials: "JW"
  }
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const sessionTypes = [
  { id: 'video', label: 'Video Call', icon: Video, price: '$80' },
  { id: 'phone', label: 'Phone Call', icon: Phone, price: '$70' },
  { id: 'inperson', label: 'In-Person', icon: MapPin, price: '$90' },
  { id: 'message', label: 'Text Therapy', icon: MessageSquare, price: '$60' }
];

export function CounselorBooking() {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSessionType, setSelectedSessionType] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingStep, setBookingStep] = useState('counselors'); // counselors, booking, confirmation

  const handleBookSession = () => {
    setBookingStep('confirmation');
  };

  const resetBooking = () => {
    setSelectedCounselor(null);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedSessionType('');
    setNotes('');
    setBookingStep('counselors');
  };

  // Generate next 14 days for booking
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  if (bookingStep === 'confirmation') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="outline" onClick={resetBooking} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Counselors
          </Button>
        </div>

        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Session Booked!</h2>
              <p className="text-slate-600">Your appointment has been confirmed</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-600">Counselor:</span>
                  <span className="font-medium text-slate-800">{selectedCounselor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date:</span>
                  <span className="font-medium text-slate-800">
                    {availableDates.find(d => d.value === selectedDate)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Time:</span>
                  <span className="font-medium text-slate-800">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Session Type:</span>
                  <span className="font-medium text-slate-800">
                    {sessionTypes.find(s => s.id === selectedSessionType)?.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-slate-800 mb-2">📧 Confirmation Email Sent</h4>
                <p className="text-sm text-slate-600">
                  Check your email for session details and preparation materials.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-slate-800 mb-2">📱 Calendar Reminder</h4>
                <p className="text-sm text-slate-600">
                  Add this appointment to your calendar so you don't miss it.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button variant="outline" className="flex-1">
                Add to Calendar
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 text-white">
                View My Appointments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (bookingStep === 'booking' && selectedCounselor) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            onClick={() => setBookingStep('counselors')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Counselors
          </Button>
          <h1 className="text-2xl font-semibold text-slate-800">Book Session</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Type */}
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Choose Session Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sessionTypes.map((type) => {
                    const Icon = type.icon;
                    const isAvailable = selectedCounselor.sessionTypes.includes(type.label.split(' ')[0]);
                    return (
                      <Button
                        key={type.id}
                        variant={selectedSessionType === type.id ? 'default' : 'outline'}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSessionType(type.id)}
                        className={`h-20 flex flex-col gap-2 ${
                          selectedSessionType === type.id 
                            ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                            : isAvailable 
                              ? 'hover:bg-blue-50 border-blue-200' 
                              : 'opacity-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="text-center">
                          <div className="text-sm font-medium">{type.label}</div>
                          <div className="text-xs opacity-80">{type.price}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {availableDates.map((date) => (
                    <Button
                      key={date.value}
                      variant={selectedDate === date.value ? 'default' : 'outline'}
                      onClick={() => setSelectedDate(date.value)}
                      className={`h-16 flex flex-col ${
                        selectedDate === date.value 
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                          : 'hover:bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="text-sm font-medium">{date.label.split(' ')[0]}</div>
                      <div className="text-xs opacity-80">{date.label.split(' ').slice(1).join(' ')}</div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Select Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      onClick={() => setSelectedTime(time)}
                      className={`h-12 ${
                        selectedTime === time 
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                          : 'hover:bg-blue-50 border-blue-200'
                      }`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Session Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Share any specific topics you'd like to discuss or concerns you have..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Counselor Summary & Book Button */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Session Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                      {selectedCounselor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-slate-800">{selectedCounselor.name}</div>
                    <div className="text-sm text-slate-600">{selectedCounselor.title}</div>
                  </div>
                </div>

                {selectedSessionType && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-slate-800">
                      {sessionTypes.find(s => s.id === selectedSessionType)?.label}
                    </div>
                    <div className="text-xs text-slate-600">
                      {sessionTypes.find(s => s.id === selectedSessionType)?.price}
                    </div>
                  </div>
                )}

                {selectedDate && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm font-medium text-slate-800">
                      {availableDates.find(d => d.value === selectedDate)?.label}
                    </div>
                    <div className="text-xs text-slate-600">Selected date</div>
                  </div>
                )}

                {selectedTime && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm font-medium text-slate-800">{selectedTime}</div>
                    <div className="text-xs text-slate-600">50-minute session</div>
                  </div>
                )}

                <Button
                  onClick={handleBookSession}
                  disabled={!selectedSessionType || !selectedDate || !selectedTime}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white h-12"
                >
                  Book Session
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-xl">📅</div>
                    <div>
                      <h4 className="font-medium text-slate-800">Flexible Scheduling</h4>
                      <p className="text-sm text-slate-600">Cancel or reschedule up to 24 hours before your session.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="text-xl">🔒</div>
                    <div>
                      <h4 className="font-medium text-slate-800">Confidential & Secure</h4>
                      <p className="text-sm text-slate-600">All sessions are HIPAA compliant and completely confidential.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Book a Counselor</h1>
      </div>

      {/* Counselors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {counselors.map((counselor) => (
          <Card key={counselor.id} className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-lg">
                    {counselor.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1">{counselor.name}</h3>
                  <p className="text-sm text-slate-600 mb-2">{counselor.title}</p>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{counselor.rating}</span>
                      <span className="text-slate-500">({counselor.reviews})</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-slate-600">
                      <Award className="w-4 h-4" />
                      <span>{counselor.experience}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-800 mb-1">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {counselor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-800 mb-1">Session Options</h4>
                  <div className="flex flex-wrap gap-1">
                    {counselor.sessionTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-blue-200">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-slate-600 line-clamp-2">{counselor.bio}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                  Available {counselor.availability}
                </div>
                
                <Button 
                  onClick={() => {
                    setSelectedCounselor(counselor);
                    setBookingStep('booking');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white"
                >
                  Book Session
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Section */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="text-slate-800">How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-slate-800 mb-2">1. Choose Your Counselor</h4>
              <p className="text-sm text-slate-600">Browse our licensed professionals and find the right fit for your needs.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-slate-800 mb-2">2. Schedule Your Session</h4>
              <p className="text-sm text-slate-600">Pick a convenient time and session format that works for you.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-slate-800 mb-2">3. Start Your Journey</h4>
              <p className="text-sm text-slate-600">Begin working with your counselor in a safe, supportive environment.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}