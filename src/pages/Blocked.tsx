
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Blocked = () => {
  const { language } = useLanguage();
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-custom-text">
          {language === 'en' ? 'Blocked Users' : 'المستخدمين المحظورين'}
        </h1>
      </div>
      
      <div className="bg-custom-secondary p-8 rounded-lg text-center">
        <h2 className="text-xl text-custom-text mb-4">
          {language === 'en' ? 'Blocked users page coming soon' : 'صفحة المستخدمين المحظورين قريباً'}
        </h2>
        <p className="text-custom-textSecondary">
          {language === 'en' 
            ? 'This feature is under development and will be available in a future update.'
            : 'هذه الميزة قيد التطوير وستكون متاحة في تحديث مستقبلي.'}
        </p>
      </div>
    </div>
  );
};

export default Blocked;
