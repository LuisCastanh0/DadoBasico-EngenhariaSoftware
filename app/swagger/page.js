// app/swagger/page.js
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'swagger-ui-react/swagger-ui.css'; // Import do CSS do Swagger UI
import './swagger.css'; // Import do CSS personalizado, se necessário

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function SwaggerPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    async function fetchSpec() {
      try {
        const res = await fetch('/api/swagger');
        if (!res.ok) {
          throw new Error(`Erro ao obter a especificação: ${res.statusText}`);
        }
        const json = await res.json();
        setSpec(json);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSpec();
  }, []);

  if (!spec) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="swagger-ui-wrapper">
      <SwaggerUI spec={spec} />
    </div>
  );
}
