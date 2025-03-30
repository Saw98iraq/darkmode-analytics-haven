
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations = {
  en: {
    'login.title': 'Login to your account',
    'login.email': 'Email address',
    'login.password': 'Password',
    'login.button': 'Sign in',
    'login.forgotPassword': 'Forgot your password?',
    'login.switchLanguage': 'العربية',
    
    'dashboard.analytics': 'Analytics',
    'dashboard.followers': 'Followers',
    'dashboard.following': 'Following',
    'dashboard.blocked': 'Blocked',
    'dashboard.notifications': 'Notifications',
    'dashboard.settings': 'Settings',
    'dashboard.signout': 'Sign out',
    
    'analytics.title': 'Analytics Dashboard',
    'analytics.posts': 'Posts',
    'analytics.engagement': 'Engagement',
    'analytics.followers': 'Followers',
    'analytics.following': 'Following',
    'analytics.views': 'Views',
    'analytics.likes': 'Likes',
    'analytics.comments': 'Comments',
    'analytics.shares': 'Shares',
    'analytics.photos': 'Photos',
    'analytics.reels': 'Reels',
    'analytics.videos': 'Videos',
    
    'settings.title': 'Settings',
    'settings.profile': 'Profile',
    'settings.account': 'Account',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.privacy': 'Privacy',
    'settings.appearance': 'Appearance',
    'settings.help': 'Help',
    
    'followers.title': 'Followers',
    'followers.new': 'New Followers',
    'followers.unfollowed': 'Unfollowed',
    'followers.active': 'Active Followers',
    'followers.search': 'Search followers...',
  },
  ar: {
    'login.title': 'تسجيل الدخول إلى حسابك',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.button': 'تسجيل الدخول',
    'login.forgotPassword': 'نسيت كلمة المرور؟',
    'login.switchLanguage': 'English',
    
    'dashboard.analytics': 'التحليلات',
    'dashboard.followers': 'المتابعين',
    'dashboard.following': 'المتابَعين',
    'dashboard.blocked': 'المحظورين',
    'dashboard.notifications': 'الإشعارات',
    'dashboard.settings': 'الإعدادات',
    'dashboard.signout': 'تسجيل الخروج',
    
    'analytics.title': 'لوحة التحليلات',
    'analytics.posts': 'المنشورات',
    'analytics.engagement': 'التفاعل',
    'analytics.followers': 'المتابعين',
    'analytics.following': 'المتابَعين',
    'analytics.views': 'المشاهدات',
    'analytics.likes': 'الإعجابات',
    'analytics.comments': 'التعليقات',
    'analytics.shares': 'المشاركات',
    'analytics.photos': 'الصور',
    'analytics.reels': 'الريلز',
    'analytics.videos': 'الفيديوهات',
    
    'settings.title': 'الإعدادات',
    'settings.profile': 'الملف الشخصي',
    'settings.account': 'الحساب',
    'settings.language': 'اللغة',
    'settings.notifications': 'الإشعارات',
    'settings.privacy': 'الخصوصية',
    'settings.appearance': 'المظهر',
    'settings.help': 'المساعدة',
    
    'followers.title': 'المتابعين',
    'followers.new': 'متابعين جدد',
    'followers.unfollowed': 'ألغوا المتابعة',
    'followers.active': 'متابعين نشطين',
    'followers.search': 'البحث عن متابعين...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    setDir(lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Add or remove RTL class from body
    if (lang === 'ar') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
