
import React from "react";

const ManageUsersPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Manage Users</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage user accounts
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-center py-8">
          User management functionality will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default ManageUsersPage;
