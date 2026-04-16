export default class AppError extends Error {
  public statusCode: number;
  public name = 'AppError';
}