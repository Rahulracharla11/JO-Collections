import React from 'react';
import { Breadcrumbs } from '../components/Account/Breadcrumbs';
import { AuthScreen } from '../components/Account/AuthScreen';
import { LostPasswordScreen } from '../components/Account/LostPasswordScreen';
import { SetNewPasswordScreen } from '../components/Account/SetNewPasswordScreen';
import { AccountDashboard } from '../components/Account/AccountDashboard';
import { useShop } from '../context/ShopContext';

export const MyAccountPage: React.FC = () => {
  const { isAuthenticated, accountSubView } = useShop();

  const renderContent = () => {
    // 1. Lost password screen
    if (accountSubView === 'lost-password') {
      return <LostPasswordScreen />;
    }

    // 2. Set new password screen
    if (accountSubView === 'reset-password') {
      return <SetNewPasswordScreen />;
    }

    // 3. Not logged in -> Show Login & Register screen
    if (!isAuthenticated) {
      return <AuthScreen />;
    }

    // 4. Logged in -> Show Account Dashboard (with tabs)
    return <AccountDashboard />;
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-10 min-h-[600px] animate-fade-in">
      <Breadcrumbs />
      {renderContent()}
    </div>
  );
};
