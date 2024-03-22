'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

function Reason() {
  const params = useSearchParams();

  const reason = params.get('reason');

  return (
    <p>
      이유:
      {reason}
    </p>
  );
}

export default function FailPage() {
  return (
    <div>
      <h1>Fail Page</h1>

      <Suspense>
        <Reason />
      </Suspense>
    </div>
  );
}
