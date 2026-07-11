"use server";

import { fetchAPI } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRole(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const permissionIds = formData.getAll("permissions").map(id => id as string);

  try {
    await fetchAPI("/admin/roles", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        permission_ids: permissionIds,
      }),
    });
  } catch (error: any) {
    return { error: error.message || "Failed to create role" };
  }

  revalidatePath("/admin/users/roles");
  redirect("/admin/users/roles");
}

export async function createUser(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const roleIds = formData.getAll("roles").map(id => id as string);

  try {
    await fetchAPI("/admin/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        first_name,
        last_name,
        role_ids: roleIds,
      }),
    });
  } catch (error: any) {
    return { error: error.message || "Failed to create user" };
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function editUser(formData: FormData) {
  const userId = formData.get("id") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const roleIds = formData.getAll("roles").map(id => id as string);

  try {
    await fetchAPI(`/admin/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({
        username,
        email,
        first_name,
        last_name,
        role_ids: roleIds,
      }),
    });
  } catch (error: any) {
    return { error: error.message || "Failed to update user" };
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function editRole(formData: FormData) {
  const roleId = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const permissionIds = formData.getAll("permissions").map(id => id as string);

  try {
    await fetchAPI(`/admin/roles/${roleId}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        description,
        permission_ids: permissionIds,
      }),
    });
  } catch (error: any) {
    return { error: error.message || "Failed to update role" };
  }

  revalidatePath("/admin/users/roles");
  redirect("/admin/users/roles");
}
