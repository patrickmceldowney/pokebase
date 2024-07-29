import { Formatters } from '@/types/table';

export const formatters: Record<
  Formatters,
  (value: string) => string | number
> = {
  date: (value) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return formattedDate;
  },
  price: (value) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return 'Invalid price';
    }

    return `$${numericValue.toFixed(2)}`;
  },
};
