
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const { login, loading } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-background p-4">
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          className="bg-custom-secondary text-custom-text hover:bg-custom-blue"
          onClick={toggleLanguage}
        >
          <Globe className="h-4 w-4 mr-2" />
          {t('login.switchLanguage')}
        </Button>
      </div>

      <Card className="w-full max-w-md bg-custom-secondary border-custom-blue">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-custom-text">
            {t('login.title')}
          </CardTitle>
          <CardDescription className="text-custom-textSecondary text-center">
            {language === 'en' ? 'Enter your credentials to continue' : 'أدخل بيانات الاعتماد الخاصة بك للمتابعة'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-custom-text">
                {t('login.email')}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={language === 'en' ? 'example@domain.com' : 'مثال@domain.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-custom-background text-custom-text border-custom-blue"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-custom-text">
                  {t('login.password')}
                </Label>
                <Button variant="link" className="text-custom-blue px-0 h-auto">
                  {t('login.forgotPassword')}
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-custom-background text-custom-text border-custom-blue"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-custom-blue hover:bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'en' ? 'Signing in...' : 'جاري تسجيل الدخول...'}
                </span>
              ) : (
                t('login.button')
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-custom-textSecondary px-8 py-4 text-xs">
          {language === 'en' 
            ? 'For demo purposes, use: user@example.com / password'
            : 'لأغراض العرض التوضيحي، استخدم: user@example.com / password'}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
