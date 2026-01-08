import axios from "axios";

import { api } from "../../api";
import { GetAllPaginated, ParamsForPagination } from "../../types";

import { OrdemDeServicoCommon } from "./types";

class OrdemDeServicoCommonService {
  async buscarTodasOrdensDeServico(
    params: ParamsForPagination,
  ): Promise<GetAllPaginated<OrdemDeServicoCommon>> {
    try {
      const response = await api.get<GetAllPaginated<OrdemDeServicoCommon>>(
        "/ordens-servico",
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

export const ordemDeServicoCommonService = new OrdemDeServicoCommonService();
