
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  UserPlus, 
  Bell, 
  Settings, 
  LogOut, 
  UserX
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar = () => {
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: t('dashboard.analytics'),
      path: '/dashboard',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: t('dashboard.followers'),
      path: '/followers',
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: t('dashboard.following'),
      path: '/following',
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      name: t('dashboard.blocked'),
      path: '/blocked',
      icon: <UserX className="h-5 w-5" />,
    },
    {
      name: t('dashboard.notifications'),
      path: '/notifications',
      icon: <Bell className="h-5 w-5" />,
    },
    {
      name: t('dashboard.settings'),
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className={`h-screen w-64 bg-custom-secondary flex flex-col border-r border-custom-blue/10 ${language === 'ar' ? 'border-l' : 'border-r'}`}>
      <div className="p-4 border-b border-custom-blue/10">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
            <AvatarFallback className="bg-custom-blue text-white">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className={`${language === 'ar' ? 'mr-3' : 'ml-3'}`}>
            <h3 className="font-medium text-custom-text">{user?.name}</h3>
            <p className="text-xs text-custom-textSecondary">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2.5 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-custom-blue text-white' 
                      : 'text-custom-textSecondary hover:bg-custom-background hover:text-custom-text'
                  }`
                }
              >
                <span className={`${language === 'ar' ? 'ml-3' : 'mr-3'}`}>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-custom-blue/10">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-custom-textSecondary hover:bg-custom-background hover:text-custom-text"
          onClick={logout}
        >
          <LogOut className={`h-5 w-5 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
          {t('dashboard.signout')}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
