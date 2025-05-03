'use client';

import React, { Suspense } from 'react';
import CallbackContent from './callbackContent';

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>로그인 처리 중…</div>}>
      <CallbackContent />
    </Suspense>
  );
}
