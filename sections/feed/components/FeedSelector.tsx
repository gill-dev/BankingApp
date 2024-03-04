
import { DatePicker } from '@components/shared/DatePicker';
import { useAccount } from '@sections/account/hooks/useAccount';
import { useFeed } from '../hooks/useFeed';
import { useSavings, useTransferToGoalMutation } from '@sections/savings';
import { parseISO, format } from 'date-fns';
import { ReactFCWithChildren } from 'types/react';
import { useAuth } from '@sections/auth';
import { CalendarIcon } from "@radix-ui/react-icons"
import { cn } from "lib/utils"
import { Button } from "@components/ui/button"
import { Calendar } from "@components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const Profile: ReactFCWithChildren = ({ children }) => {
  const { user } = useAuth();
  const { selectedAccount } = useAccount();
  const { selectedSavings } = useSavings();
  const {
    feedState: { changesSince, roundUp },
    setFeedDateRange,
  } = useFeed();
  const [transferToGoal, { isLoading }] = useTransferToGoalMutation();

  return (
    <div className="bg-white shadow">

        <div className="py-6 lg:flex lg:items-center lg:justify-between lg:border-t lg:border-gray-200">
  
          <div className="mt-6 flex space-y-2 sm:space-y-0 flex-col sm:flex-row sm:space-x-3 md:mt-0 md:ml-4">
    
               <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !changesSince && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {changesSince ? changesSince: <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          onSelect={(value) => value && setFeedDateRange(value)}
          initialFocus
        />
      </PopoverContent>
    </Popover>

            <Button
              isLoading={isLoading}
              onClick={() =>
                selectedSavings &&
                selectedAccount &&
                transferToGoal({
                  savingsGoalUid: selectedSavings.savingsGoalUid,
                  accountUid: selectedAccount.accountUid,
                  amount: {
                    currency: selectedSavings.target.currency,
                    minorUnits: Math.ceil(roundUp * 100),
                  },
                })
              }
              disabled={!roundUp || !selectedSavings}
              ring
            >
              {roundUp && selectedSavings
                ? `Round up ${selectedAccount?.currency} ${roundUp.toFixed(2)}`
                : !selectedSavings
                ? 'Select a goal'
                : 'Nothing to round up'}
            </Button>
          </div>
        </div>

    </div>
  );
};