import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { IListagemTarefa, TarefasService } from '../../shared/services/api/tarefas/TarefasService';
import { useDebounce } from '../../shared/hooks';
import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { Environment } from '../../shared/environment';


export const ListagemDeTarefa: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(300, false);

  const [rows, setRows] = useState<IListagemTarefa[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return searchParams.get('pagina') || '1';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    
    debounce(() => {
      TarefasService.getAll(Number(pagina), busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            return;
          } else {
            console.log(result);

            setTotalCount(result.totalResults);
            setRows(result.itemsList);
          }
        });
    });
  }, [busca, pagina]);


  return(
    <LayoutBaseDePagina 
      titulo="Listagem de tarefas"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo='Nova'
          aoMudarTextDeBusca={texto => setSearchParams({ busca: texto , pagina: '1'}, {replace: true})}
        />
      }>
    
      <TableContainer component={Paper} variant="outlined" sx={{ m:1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell></TableCell>
                <TableCell>{row.titulo}</TableCell>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>{row.concluida ? 'Concluída' : 'Em andamento'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}


          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <LinearProgress variant='indeterminate'/>
                </TableCell>
              </TableRow>
            )}

            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Pagination
                    page={Number(pagina)}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}


          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};