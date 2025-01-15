"use client";

import { trpc } from "@/trpc/provider";

export default function DashboardClient() {
  const { data } = trpc.establishment.get.useQuery("cm5y5f4v10000dkk31ugik7ab");

  return <div>{JSON.stringify(data, null, 2)}</div>;
}
