
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-custom-text">{t('settings.title')}</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-custom-secondary">
          <TabsTrigger value="profile">{t('settings.profile')}</TabsTrigger>
          <TabsTrigger value="account">{t('settings.account')}</TabsTrigger>
          <TabsTrigger value="language">{t('settings.language')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('settings.notifications')}</TabsTrigger>
          <TabsTrigger value="privacy">{t('settings.privacy')}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-custom-secondary border-0">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Profile Information' : 'معلومات الملف الشخصي'}</CardTitle>
              <CardDescription>{language === 'en' ? 'Update your profile details' : 'تحديث تفاصيل ملفك الشخصي'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                  <AvatarFallback className="bg-custom-blue text-xl text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex flex-col space-y-2 ${language === 'ar' ? 'mr-4' : ''}`}>
                  <Button className="bg-custom-blue hover:bg-blue-600 text-white">
                    {language === 'en' ? 'Change Avatar' : 'تغيير الصورة'}
                  </Button>
                  <Button variant="outline" className="border-custom-blue text-custom-textSecondary">
                    {language === 'en' ? 'Remove' : 'إزالة'}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{language === 'en' ? 'Full Name' : 'الاسم الكامل'}</Label>
                    <Input 
                      id="name" 
                      defaultValue={user?.name}
                      className="bg-custom-background text-custom-text border-custom-blue/30" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">{language === 'en' ? 'Username' : 'اسم المستخدم'}</Label>
                    <Input 
                      id="username" 
                      defaultValue="demouser" 
                      className="bg-custom-background text-custom-text border-custom-blue/30"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email} 
                    className="bg-custom-background text-custom-text border-custom-blue/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">{language === 'en' ? 'Bio' : 'نبذة تعريفية'}</Label>
                  <Textarea 
                    id="bio" 
                    rows={4} 
                    placeholder={language === 'en' ? 'Write a short bio...' : 'اكتب نبذة قصيرة عنك...'}
                    className="bg-custom-background text-custom-text border-custom-blue/30 resize-none"
                  />
                </div>
                
                <Button className="bg-custom-blue hover:bg-blue-600 text-white">
                  {language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card className="bg-custom-secondary border-0">
            <CardHeader>
              <CardTitle>{t('settings.language')}</CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Choose your preferred language'
                  : 'اختر لغتك المفضلة'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                defaultValue={language} 
                onValueChange={(value) => setLanguage(value as 'en' | 'ar')}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="en" className="border-custom-blue text-custom-blue" />
                  <Label htmlFor="en" className="text-custom-text">English</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ar" id="ar" className="border-custom-blue text-custom-blue" />
                  <Label htmlFor="ar" className="text-custom-text">العربية</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card className="bg-custom-secondary border-0">
            <CardHeader>
              <CardTitle>{t('settings.account')}</CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Manage your account settings' 
                  : 'إدارة إعدادات حسابك'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-custom-textSecondary">
                {language === 'en' 
                  ? 'Account settings will be available in a future update.'
                  : 'ستكون إعدادات الحساب متاحة في تحديث مستقبلي.'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-custom-secondary border-0">
            <CardHeader>
              <CardTitle>{t('settings.notifications')}</CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Configure how you receive notifications'
                  : 'تكوين كيفية تلقي الإشعارات'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-custom-textSecondary">
                {language === 'en' 
                  ? 'Notification settings will be available in a future update.'
                  : 'ستكون إعدادات الإشعارات متاحة في تحديث مستقبلي.'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="bg-custom-secondary border-0">
            <CardHeader>
              <CardTitle>{t('settings.privacy')}</CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Manage your privacy settings'
                  : 'إدارة إعدادات الخصوصية'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-custom-textSecondary">
                {language === 'en' 
                  ? 'Privacy settings will be available in a future update.'
                  : 'ستكون إعدادات الخصوصية متاحة في تحديث مستقبلي.'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
