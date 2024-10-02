'use client';
import { useState } from 'react';

export default function CreateTable() {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: 'text' }]);

  const addColumn = () => {
    setColumns([...columns, { name: '', type: 'text' }]);
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
    <form onSubmit={handleSubmit}>
      <h1>Criar Nova Tabela</h1>
      <input
        type="text"
        placeholder="Nome da Tabela"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
        required
      />
      <h2>Definir Colunas</h2>
      {columns.map((column, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Nome da Coluna"
            value={column.name}
            onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
            required
          />
          <select
            value={column.type}
            onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
          >
            <option value="text">Texto</option>
            <option value="number">Número</option>
            <option value="date">Data</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={addColumn}>Adicionar Coluna</button>
      <button type="submit">Criar Tabela</button>
    </form>
  );
}
