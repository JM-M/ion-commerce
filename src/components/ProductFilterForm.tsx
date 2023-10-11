import { useEffect } from 'react';
import { IonLabel, IonCheckbox } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object, number, string, boolean } from 'yup';
import PageLoader from './PageLoader';
import Button from './Button';
import { NAIRA } from '../constants/unicode';
import Input from './Input';
import ErrorText from './ErrorText';

type Range = { max: number; min: number };

interface Props {
  filter: { price: Range; discounted: boolean };
  setFilter: Function;
  minPrice: number;
  maxPrice: number;
  close: Function;
  category: string;
}

const ProductFilterForm: React.FC<Props> = ({
  filter,
  setFilter,
  minPrice = 0,
  maxPrice = 0,
  close = () => null,
  category = '/',
}) => {
  const schema = object({
    price: object({
      min: number()
        .required('Minimum price is required')
        .min(minPrice, `Minimum price cannot be less than ${minPrice}`)
        .max(maxPrice, `Maximum price cannot be more than ${maxPrice}`),
      max: number()
        .required('Maximum price is required')
        .min(minPrice, `Minimum price cannot be less than ${minPrice}`)
        .max(maxPrice, `Maximum price cannot be more than ${maxPrice}`),
    }),
    discounted: boolean(),
  });

  type FilterType = InferType<typeof schema>;

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      price: { min: filter?.price?.min, max: filter?.price?.max },
      discounted: filter?.discounted,
    },
  });

  const submit = (values: FilterType) => {
    const { price, discounted } = values;
    const { min, max } = price || {};
    setFilter({ price: { min, max }, discounted });
    close();
  };

  if (isNaN(minPrice) || isNaN(maxPrice)) return <PageLoader />;

  const priceErrorText =
    errors.price?.min?.message || errors.price?.min?.message;

  return (
    <form className='px-5 mt-auto' onSubmit={handleSubmit(submit)}>
      <div className='my-5'>
        <IonLabel className='font-medium'>
          Price range ({minPrice} - {maxPrice})
        </IonLabel>
        <div className='flex justify-between items-center -ml-4 text-gray-500'>
          <Input
            type='number'
            {...register('price.min')}
            label={NAIRA}
            placeholder='min'
          />
          <span className='inline-block pr-7'>to</span>
          <Input
            type='number'
            {...register('price.max')}
            label={NAIRA}
            placeholder='max'
          />
        </div>
        <ErrorText text={priceErrorText} className='ml-0' />
      </div>
      <div className='my-5'>
        <Controller
          name='discounted'
          control={control}
          render={({ field }) => {
            return (
              <IonCheckbox
                justify='start'
                checked={field.value}
                onIonChange={(e) => {
                  setValue(field.name, e.detail.checked);
                }}
              >
                <span className='font-medium'>Show only disounted product</span>
                s
              </IonCheckbox>
            );
          }}
        />
      </div>
      <Button type='submit' className='block h-10 mt-5'>
        Apply
      </Button>
    </form>
  );
};

export default ProductFilterForm;
