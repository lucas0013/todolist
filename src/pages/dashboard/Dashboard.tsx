import { FerramentasDeDetalhe } from '../../shared/components/ferramentas-de-detalhe/ferramentasDeDetalhe';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const Dashboard = () => {

  return(
    <LayoutBaseDePagina
      titulo="Título" 
      barraDeFerramentas={(
        <FerramentasDeDetalhe />
      )}> 
      Dashboard

    </LayoutBaseDePagina>
  );
};