import axios, { AxiosResponse } from "axios";

import { api } from "../api";
import { Dominio, GetAllPaginated, ParamsForPagination } from "../types";

class ProdutoService {
  async criarProduto(produto: Omit<Dominio, "id">): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.post(
        "/produtos",
        produto,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarTodosProdutos(
    params: ParamsForPagination,
  ): Promise<GetAllPaginated<Dominio>> {
    try {
      const response = await api.get<GetAllPaginated<Dominio>>("/produtos", {
        params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarProdutoPorId(id: number): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.get(`/produtos/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarProduto(produto: Partial<Dominio>): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.put(
        `/produtos/${produto?.id}`,
        produto,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarStatusProduto(id: number): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.patch(
        `/produtos/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deletarProduto(id: number): Promise<void> {
    try {
      await api.delete(`/produtos/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async pesquisarProdutos(termo: string): Promise<Dominio[]> {
    try {
      const response: AxiosResponse<Dominio[]> = await api.get(
        `/produtos/search?q=${termo}`,
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

export const produtoService = new ProdutoService();
