
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { UserRole } from "@/types/auth";
import { Loader2 } from "lucide-react";

const ManageUsersPage: React.FC = () => {
  const { user, getAllUsers, updateUserRole } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      // Fetch users when component mounts and set loading to false after data is loaded
      setUsers(getAllUsers());
      setIsLoading(false);
    }
  }, [user, getAllUsers]);

  if (user?.role !== 'admin') {
    return (
      <div className="p-6">
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  const handleRoleUpdate = (userId: string, newRole: UserRole) => {
    updateUserRole(userId, newRole);
    setUsers(getAllUsers());
    toast.success("User role updated successfully");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'faculty':
        return 'bg-blue-500';
      case 'student':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Manage Users</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage user accounts
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-medium">Users ({users.length})</h2>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading users...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No registered users found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {user.role !== 'admin' && (
                          <Button size="sm" onClick={() => handleRoleUpdate(user.id, 'admin')}>
                            Make Admin
                          </Button>
                        )}
                        {user.role !== 'faculty' && (
                          <Button size="sm" onClick={() => handleRoleUpdate(user.id, 'faculty')}>
                            Make Faculty
                          </Button>
                        )}
                        {user.role !== 'student' && (
                          <Button size="sm" onClick={() => handleRoleUpdate(user.id, 'student')}>
                            Make Student
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsersPage;
