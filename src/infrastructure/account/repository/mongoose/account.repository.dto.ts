export interface OutputFindAllAccountDto {
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
