"use server";

import { fetchAPI } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRoomType(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price_per_night = parseFloat(formData.get("price_per_night") as string);
  const capacity = parseInt(formData.get("capacity") as string, 10);
  const amenities = formData.get("amenities") as string;
  
  const payload = new FormData();
  payload.append("name", name);
  payload.append("description", description);
  payload.append("base_price", price_per_night.toString());
  payload.append("capacity", capacity.toString());
  if (amenities) {
    payload.append("amenity_names", amenities);
  }

  const image = formData.get("image") as File;
  if (image && image.size > 0) {
    payload.append("image", image);
  }

  try {
    await fetchAPI("/admin/room-types", {
      method: "POST",
      body: payload,
    });
  } catch (error: any) {
    return { error: error.message || "Failed to create room type" };
  }

  revalidatePath("/admin/inventory");
  redirect("/admin/inventory");
}
