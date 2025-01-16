import LogoutButton from "@/components/logout";
import DashboardClient from "./pageClient";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <div>
        <h3>Dashboard</h3>
      </div>
      <div>
        <Link href="/">Home</Link>
        <LogoutButton />
      </div>
      <DashboardClient />
    </div>
  );
}
