import { auth } from "@/auth";
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout";

export default async function DashboardLayoutRoot({
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

  return <DashboardLayout>{children}</DashboardLayout>;
}
