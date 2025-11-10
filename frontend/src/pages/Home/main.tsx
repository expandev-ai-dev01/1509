import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/Button';

/**
 * @page HomePage
 * @summary Home page with welcome message and feature overview
 * @domain core
 * @type landing-page
 * @category public
 *
 * @routing
 * - Path: /
 * - Guards: None (public)
 *
 * @description
 * Landing page displaying welcome message and overview of
 * the TODO list application features.
 */
export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao TODO List</h2>
        <p className="text-xl text-gray-600 mb-8">Sistema completo de gerenciamento de tarefas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Criação de Tarefas</h3>
          <p className="text-gray-600">
            Crie tarefas com título, descrição, data de vencimento e prioridade
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Categorização</h3>
          <p className="text-gray-600">
            Organize suas tarefas em categorias e listas personalizadas
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Prioridades</h3>
          <p className="text-gray-600">
            Classifique tarefas por nível de importância (alta, média, baixa)
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Prazos</h3>
          <p className="text-gray-600">Defina datas limite para conclusão das suas tarefas</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Notificações</h3>
          <p className="text-gray-600">Receba lembretes sobre tarefas próximas do vencimento</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sincronização</h3>
          <p className="text-gray-600">Acesse suas tarefas em diferentes dispositivos</p>
        </div>
      </div>

      <div className="text-center">
        <Button variant="primary" size="lg" onClick={() => navigate('/tasks/create')}>
          Criar Nova Tarefa
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
