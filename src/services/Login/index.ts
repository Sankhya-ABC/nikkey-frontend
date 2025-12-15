import axios, { AxiosResponse } from "axios";

import { api } from "../api";

import { LoginRequest, LoginResponse } from "./types";

class LoginService {
  async logar(login: LoginRequest): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post(
        "/login",
        login,
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return new Error(message);
    }
    return new Error("Erro desconhecido");
  }
}

export const loginService = new LoginService();
