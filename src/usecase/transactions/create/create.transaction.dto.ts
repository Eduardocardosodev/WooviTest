export interface InputCreateTransactionDto {
  sender: string;
  receiver: string;
  value: number;
}

export interface OutputCreateTransactionDto {
  id: string;
  sender: string;
  receiver: string;
  value: number;
}
