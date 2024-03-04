import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import parseISO from 'date-fns/parseISO';
import { FC, forwardRef, MouseEventHandler } from 'react';
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "lib/utils"
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const DatePicker: FC<ReactDatePickerProps> = ({ value, ...props }) => {
  return (
        <ReactDatePicker
          customInput={<DateButtonInput />}
          selected={value ? parseISO(value) : null}
          selectsStart
          nextMonthButtonLabel={'>'}
          previousMonthButtonLabel={'<'}
          {...props}
        />
  );
};

interface ButtonInputProps extends React.ComponentPropsWithoutRef<'button'> {
  onClick?: MouseEventHandler<HTMLElement>;
}

export const DateButtonInput = forwardRef<HTMLButtonElement, ButtonInputProps>(({ value, onClick }, ref) => (
  <Button className="w-full" onClick={onClick} ref={ref} variant="secondary">
    {value ? format(new Date(value.toString()), 'do MMMM yyyy') : 'Choose a date'}
  </Button>
));

DateButtonInput.displayName = 'DateButtonInput';