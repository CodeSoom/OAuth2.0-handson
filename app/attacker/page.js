'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function Component() {
  const params = useSearchParams();

  return (
    <div dangerouslySetInnerHTML={{ __html: params.get('name') }} />
  );
}

export default function AttackerPage() {
  return (
    <main>
      <Suspense>
        <Component />
      </Suspense>
    </main>
  );
}
