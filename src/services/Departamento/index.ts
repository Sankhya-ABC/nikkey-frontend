import axios, { AxiosResponse } from "axios";

import { api } from "../api";
import { Dominio, GetAllPaginated, ParamsForPagination } from "../types";

class DepartamentoService {
  async criarDepartamento(departamento: Omit<Dominio, "id">): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.post(
        "/departamentos",
        departamento,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarTodosDepartamentos(
    params: ParamsForPagination,
  ): Promise<GetAllPaginated<Dominio>> {
    try {
      const response = await api.get<GetAllPaginated<Dominio>>(
        "/departamentos",
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarDepartamentos(): Promise<Dominio[]> {
    try {
      const response = await api.get<Dominio[]>("/departamentos/select");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarDepartamentoPorId(id: number): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.get(
        `/departamentos/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarDepartamento(
    departamento: Partial<Dominio>,
  ): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.put(
        `/departamentos/${departamento?.id}`,
        departamento,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarStatusDepartamento(id: number): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.patch(
        `/departamentos/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deletarDepartamento(id: number): Promise<void> {
    try {
      await api.delete(`/departamentos/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async pesquisarDepartamentos(termo: string): Promise<Dominio[]> {
    try {
      const response: AxiosResponse<Dominio[]> = await api.get(
        `/departamentos/search?q=${termo}`,
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

export const departamentoService = new DepartamentoService();
