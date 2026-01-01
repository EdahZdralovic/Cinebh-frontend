import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { LongRedWhiteButton } from '../buttons/LongRedWhiteButton.tsx';
import axiosInstance from '../../services/axiosInstance.tsx';

const stripeInputOptions = {
  style: {
    base: {
      fontSize: '18px',
      color: '#1f2937',
      width: '100%',
      fontFamily: 'inherit',
      '::placeholder': {
        color: '#9ca3af',
      },
    },
    invalid: {
      color: '#dc2626',
    },
  },
};

interface AddNewCardComponentProps {
  bookingId: number;
  totalPrice?: number;
}
export function AddNewCardComponent({
  bookingId,
  totalPrice = 0,
}: AddNewCardComponentProps) {
  const elements = useElements();
  const stripe = useStripe();

  async function handlePayment() {
    if (!stripe || !elements) {
      console.log('Stripe not ready');
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/payments/intent/${bookingId}`
      );

      const clientSecret = response.data.clientSecret;
      const cardElement = elements.getElement(CardNumberElement);

      if (!cardElement) {
        throw new Error('Card element not found');
      }
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        console.error('Payment failed:', result.error.message);
        // ui eror treba
        return;
      }

      if (result.paymentIntent?.status === 'succeeded') {
        console.log('Payment succeeded 🎉');
        //redirect neki
      }
    } catch (err) {
      console.error('Payment error:', err);
    }
  }

  return (
    <section className="grid grid-cols-2 gap-4 w-full">
      <span className="font-bold text-xl text-gray-500 col-span-2">
        Add New Card
      </span>

      <div className="col-span-2 w-full">
        <div className="flex flex-col w-full">
          <span className="text-lg">Card Number</span>
          <div className="h-12 w-full border rounded px-3 flex items-center">
            <div className="w-full">
              <CardNumberElement options={stripeInputOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <span className="text-lg">Expiry Date</span>
        <div className="h-12 w-full rounded-lg px-4 border border-gray-300 flex items-center focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
          <div className="w-full">
            <CardExpiryElement options={stripeInputOptions} />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <span className="text-lg">CVV</span>
        <div className="h-12 w-full rounded-lg px-4 border border-gray-300 flex items-center focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
          <div className="w-full">
            <CardCvcElement options={stripeInputOptions} />
          </div>
        </div>
      </div>

      <div className={' col-span-2 mt-6'}>
        <LongRedWhiteButton
          text={'Make Payment - ' + totalPrice + ' KM'}
          onClick={handlePayment}
        />
      </div>
    </section>
  );
}
