import { auth } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    return (
      <>
        <h2>403 Forbidden</h2>
      </>
    );
  }

  return children;
}
