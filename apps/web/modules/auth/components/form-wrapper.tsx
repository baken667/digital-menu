import Logo from "@/components/common/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Logo className="h-8 fill-primary" />
      <Card className="">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
