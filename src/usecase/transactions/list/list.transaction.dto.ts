export interface InputListTransactionDto {}

type Transaction = {
  id: string;
  sender: string;
  receiver: string;
  value: number;
};

export interface OutputListTransactionDto {
  transactions: Transaction[];
}
