export interface InputCreateAccountDto {
  balance: number;
  user: {
    name: string;
    tax_id: string;
    password: string;
  };
}

export interface OutputCreateAccountDto {
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
