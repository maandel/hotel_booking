import { fetchAPI } from "@/lib/api";
import { Users, UserPlus, Trash2, Edit } from "lucide-react";
import Link from "next/link";

export default async function AdminUsers() {
  let users = [];
  try {
    const res = await fetchAPI("/admin/users");
    users = res?.items || res || [];
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Failed to fetch users:", error);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users & Roles</h1>
          <p className="text-muted-foreground mt-1">Manage staff access and permissions.</p>
        </div>
        <div className="flex gap-4">
          <a href="/admin/users/roles" className="bg-muted hover:bg-muted/80 text-foreground px-6 py-2 rounded-lg font-medium shadow-sm transition-transform hover:-translate-y-0.5">
            Manage Roles
          </a>
          <a href="/admin/users/new" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium shadow-md shadow-primary/20 transition-transform hover:-translate-y-0.5 inline-flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add User
          </a>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/50 flex items-center gap-3">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Registered Staff</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted text-muted-foreground text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Username</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Roles</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No users found or you lack permissions to view them.
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">#{user.id}</td>
                    <td className="px-6 py-4 text-foreground font-medium">{user.username}</td>
                    <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 flex-wrap">
                        {user.roles?.map((role: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md">
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/users/${user.id}/edit`} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2 inline-flex items-center justify-center">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
