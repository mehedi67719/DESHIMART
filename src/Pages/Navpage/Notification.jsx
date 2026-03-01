import React, { useEffect, useState } from 'react';
import {
  Bell,
  Trash2,
  Shield,
  Clock,
  UserCog,
  AlertTriangle,
  Package
} from 'lucide-react';
import Useauth from '../../Component/Useauth';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { adminNotification, getuser, my_Notification } from '../../Component/Api';

const Notification = () => {
  const { user } = Useauth();
  const [activeTab, setActiveTab] = useState('all');
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getuser(user.email);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const { data: notifications = [], isLoading: notificationsLoading } = useQuery({
    queryKey: ['my-notification', user?.email],
    queryFn: () => my_Notification(user?.email),
    enabled: !!user?.email
  });

  const { data: adminnotifications = [], isLoading: adminLoading } = useQuery({
    queryKey: ['admin-notification', user?.email],
    queryFn: () => adminNotification(user?.email),
    enabled: !!user?.email && User?.role === 'admin'
  });

  const allNotifications = [...notifications, ...adminnotifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const getFilteredNotifications = () => {
    if (activeTab === 'user') return notifications;
    if (activeTab === 'admin' && User?.role === 'admin') return adminnotifications;
    return allNotifications;
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = allNotifications.filter(n => !n.read).length;
  const adminUnreadCount = adminnotifications.filter(n => !n.read).length;
  const userUnreadCount = notifications.filter(n => !n.read).length;

  const getNotificationStyle = (type, notification) => {
    if (notification.role === 'requested-seller') {
      return {
        icon: UserCog,
        bg: 'bg-amber-100',
        text: 'text-amber-600'
      };
    }

    const styles = {
      'role-update': {
        icon: UserCog,
        bg: 'bg-purple-100',
        text: 'text-purple-600'
      },
      'product-add': {
        icon: Package,
        bg: 'bg-emerald-100',
        text: 'text-emerald-600'
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

  if (loading || notificationsLoading || (User?.role === 'admin' && adminLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
              </div>
            </div>
            <div className="flex gap-2 mt-6 border-b border-gray-200">
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              {User?.role === 'admin' && (
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-start gap-4 p-4 border-b border-gray-100 last:border-0">
                <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
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
          <div className="flex items-center justify-between">
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

          <div className="flex gap-2 mt-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium transition-all relative ${
                activeTab === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All
              {unreadCount > 0 && activeTab !== 'all' && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('user')}
              className={`px-4 py-2 text-sm font-medium transition-all relative ${
                activeTab === 'user'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              User
              {userUnreadCount > 0 && activeTab !== 'user' && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {userUnreadCount}
                </span>
              )}
            </button>
            {User?.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 text-sm font-medium transition-all relative ${
                  activeTab === 'admin'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Admin
                {adminUnreadCount > 0 && activeTab !== 'admin' && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {adminUnreadCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No notifications</h3>
              <p className="text-sm text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => {
                const style = getNotificationStyle(notification.type, notification);
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
                              {notification.adminmessage || notification.message}
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
                                    Status: <span className="font-medium capitalize text-amber-600">{notification.status || 'pending'}</span>
                                  </p>
                                  {notification.sellerEmail && (
                                    <p className="text-xs text-gray-400 mt-0.5">
                                      Seller: {notification.sellerEmail}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}

                            {notification.role === 'requested-seller' && (
                              <div className="flex items-center gap-2 mt-2">
                                <Shield className="w-4 h-4 text-amber-500" />
                                <span className="text-sm text-gray-600">
                                  User requesting to become a seller: <span className="font-medium text-amber-600">{notification.email}</span>
                                </span>
                              </div>
                            )}

                            {notification.role && notification.role !== 'requested-seller' && (
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
                              {notification.type === 'product-add' && (
                                <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
                                  New Product
                                </span>
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

        {filteredNotifications.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              {filteredNotifications.length} notifications • {
                activeTab === 'all'
                  ? unreadCount
                  : activeTab === 'admin'
                    ? adminUnreadCount
                    : userUnreadCount
              } unread
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;