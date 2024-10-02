'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/nav-bar';

export default function AddDataPage() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch('/api/get-tables')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setTables(data.tables))
      .catch((error) => console.error('Erro ao buscar tabelas:', error));
  }, []);

  const handleTableSelect = async (e) => {
    const tableId = e.target.value;
    if (!tableId) {
      setSelectedTable(null);
      setFormData({});
      return;
    }

    try {
      const res = await fetch(`/api/get-table?id=${tableId}`);
      if (!res.ok) {
        throw new Error(`Erro HTTP! status: ${res.status}`);
      }
      const data = await res.json();
      setSelectedTable(data.table);

      const initialData = {};
      data.table.columns.forEach((col) => {
        initialData[col.name] = '';
      });
      setFormData(initialData);
    } catch (error) {
      console.error('Erro ao obter a tabela selecionada:', error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/add-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableId: selectedTable.id,
          data: formData,
        }),
      });

      if (!res.ok) {
        throw new Error(`Erro HTTP! status: ${res.status}`);
      }

      alert('Dados adicionados com sucesso!');
      // Limpar o formulário após o envio
      const resetFormData = {};
      selectedTable.columns.forEach((col) => {
        resetFormData[col.name] = '';
      });
      setFormData(resetFormData);
    } catch (error) {
      console.error('Erro ao adicionar dados:', error);
      alert('Erro ao adicionar dados.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />

      <h1 className="mt-20 text-3xl font-bold text-blue-600 mb-6">Adicionar Dados</h1>

      <select
        onChange={handleTableSelect}
        className="w-full max-w-md p-3 mb-6 border border-gray-300 rounded-lg text-black"
      >
        <option value="">Selecione uma tabela</option>
        {tables.map((table) => (
          <option key={table.id} value={table.id}>
            {table.name}
          </option>
        ))}
      </select>

      {selectedTable && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{selectedTable.name}</h2>

          {selectedTable.columns.map((col) => (
            <div key={col.id} className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">{col.name}</label>
              <input
                type={col.type === 'number' ? 'number' : 'text'}
                value={formData[col.name] || ''}
                onChange={(e) => handleInputChange(col.name, e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Adicionar
          </button>
        </form>
      )}
    </div>
  );
}

