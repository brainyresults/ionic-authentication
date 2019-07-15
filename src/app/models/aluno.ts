import { Treino } from "./treino";

export class Aluno {
  id?: string;
  userId: string;
  peso?: number;
  altura?: number;
  data_pagamento?: string;
  data_cancelamento?: string;
   treinos?: Treino[];
}
