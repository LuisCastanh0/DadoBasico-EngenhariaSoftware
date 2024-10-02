'use client';
import { useState, useEffect } from 'react';

export default function AddData() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch('/api/get-tables')
      .then((res) => res.json())
      .then((data) => setTables(data.tables));
  }, []);

  const handleTableSelect = async (e) => {
    const tableId = e.target.value;
    const res = await fetch(`/api/get-table?id=${tableId}`);
    const data = await res.json();
    setSelectedTable(data.table);
    // Inicializar formData
    const initialData = {};
    data.table.columns.forEach((col) => {
      initialData[col.name] = '';
    });
    setFormData(initialData);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/add-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableId: selectedTable.id,
        data: formData,
      }),
    });
    // Redirecionar ou mostrar mensagem de sucesso
  };

  return (
    <div>
      <h1>Adicionar Dados</h1>
      <select onChange={handleTableSelect}>
        <option value="">Selecione uma tabela</option>
        {tables.map((table) => (
          <option key={table.id} value={table.id}>
            {table.name}
          </option>
        ))}
      </select>
      {selectedTable && (
        <form onSubmit={handleSubmit}>
          {selectedTable.columns.map((col) => (
            <div key={col.id}>
              <label>{col.name}</label>
              <input
                type={col.type === 'number' ? 'number' : 'text'}
                value={formData[col.name]}
                onChange={(e) => handleInputChange(col.name, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="submit">Adicionar</button>
        </form>
      )}
    </div>
  );
}
