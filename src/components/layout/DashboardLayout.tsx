
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useLanguage } from '@/contexts/LanguageContext';

const DashboardLayout = () => {
  const { dir } = useLanguage();
  
  return (
    <div className={`flex min-h-screen bg-custom-background ${dir}`}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
