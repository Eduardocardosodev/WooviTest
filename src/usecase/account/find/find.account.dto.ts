export interface InputFindAccountDto {
  id: string;
}

export interface OutputFindAccountDto {
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
