import axios, { AxiosResponse } from "axios";

import { api } from "../api";
import { ParamsForPagination, GetAllPaginated } from "../types";

import { Usuario } from "./types";

class UsuarioService {
  async criarUsuario(usuario: Omit<Usuario, "id">): Promise<Usuario> {
    try {
      const response: AxiosResponse<Usuario> = await api.post(
        "/usuarios",
        usuario,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarTodosUsuarios(
    params: ParamsForPagination,
  ): Promise<GetAllPaginated<Usuario>> {
    try {
      const response = await api.get<GetAllPaginated<Usuario>>("/usuarios", {
        params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarUsuarioPorId(id: number): Promise<Usuario> {
    try {
      const response: AxiosResponse<Usuario> = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarUsuario(
    id: number,
    usuario: Partial<Usuario>,
  ): Promise<Usuario> {
    try {
      const response: AxiosResponse<Usuario> = await api.put(
        `/usuarios/${id}`,
        usuario,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deletarUsuario(id: number): Promise<void> {
    try {
      await api.delete(`/usuarios/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async pesquisarUsuarios(termo: string): Promise<Usuario[]> {
    try {
      const response: AxiosResponse<Usuario[]> = await api.get(
        `/usuarios/search?q=${termo}`,
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

export const usuarioService = new UsuarioService();
