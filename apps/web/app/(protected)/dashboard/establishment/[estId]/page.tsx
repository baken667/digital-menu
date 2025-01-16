interface Props {
  params: {
    estId: string;
  };
}

export default function EstablishmentPage({ params }: Props) {
  return (
    <div>
      <h3>Establishment {params.estId}</h3>
    </div>
  );
}
