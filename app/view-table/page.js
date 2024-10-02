'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/nav-bar';

export default function ViewTablePage() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState([]);

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
      setTableData([]);
      return;
    }

    try {
      const [resTable, resData] = await Promise.all([
        fetch(`/api/get-table?id=${tableId}`),
        fetch(`/api/get-table-data?tableId=${tableId}`),
      ]);

      if (!resTable.ok || !resData.ok) {
        throw new Error('Erro ao obter dados da tabela selecionada.');
      }

      const table = await resTable.json();
      const data = await resData.json();

      setSelectedTable(table.table);
      setTableData(data.data);
    } catch (error) {
      console.error('Erro ao obter dados da tabela:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />

      <h1 className="mt-20 text-3xl font-bold text-blue-600 mb-6">Visualizar Tabela</h1>

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
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{selectedTable.name}</h2>
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                {selectedTable.columns.map((col) => (
                  <th
                    key={col.id}
                    className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {selectedTable.columns.map((col) => (
                    <td key={col.id} className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                      {row.data[col.name]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}