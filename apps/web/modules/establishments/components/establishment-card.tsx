import { Establishment } from "@dmu/prisma/client";
import Link from "next/link";
import { PenIcon } from "lucide-react";
import DeleteEstablishment from "./delete-establishment";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type EstablishmentCardProps = {
  establishment: Omit<Establishment, "address">;
};

export default function EstablishmentCard({
  establishment,
}: EstablishmentCardProps) {
  return (
    <Card>
      <CardContent className="px-6 py-4 flex flex-row justify-between">
        <div>
          <div>
            <h3 className="font-semibold text-base">{establishment.name}</h3>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">
              {establishment.slug}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <DeleteEstablishment id={establishment.id} />
          <Button asChild size="icon" variant="outline">
            <Link href={`/dashboard/establishments/${establishment.id}`}>
              <PenIcon />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
