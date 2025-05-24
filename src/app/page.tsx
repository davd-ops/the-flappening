import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ClientApp = dynamic(() => import('@/components/ClientApp'), {
  ssr: false
});

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientApp />
    </Suspense>
  );
}