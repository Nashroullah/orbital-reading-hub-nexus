
import React from "react";

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your library system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium mb-2">System Overview</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome to the admin dashboard. From here, you can manage users, books, and view system statistics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
