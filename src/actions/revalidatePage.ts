import { revalidatePath } from "next/cache";

export async function revalidatePage(slug: string) {
  await revalidatePath(slug);
}
