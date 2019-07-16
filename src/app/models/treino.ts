import { Aula } from "./aula";

export class Treino {
  id?: string;
  tipo_plano: number;
  objetivos?: number[];
  status?: number;
  dias_treino?: number[];
  horarios?: number[];
  data_adesao?: string;
  data_cancelamento?: string;
  data_inicio?: string;
  data_fim?: string;
  aulas?: Aula[];
}
