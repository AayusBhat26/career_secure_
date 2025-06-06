'use client';

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { LogOut, Users, Settings } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Career Secure Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {session?.user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4">
              <ul className="space-y-2">
                <li>
                  <a
                    href="/dashboard"
                    className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Users className="h-5 w-5" />
                    <span>User Management</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-gray-400 p-2 rounded-lg cursor-not-allowed"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
