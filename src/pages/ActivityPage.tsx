
import React, { useState } from "react";
import { useLibrary } from "@/contexts/LibraryContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, Calendar as CalendarIcon, Activity, TrendingUp } from "lucide-react";
import { format, parseISO, isSameDay, subDays, startOfWeek, endOfWeek } from "date-fns";

const ActivityPage: React.FC = () => {
  const { getUserActivities } = useLibrary();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  if (!user) return null;
  
  const userActivities = getUserActivities();
  console.log('Activity page - user activities:', userActivities);
  
  // Sort activities by date for better chart display
  const sortedActivities = [...userActivities].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Format activities for the chart with better date formatting
  const chartData = sortedActivities.map(activity => ({
    date: format(parseISO(activity.date), "MM/dd"),
    fullDate: format(parseISO(activity.date), "MMM dd, yyyy"),
    minutes: activity.timeSpent,
    hours: Math.floor(activity.timeSpent / 60),
    remainingMinutes: activity.timeSpent % 60,
    formattedTime: activity.timeSpent >= 60 
      ? `${Math.floor(activity.timeSpent / 60)}h ${activity.timeSpent % 60}m`
      : `${activity.timeSpent}m`,
  }));

  // Get highlighted dates (days with activity)
  const highlightedDates = userActivities.map(activity => parseISO(activity.date));
  
  // Find selected day's activity
  const selectedDayActivity = userActivities.find(activity => 
    selectedDate && isSameDay(parseISO(activity.date), selectedDate)
  );

  // Calculate statistics
  const totalMinutes = userActivities.reduce((total, activity) => total + activity.timeSpent, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const averageDaily = userActivities.length > 0 ? Math.floor(totalMinutes / userActivities.length) : 0;
  
  // Calculate this week's activity
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);
  const thisWeekActivity = userActivities
    .filter(activity => {
      const activityDate = parseISO(activity.date);
      return activityDate >= weekStart && activityDate <= weekEnd;
    })
    .reduce((total, activity) => total + activity.timeSpent, 0);
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 fade-in">
      <div>
        <h1 className="text-3xl font-playfair font-bold mb-2 text-elegant-darkpurple dark:text-elegant-lightpurple">Reading Activity</h1>
        <p className="text-gray-600 dark:text-gray-400 font-montserrat">
          Track your library usage and reading habits over time
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-elegant-lightpurple/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-montserrat text-gray-500 dark:text-gray-400 flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Total Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-playfair text-elegant-darkpurple dark:text-elegant-lightpurple">
              {totalHours}h {remainingMinutes}m
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-montserrat">All time reading</p>
          </CardContent>
        </Card>

        <Card className="border-elegant-lightpurple/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-montserrat text-gray-500 dark:text-gray-400 flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-playfair text-elegant-darkpurple dark:text-elegant-lightpurple">
              {Math.floor(thisWeekActivity / 60)}h {thisWeekActivity % 60}m
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-montserrat">Current week</p>
          </CardContent>
        </Card>

        <Card className="border-elegant-lightpurple/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-montserrat text-gray-500 dark:text-gray-400 flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Daily Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-playfair text-elegant-darkpurple dark:text-elegant-lightpurple">
              {Math.floor(averageDaily / 60)}h {averageDaily % 60}m
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-montserrat">Per active day</p>
          </CardContent>
        </Card>

        <Card className="border-elegant-lightpurple/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-montserrat text-gray-500 dark:text-gray-400 flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Active Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-playfair text-elegant-darkpurple dark:text-elegant-lightpurple">
              {userActivities.length}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-montserrat">Days with activity</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1 border-elegant-lightpurple/20 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center font-playfair text-elegant-darkpurple dark:text-elegant-lightpurple">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Activity Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                highlighted: highlightedDates,
              }}
              modifiersClassNames={{
                highlighted: "bg-elegant-purple/20 text-elegant-darkpurple font-medium border-elegant-purple",
              }}
            />
            
            <div className="mt-4 px-2">
              <h3 className="font-medium mb-2 font-playfair text-elegant-darkpurple dark:text-elegant-lightpurple">Selected Day</h3>
              {selectedDayActivity ? (
                <div className="text-sm space-y-1 font-montserrat">
                  <p><span className="font-medium">Date:</span> {format(parseISO(selectedDayActivity.date), "PPP")}</p>
                  <p><span className="font-medium">Time spent:</span> {Math.floor(selectedDayActivity.timeSpent / 60)}h {selectedDayActivity.timeSpent % 60}m</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 font-montserrat">No activity recorded for this day.</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Chart */}
        <Card className="lg:col-span-2 border-elegant-lightpurple/20 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-playfair text-elegant-darkpurple dark:text-elegant-lightpurple">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Reading Time History
              </div>
            </CardTitle>
            <div className="text-right">
              <div className="text-xl font-bold font-playfair text-elegant-darkpurple dark:text-elegant-lightpurple">
                {totalHours}h {remainingMinutes}m
              </div>
              <span className="text-sm font-normal text-gray-500 font-montserrat">total time</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="opacity-30" />
                    <XAxis 
                      dataKey="date" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60} 
                      tick={{fontSize: 12}}
                      className="text-gray-600"
                    />
                    <YAxis 
                      tick={{fontSize: 12}}
                      className="text-gray-600"
                      label={{ 
                        value: 'Minutes', 
                        angle: -90, 
                        position: 'insideLeft', 
                        style: { textAnchor: 'middle' } 
                      }}
                    />
                    <Tooltip 
                      formatter={(value, name) => {
                        const minutes = Number(value);
                        const hours = Math.floor(minutes / 60);
                        const remainingMins = minutes % 60;
                        return [
                          hours > 0 ? `${hours}h ${remainingMins}m` : `${remainingMins}m`, 
                          'Reading Time'
                        ];
                      }}
                      labelFormatter={(label) => {
                        const item = chartData.find(d => d.date === label);
                        return item ? item.fullDate : label;
                      }}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="minutes" 
                      name="Reading Time" 
                      fill="#9b87f5" 
                      radius={[4, 4, 0, 0]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-montserrat">No reading activity recorded yet.</p>
                    <p className="text-sm text-gray-400 font-montserrat mt-1">Start browsing books to track your activity!</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityPage;
