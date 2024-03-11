export function parseQueryParams(query: Record<string, unknown>) {
  return {
    ...('q' in query &&
      typeof query['q'] === 'string' && {
        q: query['q'],
      }),
  };
}
