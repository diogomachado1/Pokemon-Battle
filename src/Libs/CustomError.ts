export default class CustomError extends Error {
  code: number;

  constructor(errorMensage: string, code: number) {
    super();

    this.name = 'CustomError';
    this.message = errorMensage;
    this.code = code;
  }
}
