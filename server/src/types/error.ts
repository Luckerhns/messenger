export class AppError extends Error {
  public statusCode: number;
  public isCustom: boolean = true;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype); // Restore prototype chain for instanceof
  }
}
