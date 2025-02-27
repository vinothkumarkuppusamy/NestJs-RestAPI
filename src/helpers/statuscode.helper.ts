export function handleResponse(status: boolean, message: string, result?: any) {
  return {
    status,
    message,
    result: result ?? null,
  };
}
