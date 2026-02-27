import React, { useState } from 'react';
import { 
  Bell, 
  Trash2, 
  Shield, 
  Clock,
  UserCog,
  AlertTriangle
} from 'lucide-react';
import Useauth from '../../Component/Useauth';
import { useQuery,  } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { my_Notification } from '../../Component/Api';

const Notification = () => {
  const { user } = Useauth();


  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['my-notification', user?.email],
    queryFn: () => my_Notification(user?.email),
    enabled: !!user?.email
  });



  const getNotificationStyle = (type) => {
    const styles = {
      'role-update': {
        icon: UserCog,
        bg: 'bg-purple-100',
        text: 'text-purple-600'
      },
      'product-deleted': {
        icon: AlertTriangle,
        bg: 'bg-red-100',
        text: 'text-red-600'
      },
      'default': {
        icon: Bell,
        bg: 'bg-blue-100',
        text: 'text-blue-600'
      }
    };
    return styles[type] || styles.default;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-start gap-4 p-4 border-b border-gray-100 last:border-0">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500">Stay updated with your activity</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {notifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No notifications</h3>
              <p className="text-sm text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => {
                const style = getNotificationStyle(notification.type);
                const Icon = style.icon;

                return (
                  <div
                    key={notification._id}
                    className={`group relative p-6 transition-all hover:bg-gray-50/80 ${
                      !notification.read ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    {!notification.read && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full"></div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${style.text}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium mb-1">
                              {notification.message}
                            </p>

                            {notification.productName && (
                              <div className="flex items-center gap-3 mt-2">
                                {notification.productImage && (
                                  <img 
                                    src={notification.productImage} 
                                    alt={notification.productName}
                                    className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                                  />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {notification.productName}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Product ID: {notification.productId?.slice(-6)}
                                  </p>
                                </div>
                              </div>
                            )}

                            {notification.role && (
                              <div className="flex items-center gap-2 mt-2">
                                <Shield className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  New Role: <span className="font-medium text-purple-600">{notification.role}</span>
                                </span>
                              </div>
                            )}

                            <div className="flex items-center gap-3 mt-3">
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</span>
                              </div>
                              {notification.read && (
                                <span className="text-xs text-gray-400">• Read</span>
                              )}
                            </div>
                          </div>

                      
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              {notifications.length} notifications • {unreadCount} unread
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;