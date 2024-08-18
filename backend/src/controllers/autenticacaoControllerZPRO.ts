import axios from 'axios';

interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  status: number;
  data: any;
}

export async function autenticar(req: { body: AuthRequest }, res: any): Promise<void> {
  const API_URL = `${process.env.USUARIO_API}`;
  const API_PASSWORD = `${process.env.SENHA_API}`;

  const requestData = {
    username: API_URL,
    password: API_PASSWORD,
  };

  try {
    const response = await axios.post<AuthResponse>(API_URL, requestData);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro na autenticação" });
  }
}
