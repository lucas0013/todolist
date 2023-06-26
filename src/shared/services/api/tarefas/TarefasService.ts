import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface IListagemTarefa {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
  tagId: number;
}

interface IDetalheTarefa {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
  tagId: number;
}

type TTarefasPaginadas = {
  totalResults: number;
  currentPage: number;
  pageSize: number;
  itemsList: IListagemTarefa[];
}

const getAll = async (page = 1,  filter = ''): Promise<TTarefasPaginadas | Error> => {
  try {
    const urlRelativa = `/Tarefas?busca=${filter}&page=${page}&pageSize=${Environment.LIMITE_DE_LINHAS}`;	

    const { data } = await Api.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao buscar tarefas');

  } catch(error) {
    console.log(error);
    return new Error((error as { message: string }).message || 'Erro ao buscar tarefas');
  }
};

const getById = async (id: number): Promise<IListagemTarefa | Error> => {
  try {
    const urlRelativa = `/Tarefas/${id}`;	

    const { data } = await Api.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao buscar tarefa');

  } catch(error) {
    console.log(error);
    return new Error((error as { message: string }).message || 'Erro ao buscar tarefa');
  }
};

const create = async (tarefa: IDetalheTarefa): Promise<any> => {
  try {
    const urlRelativa = '/Tarefas';	

    await Api.post(urlRelativa, tarefa);

    return new Error('Erro ao criar tarefa');

  } catch(error) {
    console.log(error);
    return new Error((error as { message: string }).message || 'Erro ao criar tarefa');
  }
};

const updateById = async (tarefa: IDetalheTarefa): Promise<any> => {
  try {
    const urlRelativa = '/Tarefas';	

    await Api.put(urlRelativa, tarefa);

    return new Error('Erro ao atualizar tarefa');

  } catch(error) {
    console.log(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar tarefa');
  }
};

const deleteById = async (id: number): Promise<any> => {
  try {
    const urlRelativa = `/Tarefas/${id}`;	

    await Api.delete(urlRelativa);

    return new Error('Erro ao deletar tarefa');

  } catch(error) {
    console.log(error);
    return new Error((error as { message: string }).message || 'Erro ao deletar tarefa');
  }
};

export const TarefasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};