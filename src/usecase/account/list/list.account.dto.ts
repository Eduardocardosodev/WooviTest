export interface InputListAccountDto {}

type Account = {
  id: string;
  account_number: string;
  balance: number;
  user_id: string;
  user: {
    name: string;
    tax_id: string;
    password: string;
  };
};

export interface OutputListAccountDto {
  id: string;
  account_number: string;
  balance: number;
  user_id: string;
  user: {
    id: string;
    name: string;
    tax_id: string;
    password: string;
  };
}
