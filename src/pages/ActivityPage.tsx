
import React, { useState } from "react";
import { useLibrary } from "@/contexts/LibraryContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { format, parseISO, isSameDay } from "date-fns";

const ActivityPage: React.FC = () => {
  const { getUserActivities } = useLibrary();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  if (!user) return null;
  
  const userActivities = getUserActivities();
  
  // Format activities for the chart
  const chartData = userActivities.map(activity => ({
    date: format(parseISO(activity.date), "MMM dd"),
    minutes: activity.timeSpent,
    formattedTime: `${Math.floor(activity.timeSpent / 60)}h ${activity.timeSpent % 60}m`,
  }));

  // Get highlighted dates (days with activity)
  const highlightedDates = userActivities.map(activity => parseISO(activity.date));
  
  // Find selected day's activity
  const selectedDayActivity = userActivities.find(activity => 
    selectedDate && isSameDay(parseISO(activity.date), selectedDate)
  );

  const totalMinutes = userActivities.reduce((total, activity) => total + activity.timeSpent, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Reading Activity</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your library usage and reading habits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
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
                highlighted: "bg-primary/20 text-primary-foreground font-medium",
              }}
            />
            
            <div className="mt-4 px-2">
              <h3 className="font-medium mb-1">Selected Day</h3>
              {selectedDayActivity ? (
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Date:</span> {format(parseISO(selectedDayActivity.date), "PPP")}</p>
                  <p><span className="font-medium">Time spent:</span> {Math.floor(selectedDayActivity.timeSpent / 60)}h {selectedDayActivity.timeSpent % 60}m</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No activity recorded for this day.</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Reading Time History
              </div>
            </CardTitle>
            <div className="text-xl font-bold">
              {hours}h {minutes}m <span className="text-sm font-normal text-gray-500">total</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      angle={-45} 
                      textAnchor="end" 
                      height={50} 
                      tick={{fontSize: 12}}
                    />
                    <YAxis 
                      name="Time (minutes)" 
                      tick={{fontSize: 12}}
                      label={{ value: 'Minutes', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                    />
                    <Tooltip 
                      formatter={(value, name) => {
                        return [`${Math.floor(Number(value) / 60)}h ${Number(value) % 60}m`, 'Time Spent'];
                      }}
                    />
                    <Bar 
                      dataKey="minutes" 
                      name="Reading Time" 
                      fill="#9b87f5" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">No reading activity recorded yet.</p>
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
