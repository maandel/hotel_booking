"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = "http://127.0.0.1:8000/api/v1";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const res = await fetch(`${API_URL}/token/pair`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.detail || "Invalid credentials" };
    }

    const data = await res.json();

    const cookieStore = await cookies();

    // Store JWT securely as HTTP-only cookies
    cookieStore.set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    cookieStore.set("refresh_token", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

  } catch (error) {
    return { error: "Network error occurred. Please try again." };
  }

  // Redirect to dashboard on success
  redirect("/admin/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  redirect("/admin/login");
}
