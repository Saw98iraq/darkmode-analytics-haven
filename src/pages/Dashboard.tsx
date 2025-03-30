
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// Mock data for charts
const postTypeData = [
  { name: 'Photos', value: 85, color: '#1A73E8' },
  { name: 'Reels', value: 40, color: '#34A853' },
  { name: 'Videos', value: 25, color: '#EA4335' },
];

const engagementData = [
  { name: 'Sun', likes: 24, comments: 13, shares: 5 },
  { name: 'Mon', likes: 30, comments: 18, shares: 7 },
  { name: 'Tue', likes: 45, comments: 20, shares: 15 },
  { name: 'Wed', likes: 50, comments: 25, shares: 18 },
  { name: 'Thu', likes: 35, comments: 15, shares: 9 },
  { name: 'Fri', likes: 60, comments: 30, shares: 22 },
  { name: 'Sat', likes: 75, comments: 40, shares: 30 },
];

const followersData = [
  { name: 'Jan', followers: 150 },
  { name: 'Feb', followers: 180 },
  { name: 'Mar', followers: 220 },
  { name: 'Apr', followers: 270 },
  { name: 'May', followers: 350 },
  { name: 'Jun', followers: 420 },
  { name: 'Jul', followers: 450 },
];

// Summary stats
const statCards = [
  { key: 'posts', value: 150, label: 'analytics.posts' },
  { key: 'followers', value: 450, label: 'analytics.followers' },
  { key: 'following', value: 280, label: 'analytics.following' },
  { key: 'likes', value: 1250, label: 'analytics.likes' },
];

const Dashboard = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-custom-text">{t('analytics.title')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.key} className="bg-custom-secondary border-0">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-custom-text">{stat.value.toLocaleString()}</div>
              <p className="text-custom-textSecondary mt-1">{t(stat.label)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Post types distribution */}
        <Card className="bg-custom-secondary border-0 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl text-custom-text">{language === 'en' ? 'Post Types' : 'أنواع المنشورات'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={postTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {postTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}`, language === 'en' ? 'Posts' : 'منشورات']}
                    contentStyle={{ backgroundColor: '#2C2C2C', borderColor: '#1A73E8', borderRadius: '8px' }}
                    itemStyle={{ color: '#FFFFFF' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement chart */}
        <Card className="bg-custom-secondary border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-custom-text">{t('analytics.engagement')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#BDC3C7" />
                  <YAxis stroke="#BDC3C7" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2C2C2C', borderColor: '#1A73E8', borderRadius: '8px' }}
                    itemStyle={{ color: '#FFFFFF' }}
                  />
                  <Bar dataKey="likes" name={t('analytics.likes')} fill="#1A73E8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="comments" name={t('analytics.comments')} fill="#34A853" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="shares" name={t('analytics.shares')} fill="#EA4335" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-custom-secondary border-0">
        <CardHeader>
          <CardTitle className="text-xl text-custom-text">{t('analytics.followers')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={followersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#BDC3C7" />
                <YAxis stroke="#BDC3C7" />
                <Tooltip 
                  formatter={(value) => [`${value}`, language === 'en' ? 'Followers' : 'متابعين']}
                  contentStyle={{ backgroundColor: '#2C2C2C', borderColor: '#1A73E8', borderRadius: '8px' }}
                  itemStyle={{ color: '#FFFFFF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="#1A73E8" 
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#1A73E8' }}
                  activeDot={{ r: 8, fill: '#1A73E8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
