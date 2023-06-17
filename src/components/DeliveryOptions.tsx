import { NAIRA } from '../constants/unicode';

const DeliveryOptions = () => {
  return (
    <ul className='pt-5'>
      {[...Array(3)].map((_, i) => {
        return (
          <li key={i}>
            <div className='flex justify-between items-stretch mb-5 p-3 bg-[var(--ion-color-light)] rounded-lg'>
              <div className='flex gap-3'>
                <div className='h-12 w-12 rounded-lg bg-gray-200'></div>
                <div className='flex flex-col'>
                  <h5>Public transport</h5>
                  <span className='text-[var(--ion-color-medium)]'>
                    Within 1 day
                  </span>
                </div>
              </div>
              <span className='font-medium'>{NAIRA} 1,500</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DeliveryOptions;
