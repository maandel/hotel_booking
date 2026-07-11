import { fetchAPI } from "@/lib/api";
import { createUser } from "@/app/actions/user";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";

export default async function NewUserPage() {
  let roles = [];
  try {
    const rolesRes = await fetchAPI("/admin/roles");
    roles = rolesRes?.items || rolesRes || [];
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Failed to fetch roles:", error);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/users" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Users
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Create Admin User</h1>
        <p className="text-muted-foreground mt-1">Add a new staff member and assign their roles.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
        <form action={createUser} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">First Name</label>
              <input
                type="text"
                name="first_name"
                className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                placeholder="Jane"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Last Name</label>
              <input
                type="text"
                name="last_name"
                className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Username</label>
              <input
                type="text"
                name="username"
                required
                className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                placeholder="janedoe123"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                placeholder="jane@lumina.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">Temporary Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
              placeholder="••••••••"
            />
            <p className="text-xs text-muted-foreground mt-1">User should change this upon first login.</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <label className="text-sm font-semibold text-foreground/80">Assign Roles</label>
            <div className="w-full">
              {roles.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No roles available. Please create roles first.</p>
              ) : (
                <MultiSelectDropdown 
                  name="roles"
                  options={roles.map((r: any) => ({ value: r.id, label: r.name }))}
                  placeholder="Select roles to assign..."
                />
              )}
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-border mt-8">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
