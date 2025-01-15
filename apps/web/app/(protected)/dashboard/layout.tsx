import { auth } from "@/auth";
import AdminLayout from "@/components/layouts/admin/admin-layout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return (
      <>
        <h2>403 Forbidden</h2>
      </>
    );
  }

  if (session.user.role !== "owner") {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return (
    <div>
      <h3>Dashboard Layout</h3>
      {children}
    </div>
  );
}
