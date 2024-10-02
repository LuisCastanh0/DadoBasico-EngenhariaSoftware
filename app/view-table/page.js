'use client';
import { useState, useEffect } from 'react';

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
    <div>
      <h1>Visualizar Tabela</h1>
      <select onChange={handleTableSelect}>
        <option value="">Selecione uma tabela</option>
        {tables.map((table) => (
          <option key={table.id} value={table.id}>
            {table.name}
          </option>
        ))}
      </select>
      {selectedTable && (
        <table>
          <thead>
            <tr>
              {selectedTable.columns.map((col) => (
                <th key={col.id}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                {selectedTable.columns.map((col) => (
                  <td key={col.id}>{row.data[col.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
