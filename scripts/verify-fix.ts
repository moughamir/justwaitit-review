function isValidNextPath(next: string): boolean {
  // Ensure the path starts with exactly one '/'
  if (
    !next.startsWith('/') ||
    next.startsWith('//') ||
    next.startsWith('/\\')
  ) {
    return false;
  }
  return true;
}

const testCases = [
  { path: '/dashboard', expected: true },
  { path: '/', expected: true },
  { path: '/auth/confirm', expected: true },
  { path: 'https://evil.com', expected: false },
  { path: '//evil.com', expected: false },
  { path: 'evil.com', expected: false },
  { path: '/\\evil.com', expected: false },
  { path: '///evil.com', expected: false },
  { path: ' /dashboard', expected: false },
];

let failed = false;
for (const testCase of testCases) {
  const result = isValidNextPath(testCase.path);
  if (result !== testCase.expected) {
    console.error(
      `Test failed for "${testCase.path}": expected ${testCase.expected}, got ${result}`
    );
    failed = true;
  } else {
    console.log(`Test passed for "${testCase.path}": got ${result}`);
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log('All validation tests passed!');
}
