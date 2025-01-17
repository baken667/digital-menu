"use client";

import { trpc } from "@/trpc/provider";
import { useSession } from "next-auth/react";

export default function DashboardClient() {
  const { data } = trpc.establishment.get.useQuery("cm5y5f4v10000dkk31ugik7ab");
  const session = useSession();

  return (
    <div>
      <div>
        <h3>ests</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>;
      </div>
      <div>
        <h3>session</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
