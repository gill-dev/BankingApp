import { Amount } from 'types';

export interface ISavingsGoal {
  savingsGoalUid: string;
  name: string;
  target: Amount;
  totalSaved: Amount;
  savedPercentage: number;
}

export interface IPutSavingsGoalRequest {
  accountUid: string;
  name: string;
  target: Amount;
  currency: 'GBP' | 'EUR';
}

export interface IPutSavingsGoalResponse {
  savingsGoalUid: string;
  error: {
    message: string;
  };
  success: boolean;
}

export interface ISavingsGoalTransferRequest {
  accountUid: string;
  savingsGoalUid: string;
  amount: Amount;
}

export interface ISavingsGoalTransferResponse {
  transferUid: string;
  success: boolean;
}
