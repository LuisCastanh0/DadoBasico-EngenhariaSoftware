// components/ViewTable.js

import { useState } from 'react';

function ViewTable({ tableId }) {
  const [table, setTable] = useState(null);
  const [error, setError] = useState(null);

  const fetchTable = async () => {
    try {
      const response = await fetch(`/api/tables/${tableId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao buscar a tabela.');
      }

      setTable(result.table);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTable(null);
    }
  };

  return (
    <div>
      <button onClick={fetchTable}>Visualizar Tabela</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {table && (
        <div>
          <h2>{table.name}</h2>
          <h3>Colunas:</h3>
          <ul>
            {table.columns.map((col) => (
              <li key={col.id}>
                {col.name} - {col.type}
              </li>
            ))}
          </ul>

          <h3>Dados:</h3>
          <ul>
            {table.tableData.map((row) => (
              <li key={row.id}>{JSON.stringify(row.data)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ViewTable;
