import axios, { AxiosResponse } from "axios";

import { api } from "../api";

import { Endereco, Estado } from "./types";

class EnderecoService {
  async buscarTodosEstados(): Promise<Estado[]> {
    try {
      const response = await api.get("/ufs");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarEnderecoPorCep(cep: string): Promise<Endereco> {
    try {
      const response: AxiosResponse<Endereco> = await api.get(
        `/endereco/${cep}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return new Error(message);
    }
    return new Error("Erro desconhecido");
  }
}

export const enderecoService = new EnderecoService();
