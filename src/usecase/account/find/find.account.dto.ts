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

export interface OutputFindAccountDtoDb {
  accountModel: {
    id: string;
    account_number: string;
    user_id: string;
    balance: number;
  };
  userModel: {
    id: string;
    name: string;
    tax_id: string;
    password: string;
  };
}
