export interface InputFindTransactionDto {
  id: string;
}

export interface OutputFindTransactionDto {
  id: string;
  sender: string;
  receiver: string;
  value: number;
}
