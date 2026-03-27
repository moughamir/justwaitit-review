import { z } from 'zod';
console.log('z version:', (z as any).version || 'unknown');
console.log('z.email type:', typeof (z as any).email);
try {
  const s = (z as any).email();
  console.log('z.email() result type:', typeof s);
  console.log('parse valid:', s.safeParse('test@example.com').success);
  console.log('parse invalid:', s.safeParse('invalid').success);
} catch (e: any) {
  console.log('z.email() error:', e.message);
}

console.log('z.string().email type:', typeof z.string().email);
