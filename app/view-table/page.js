'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/nav-bar';

export default function ViewTable() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('/api/get-tables')
      .then((res) => res.json())
      .then((data) => setTables(data.tables));
  }, []);

  const handleTableSelect = async (e) => {
    const tableId = e.target.value;
    const resTable = await fetch(`/api/get-table?id=${tableId}`);
    const tableDataRes = await fetch(`/api/get-table-data?tableId=${tableId}`);
    const table = await resTable.json();
    const data = await tableDataRes.json();
    setSelectedTable(table.table);
    setTableData(data.data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Visualizar Tabela</h1>

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
        <div className="w-full max-w-4xl overflow-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{selectedTable.name}</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                {selectedTable.columns.map((col) => (
                  <th key={col.id} className="px-4 py-2 border">{col.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((row) => (
                  <tr key={row.id} className="text-center">
                    {selectedTable.columns.map((col) => (
                      <td key={col.id} className="border px-4 py-2">{row.data[col.name]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={selectedTable.columns.length} className="text-center py-4">
                    Nenhum dado disponível
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
