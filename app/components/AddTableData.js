// components/AddTableData.js

import { useState } from 'react';

function AddTableData({ tableId }) {
  const [data, setData] = useState('');
  const [message, setMessage] = useState(null);

  const addData = async () => {
    try {
      const parsedData = JSON.parse(data);

      const response = await fetch(`/api/tables/${tableId}/addData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: parsedData }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao adicionar dados.');
      }

      setMessage('Dados adicionados com sucesso!');
      setData('');
    } catch (err) {
      setMessage(`Erro: ${err.message}`);
    }
  };

  return (
    <div>
      <h3>Adicionar Dados à Tabela</h3>
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder='Insira os dados em formato JSON'
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={addData}>Adicionar Dados</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddTableData;
