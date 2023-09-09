import { IonText, IonSkeletonText } from '@ionic/react';

interface Props {
  status: string;
  loading?: boolean;
}

const StatusText = ({ status, loading = false }: Props) => {
  if (loading)
    return (
      <IonSkeletonText
        animated={true}
        className='block w-1/3 ion-no-padding ion-no-margin rounded-md'
      ></IonSkeletonText>
    );

  let color = 'primary';
  if (status === 'en-route') color = 'warning';
  if (status === 'delivered') color = 'success';
  if (status === 'cancelled') color = 'danger';

  return <IonText color={color}>{status}</IonText>;
};

export default StatusText;
