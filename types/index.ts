export interface IResponseError {
  errors: [
    {
      message: string;
    }
  ];
  success: boolean;
}

export type Amount = {
  currency: string;
  minorUnits: number;
};
