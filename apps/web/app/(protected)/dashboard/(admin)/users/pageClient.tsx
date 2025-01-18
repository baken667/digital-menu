"use client";
import { useState } from "react";
import { UserRoles } from "@dmu/prisma/client";
import { trpc } from "@/trpc/provider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { messages } from "@/lib/messages";

export default function UsersPageClient() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [input, setInput] = useState('');
  const [role, setRole] = useState<UserRoles | 'all'>('all');

  const { data } = trpc.users.get.useQuery({
    page,
    limit,
    input,
    role: role === "all" ? undefined : role,
  });
  return (
    <div>
      <div className="flex gap-2">
        <Input
          className="max-w-14"
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
          type="number"
        />
        <Input
          className="max-w-14"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          type="number"
        />
        <Select value={role} onValueChange={(role: UserRoles) => setRole(role)}>
          <SelectTrigger>
            <SelectValue placeholder={role} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">{messages.common.all}</SelectItem>
              {Object.values(UserRoles).map((role) => (
                <SelectItem key={role} value={role}>
                  {messages.common[role]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          className="max-w-48"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
