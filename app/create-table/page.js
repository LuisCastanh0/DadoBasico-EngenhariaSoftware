'use client';
import { useState } from 'react';
import Navbar from '../components/nav-bar';

export default function CreateTable() {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: 'text' }]);

  const addColumn = () => {
    setColumns([...columns, { name: '', type: 'text' }]);
  };

  const removeColumn = (indexToRemove) => {
    const newColumns = columns.filter((_, index) => index !== indexToRemove);
    setColumns(newColumns);
  };

  const handleColumnChange = (index, field, value) => {
    const newColumns = [...columns];
    newColumns[index][field] = value;
    setColumns(newColumns);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/create-table', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tableName, columns }),
    });
    // Redirecionar ou mostrar mensagem de sucesso
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <Navbar />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Criar Nova Tabela</h1>
        
        <input
          type="text"
          placeholder="Nome da Tabela"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black"
        />

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Definir Colunas</h2>
        {columns.map((column, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              placeholder="Nome da Coluna"
              value={column.name}
              onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
            />
            <select
              value={column.type}
              onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
              className="w-1/3 p-2 border border-gray-300 rounded-lg text-black"
            >
              <option value="text">Texto</option>
              <option value="number">Número</option>
              <option value="date">Data</option>
            </select>
            <button
              type="button"
              onClick={() => removeColumn(index)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Remover
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addColumn}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 mb-4"
        >
          Adicionar Coluna
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Criar Tabela
        </button>
      </form>
    </div>
  );
}
