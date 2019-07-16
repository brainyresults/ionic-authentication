export class User {
  id?: string;
  nome: string;
  email: string;
  password: string;
  tipo_user: number;
  cidade?: string;
  data_nascimento?: string;
  sexo: number;
  se_ativo?: boolean;
}

export class UserLogin {
  email: string;
  password: string;
}

