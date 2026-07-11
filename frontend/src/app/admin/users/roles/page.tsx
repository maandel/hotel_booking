import { fetchAPI } from "@/lib/api";
import { createRole, editRole } from "@/app/actions/user";
import Link from "next/link";
import { ArrowLeft, Shield, Edit2, X } from "lucide-react";

export default async function AdminRoles({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let roles = [];
  let permissions = [];
  
  try {
    const rolesRes = await fetchAPI("/admin/roles");
    roles = rolesRes?.items || rolesRes || [];
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Failed to fetch roles:", error);
  }

  try {
    const permRes = await fetchAPI("/admin/permissions");
    permissions = permRes?.items || permRes || [];
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Failed to fetch permissions:", error);
  }

  const params = await searchParams;
  const editId = params.edit ? (params.edit as string) : null;
  const roleToEdit = editId ? roles.find((r: any) => r.id === editId) : null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/users" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Users
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Manage Roles</h1>
        <p className="text-muted-foreground mt-1">Create and assign permission groupings for your staff.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Role Form */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {roleToEdit ? `Edit Role: ${roleToEdit.name}` : "Create New Role"}
              </h2>
              {roleToEdit && (
                <Link
                  href="/admin/users/roles"
                  className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                  title="Cancel editing"
                >
                  <X className="w-5 h-5" />
                </Link>
              )}
            </div>
            
            <form action={roleToEdit ? editRole : createRole} className="space-y-6">
              {roleToEdit && <input type="hidden" name="id" value={roleToEdit.id} />}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground/80">Role Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={roleToEdit?.name || ""}
                    className="w-full bg-background border border-border rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                    placeholder="e.g. Front Desk"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground/80">Description</label>
                  <input
                    type="text"
                    name="description"
                    defaultValue={roleToEdit?.description || ""}
                    className="w-full bg-background border border-border rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                    placeholder="Brief description..."
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-sm font-semibold text-foreground/80">Assign Permissions</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {permissions.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic col-span-full">No permissions available in database.</p>
                  ) : (
                    permissions.map((perm: any) => (
                      <label key={perm.id} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="flex items-center h-5 mt-0.5">
                          <input
                            type="checkbox"
                            name="permissions"
                            value={perm.id}
                            defaultChecked={roleToEdit?.permissions?.some((p: any) => p.id === perm.id)}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground leading-none">{perm.name}</span>
                          <span className="text-xs text-muted-foreground mt-1.5">{perm.codename}</span>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border mt-6">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2.5 rounded-xl font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
                >
                  {roleToEdit ? "Save Changes" : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Roles List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden sticky top-6">
            <div className="p-6 border-b border-border bg-muted/50 flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Existing Roles</h2>
            </div>
            <div className="divide-y divide-border max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
              {roles.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">No roles found.</div>
              ) : (
                roles.map((role: any) => (
                  <div key={role.id} className="p-5 hover:bg-muted/30 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-foreground">{role.name}</h3>
                        <Link 
                          href={`/admin/users/roles?edit=${role.id}`}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-accent rounded text-muted-foreground hover:text-foreground transition-all"
                          title="Edit Role"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-md ${role.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {role.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{role.description || 'No description provided.'}</p>
                    
                    <div>
                      <h4 className="text-[10px] font-semibold text-foreground/70 uppercase tracking-wider mb-1.5">Permissions ({role.permissions?.length || 0})</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {role.permissions?.length === 0 ? (
                          <span className="text-xs text-muted-foreground italic">None</span>
                        ) : (
                          role.permissions?.slice(0, 3).map((perm: any) => (
                            <span key={perm.id} className="px-1.5 py-0.5 bg-accent text-accent-foreground text-[10px] rounded border border-border/50">
                              {perm.name.replace('Can ', '')}
                            </span>
                          ))
                        )}
                        {role.permissions?.length > 3 && (
                          <span className="px-1.5 py-0.5 bg-muted text-muted-foreground text-[10px] rounded border border-border/50">
                            +{role.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
