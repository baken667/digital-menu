import EstablishmentPageClient from "./page-client";

interface Props {
  params: Promise<{
    est: string;
  }>;
}

export default async function EstablishmentPage({ params }: Props) {
  const est = (await params).est;

  return <EstablishmentPageClient estId={est} />;
}
