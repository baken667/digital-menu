import { auth } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  } else {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }
}
