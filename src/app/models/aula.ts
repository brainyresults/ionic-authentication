import { Exercicio } from "./exercicio";
import { Atividade } from "./atividade";

export class Aula {
  id?: string;
  responsavel?: string;
  status?: string;
  semana_atual?: number;
  total_semanas?: number;
  avaliacoes?: string[];
  exercicios?: Exercicio[];
  atividades?: Atividade[];
  data_inicio?: string;
  data_fim?: string;
}
