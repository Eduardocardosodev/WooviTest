export interface InputUpdateAccountDto {
  id: string;
  balance: number;
}

export interface OutputUpdateAccountDto {
  id: string;
  account_number: string;
  user_id: string;
  balance: number;
  user: {
    id: string;
    name: string;
    tax_id: string;
    password: string;
  };
}

export interface InputAddBalanceAccountDto {
  id: string;
  balance: number;
}

export interface OutputAddBalanceAccountDto {
  id: string;
  account_number: string;
  user_id: string;
  balance: number;
}
