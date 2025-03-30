
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Mock data for followers
const mockFollowers = [
  { id: 1, name: 'Sarah Johnson', username: '@sarahj', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', isNew: true },
  { id: 2, name: 'Michael Chen', username: '@mikechen', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', isNew: true },
  { id: 3, name: 'Aisha Ali', username: '@aishaali', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha', isNew: false },
  { id: 4, name: 'John Smith', username: '@johnsmith', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', isNew: false },
  { id: 5, name: 'Maria Garcia', username: '@mgarcia', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', isNew: false },
  { id: 6, name: 'David Kim', username: '@dkim', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', isNew: false },
  { id: 7, name: 'Fatima Hassan', username: '@fhassan', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima', isNew: false },
  { id: 8, name: 'Alex Johnson', username: '@alexj', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', isNew: false },
];

const mockUnfollowed = [
  { id: 101, name: 'James Wilson', username: '@jwilson', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: 102, name: 'Emma Thompson', username: '@ethompson', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
];

const Followers = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredFollowers = mockFollowers.filter(
    follower => follower.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                follower.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredUnfollowed = mockUnfollowed.filter(
    follower => follower.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                follower.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-custom-text">{t('followers.title')}</h1>
      </div>

      <div className="relative">
        <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-custom-textSecondary`} size={20} />
        <Input
          type="text"
          placeholder={t('followers.search')}
          className={`bg-custom-secondary text-custom-text border-custom-blue/30 ${language === 'ar' ? 'pr-10' : 'pl-10'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-custom-secondary">
          <TabsTrigger value="all">{language === 'en' ? 'All Followers' : 'كل المتابعين'}</TabsTrigger>
          <TabsTrigger value="new">
            {t('followers.new')}
            <span className="ml-2 bg-custom-blue text-white px-2 py-0.5 rounded-full text-xs">
              {mockFollowers.filter(f => f.isNew).length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="unfollowed">
            {t('followers.unfollowed')}
            <span className="ml-2 bg-custom-blue text-white px-2 py-0.5 rounded-full text-xs">
              {mockUnfollowed.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="bg-custom-secondary border-0">
            <CardHeader>
              <CardTitle className="text-xl text-custom-text">
                {language === 'en' ? 'All Followers' : 'كل المتابعين'} 
                <span className="ml-2 text-custom-textSecondary">({filteredFollowers.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFollowers.length > 0 ? (
                  filteredFollowers.map((follower) => (
                    <div key={follower.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-custom-background transition-colors">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={follower.image} alt={follower.name} />
                          <AvatarFallback className="bg-custom-blue text-white">
                            {follower.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`${language === 'ar' ? 'mr-3' : 'ml-3'}`}>
                          <h3 className="font-medium text-custom-text">{follower.name}</h3>
                          <p className="text-sm text-custom-textSecondary">{follower.username}</p>
                        </div>
                        {follower.isNew && (
                          <span className="px-2 py-1 bg-custom-blue/20 text-custom-blue text-xs rounded-full">
                            {language === 'en' ? 'New' : 'جديد'}
                          </span>
                        )}
                      </div>
                      
                      <Button variant="outline" size="sm" className="border-custom-blue/30 text-custom-textSecondary hover:bg-custom-blue hover:text-white">
                        {language === 'en' ? 'View Profile' : 'عرض الملف'}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-custom-textSecondary">
                    {language === 'en' ? 'No followers found matching your search.' : 'لم يتم العثور على متابعين مطابقين لبحثك.'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card className="bg-custom-secondary border-0">
            <CardHeader>
              <CardTitle className="text-xl text-custom-text">
                {t('followers.new')}
                <span className="ml-2 text-custom-textSecondary">
                  ({filteredFollowers.filter(f => f.isNew).length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFollowers.filter(f => f.isNew).length > 0 ? (
                  filteredFollowers
                    .filter(f => f.isNew)
                    .map((follower) => (
                      <div key={follower.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-custom-background transition-colors">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={follower.image} alt={follower.name} />
                            <AvatarFallback className="bg-custom-blue text-white">
                              {follower.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`${language === 'ar' ? 'mr-3' : 'ml-3'}`}>
                            <h3 className="font-medium text-custom-text">{follower.name}</h3>
                            <p className="text-sm text-custom-textSecondary">{follower.username}</p>
                          </div>
                          <span className="px-2 py-1 bg-custom-blue/20 text-custom-blue text-xs rounded-full">
                            {language === 'en' ? 'New' : 'جديد'}
                          </span>
                        </div>
                        
                        <Button variant="outline" size="sm" className="border-custom-blue/30 text-custom-textSecondary hover:bg-custom-blue hover:text-white">
                          {language === 'en' ? 'View Profile' : 'عرض الملف'}
                        </Button>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-custom-textSecondary">
                    {language === 'en' ? 'No new followers found matching your search.' : 'لم يتم العثور على متابعين جدد مطابقين لبحثك.'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unfollowed">
          <Card className="bg-custom-secondary border-0">
            <CardHeader>
              <CardTitle className="text-xl text-custom-text">
                {t('followers.unfollowed')}
                <span className="ml-2 text-custom-textSecondary">({filteredUnfollowed.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUnfollowed.length > 0 ? (
                  filteredUnfollowed.map((follower) => (
                    <div key={follower.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-custom-background transition-colors">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={follower.image} alt={follower.name} />
                          <AvatarFallback className="bg-custom-blue text-white">
                            {follower.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`${language === 'ar' ? 'mr-3' : 'ml-3'}`}>
                          <h3 className="font-medium text-custom-text">{follower.name}</h3>
                          <p className="text-sm text-custom-textSecondary">{follower.username}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-custom-blue hover:bg-blue-600 text-white">
                          {language === 'en' ? 'Follow Back' : 'متابعة'}
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-custom-textSecondary">
                    {language === 'en' ? 'No unfollowed users found matching your search.' : 'لم يتم العثور على مستخدمين ألغوا المتابعة مطابقين لبحثك.'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Followers;
