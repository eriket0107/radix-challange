export class EmptyFieldError extends Error {
  constructor() {
    super('Has some empty field.')
  }
}
