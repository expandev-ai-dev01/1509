/**
 * @page TaskCreatePage
 * @summary Task creation page with full form and quick input
 * @domain task
 * @type form-page
 * @category task-management
 *
 * @routing
 * - Path: /tasks/create
 * - Guards: Authentication required
 *
 * @description
 * Page for creating new tasks. Provides both full form with all fields
 * and quick input for rapid task creation. Includes keyboard shortcuts
 * for improved productivity.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskForm } from '@/domain/task/components/TaskForm';
import { QuickTaskInput } from '@/domain/task/components/QuickTaskInput';
import { Button } from '@/core/components/Button';

export const TaskCreatePage = () => {
  const navigate = useNavigate();
  const [showFullForm, setShowFullForm] = useState(false);

  const handleSuccess = (taskId: string) => {
    alert(`Tarefa criada com sucesso! ID: ${taskId}`);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Nova Tarefa</h1>
        <p className="text-gray-600">
          Crie uma tarefa rapidamente ou use o formulário completo para mais opções
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Criação Rápida</h2>
        <QuickTaskInput onSuccess={handleSuccess} />
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowFullForm(!showFullForm)}
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            {showFullForm ? 'Ocultar formulário completo' : 'Usar formulário completo'}
          </button>
        </div>
      </div>

      {showFullForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Formulário Completo</h2>
          <TaskForm onSuccess={handleSuccess} onCancel={() => navigate('/')} />
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Atalhos de Teclado</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            <kbd className="px-2 py-1 bg-white rounded border border-blue-300">Enter</kbd> - Criar
            tarefa rápida
          </li>
          <li>
            <kbd className="px-2 py-1 bg-white rounded border border-blue-300">Ctrl+Enter</kbd> -
            Salvar formulário completo
          </li>
        </ul>
      </div>

      <div className="flex justify-center">
        <Button variant="secondary" onClick={() => navigate('/')}>
          Voltar para Home
        </Button>
      </div>
    </div>
  );
};

export default TaskCreatePage;
