import axios, { AxiosResponse } from "axios";
import { Cliente } from "./types";
import { api } from "../api";
import { ApiResponse } from "../types";

class ClienteService {
  async criarCliente(cliente: Omit<Cliente, "id">): Promise<Cliente> {
    try {
      const response: AxiosResponse<ApiResponse<Cliente>> = await api.post(
        "/clientes",
        cliente,
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarTodosClientes(): Promise<Cliente[]> {
    try {
      const response: AxiosResponse<ApiResponse<Cliente[]>> =
        await api.get("/clientes");
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarClientePorId(id: number): Promise<Cliente> {
    try {
      const response: AxiosResponse<ApiResponse<Cliente>> = await api.get(
        `/clientes/${id}`,
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarCliente(
    id: number,
    cliente: Partial<Cliente>,
  ): Promise<Cliente> {
    try {
      const response: AxiosResponse<ApiResponse<Cliente>> = await api.put(
        `/clientes/${id}`,
        cliente,
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deletarCliente(id: number): Promise<void> {
    try {
      await api.delete(`/clientes/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async pesquisarClientes(termo: string): Promise<Cliente[]> {
    try {
      const response: AxiosResponse<ApiResponse<Cliente[]>> = await api.get(
        `/clientes/search?q=${termo}`,
      );
      return response.data.data;
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

export const clienteService = new ClienteService();
