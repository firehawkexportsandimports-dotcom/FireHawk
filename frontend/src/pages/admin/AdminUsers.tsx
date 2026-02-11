import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Shield,
  UserCog,
  Trash2,
  Save,
  AlertCircle,
  Search,
  Filter,
  ShieldAlert,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { usersApi } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/types";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editedRoles, setEditedRoles] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending">("all");

  const currentUser: User | null = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    loadUsers();
  }, []);

  /* =========================
     LOAD USERS
  ========================= */
  const loadUsers = async () => {
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  /* =========================
     APPROVE USER
  ========================= */
  const approveUser = async (id: string) => {
    await usersApi.approve(id);
    loadUsers();
  };

  /* =========================
     SAVE ROLE
  ========================= */
  const changeRole = async (id: string, role: string) => {
    await usersApi.updateRole(id, role);
    setEditedRoles((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    loadUsers();
  };

  /* =========================
     DELETE USER
  ========================= */
  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) 
      return;
    await usersApi.delete(id);
    loadUsers();
  };

  /* =========================
     FILTERED USERS
  ========================= */
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" ||
      (statusFilter === "approved" && user.is_approved) ||
      (statusFilter === "pending" && !user.is_approved);
    
    return matchesSearch && matchesStatus;
  });

  /* =========================
     GET ROLE BADGE
  ========================= */
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">
            <ShieldAlert className="w-3 h-3 mr-1" />
            Super Admin
          </Badge>
        );
      case "admin":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200">
            <UserCog className="w-3 h-3 mr-1" />
            Editor
          </Badge>
        );
    }
  };

  /* =========================
     GET USER INITIALS
  ========================= */
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isSuperAdmin = currentUser?.role === "super_admin";

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage user accounts, roles, and permissions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              <UserIcon className="w-4 h-4 mr-2" />
              {users.length} Total Users
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-green-50">
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              {users.filter((u) => u.is_approved).length} Approved
            </Badge>
          </div>
        </div>

        {/* FILTERS */}
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  value={statusFilter}
                  onValueChange={(value: typeof statusFilter) => setStatusFilter(value)}
                >
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* USERS TABLE */}
        <Card className="border shadow-sm overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b px-6 py-4">
            <CardTitle className="text-base font-semibold">Users</CardTitle>
            <CardDescription>
              {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="w-[300px]">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const editedRole = editedRoles[user.id] || user.role;
                  const hasRoleChange = editedRoles[user.id] !== undefined;
                  const isCurrentUser = currentUser?.id === user.id;

                  return (
                    <TableRow key={user.id} className="group hover:bg-gray-50/50">
                      {/* USER INFO */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5 text-primary font-medium">
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{user.name}</p>
                              {isCurrentUser && (
                                <Badge variant="outline" className="text-xs bg-blue-50">
                                  You
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* ROLE */}
                      <TableCell>
                        <div className="space-y-2">
                          {isSuperAdmin ? (
                            <Select
                              value={editedRole}
                              onValueChange={(value) =>
                                setEditedRoles((prev) => ({
                                  ...prev,
                                  [user.id]: value,
                                }))
                              }
                              disabled={isCurrentUser}
                            >
                              <SelectTrigger className="w-[140px] h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="editor">
                                  <div className="flex items-center gap-2">
                                    <UserCog className="w-3.5 h-3.5" />
                                    Editor
                                  </div>
                                </SelectItem>
                                <SelectItem value="admin">
                                  <div className="flex items-center gap-2">
                                    <Shield className="w-3.5 h-3.5" />
                                    Admin
                                  </div>
                                </SelectItem>
                                <SelectItem value="super_admin">
                                  <div className="flex items-center gap-2">
                                    <ShieldAlert className="w-3.5 h-3.5" />
                                    Super Admin
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            getRoleBadge(user.role)
                          )}
                          
                          {hasRoleChange && isSuperAdmin && !isCurrentUser && (
                            <div className="text-xs text-muted-foreground">
                              Changed from {user.role}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* STATUS */}
                      <TableCell>
                        {user.is_approved ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approved
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
                            <XCircle className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* APPROVE BUTTON */}
                          {!user.is_approved && isSuperAdmin && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => approveUser(user.id)}
                              className="h-8 px-3 text-xs border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                            >
                              <CheckCircle className="w-3.5 h-3.5 mr-1" />
                              Approve
                            </Button>
                          )}

                          {/* SAVE ROLE BUTTON */}
                          {hasRoleChange && isSuperAdmin && !isCurrentUser && (
                            <Button
                              size="sm"
                              onClick={() => changeRole(user.id, editedRoles[user.id])}
                              className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700"
                            >
                              <Save className="w-3.5 h-3.5 mr-1" />
                              Save
                            </Button>
                          )}

                          {/* DELETE BUTTON (SUPER ADMIN ONLY) */}
                          {isSuperAdmin && !isCurrentUser && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Delete User</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => deleteUser(user.id)}
                                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Confirm Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-xs text-muted-foreground">
                                  This action cannot be undone
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}

                          {/* NO ACTIONS AVAILABLE */}
                          {!isSuperAdmin && (
                            <span className="text-xs text-muted-foreground italic">
                              No actions available
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <UserIcon className="w-12 h-12 text-muted-foreground/30" />
                        <p className="text-lg font-medium text-muted-foreground">
                          No users found
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {searchTerm || statusFilter !== "all" 
                            ? "Try adjusting your filters" 
                            : "Users will appear here once they register"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* LEGEND / INFO */}
        {isSuperAdmin && (
          <Card className="border shadow-sm bg-blue-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-900">
                    Super Admin Privileges
                  </p>
                  <p className="text-xs text-blue-700">
                    You can manage all users, change roles, approve pending users, and delete accounts.
                    Your own role cannot be modified, and you cannot delete your own account.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}