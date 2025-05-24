'use client';

import { generateSchemaMarkup } from '@/app/schema';

export default function SchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateSchemaMarkup() }}
    />
  );
}