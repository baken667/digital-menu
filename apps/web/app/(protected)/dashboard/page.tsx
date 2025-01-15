import LogoutButton from "@/components/logout";
import DashboardClient from "./pageClient";

export default function Dashboard() {
  return (
    <div>
      <div>
        <h3>Dashboard</h3>
      </div>
      <div>
        <LogoutButton />
      </div>
      <DashboardClient />
    </div>
  );
}
