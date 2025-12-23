import axios from "axios";

import { api } from "../api";
import { GetAllPaginated, ParamsForPagination } from "../types";

import { RelatorioProdutividade } from "./types";

class RelatorioProdutividadeService {
  async buscarTodosRelatoriosProdutividade(
    params: ParamsForPagination,
  ): Promise<GetAllPaginated<RelatorioProdutividade>> {
    try {
      const response = await api.get<GetAllPaginated<RelatorioProdutividade>>(
        "/relatorioProdutividades",
        {
          params,
        },
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

export const relatorioProdutividadeService =
  new RelatorioProdutividadeService();
