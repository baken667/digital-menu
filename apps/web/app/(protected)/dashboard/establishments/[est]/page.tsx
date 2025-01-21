interface Props {
  params: Promise<{
    est: string;
  }>;
}

export default async function EstablishmentPage({ params }: Props) {
  const est = (await params).est;

  return (
    <div>
      <h3>Establishment {est}</h3>
    </div>
  );
}
