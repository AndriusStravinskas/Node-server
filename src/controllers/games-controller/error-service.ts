export class NotFoundError extends Error { }

const handleError = (err: unknown): [number, ResponseError] => {
  let status = 400;
  if (err instanceof NotFoundError) status = 404;

  const message = err instanceof Error ? err.message : 'response error';

  return [status, {
    error: message,
  }];
};

const ErrorService = {
  handleError,
};

export default ErrorService;
