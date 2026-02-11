import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { usersApi } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editedRoles, setEditedRoles] =
    useState<Record<string, string>>({});

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

    // remove edited state after saving
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
    if (!confirm("Delete this user?")) return;

    await usersApi.delete(id);
    loadUsers();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">
          User Management
        </h1>

        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left text-sm text-muted-foreground">
                <th className="p-4">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="w-[260px]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const editedRole =
                  editedRoles[user.id] || user.role;

                return (
                  <tr key={user.id} className="border-b">
                    {/* NAME */}
                    <td className="p-4 font-medium">
                      {user.name}
                    </td>

                    {/* EMAIL */}
                    <td>{user.email}</td>

                    {/* ROLE */}
                    <td>
                      <select
                        value={editedRole}
                        onChange={(e) =>
                          setEditedRoles((prev) => ({
                            ...prev,
                            [user.id]: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1"
                        disabled={
                          currentUser?.role !== "super_admin"
                        }
                      >
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">
                          Super Admin
                        </option>
                      </select>
                    </td>

                    {/* STATUS */}
                    <td>
                      {user.is_approved ? (
                        <Badge>Approved</Badge>
                      ) : (
                        <Badge variant="destructive">
                          Pending
                        </Badge>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="space-x-2">
                      {/* APPROVE */}
                      {!user.is_approved && (
                        <Button
                          size="sm"
                          onClick={() =>
                            approveUser(user.id)
                          }
                        >
                          Approve
                        </Button>
                      )}

                      {/* SAVE ROLE */}
                      {editedRoles[user.id] && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            changeRole(
                              user.id,
                              editedRoles[user.id]
                            )
                          }
                        >
                          Save
                        </Button>
                      )}

                      {/* DELETE (SUPER ADMIN ONLY) */}
                      {currentUser?.role ===
                        "super_admin" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={
                            currentUser.id === user.id
                          }
                          onClick={() =>
                            deleteUser(user.id)
                          }
                        >
                          Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
