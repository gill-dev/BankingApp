import { converMinorUnits, currencySmybols } from '@common/helpers';
import clsx from 'clsx';
import { FC } from 'react';
import { ISavingsGoal } from '../types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

const styles = {
  selecected: 'border-indigo-500 ring-2 ring-indigo-500/50',
  unselected: 'border-gray-200',
};

interface Props {
  savingsList: ISavingsGoal[];
  selecteddGoalUid?: string;
  
}

export const SavingsList: FC<Props> = ({ savingsList, selecteddGoalUid }) => {

  return (
    <section className="flex flex-nowrap gap-6 p-2 overflow-auto brounded-lg">
      {savingsList.map((goal) => (
        <div
          key={goal.savingsGoalUid}
          className={clsx(
            'flex justify-between items-center gap-4 p-4 self-center ',
            goal.savingsGoalUid === selecteddGoalUid ? styles.selecected : styles.unselected
          )}
        >
          <Card >
            <CardHeader>
              <CardTitle className='text-active-500'>{goal.name}</CardTitle>

            </CardHeader>
            <CardContent>
              <div className="space-x-2 text-green-100">
                <span className="mt-1 text-3xl tracking-tight font-semibold text-active-500">
                  {currencySmybols[goal.totalSaved.currency]}
                  {converMinorUnits(goal.totalSaved.minorUnits).toFixed(2)}
                </span>
                <span>/</span>
                <span className="text-lg font-medium text-gray-500">
                  {currencySmybols[goal.target.currency]}
                  {converMinorUnits(goal.target.minorUnits).toFixed(2)}
                </span>
              </div>
            </CardContent>
            <CardFooter>

            </CardFooter>
          </Card>

        </div>
      ))}


    </section>
  );
};
