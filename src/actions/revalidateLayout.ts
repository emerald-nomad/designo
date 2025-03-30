import { revalidatePath } from "next/cache";

export async function revalidateLayout() {
  await revalidatePath("/", "layout");
}
