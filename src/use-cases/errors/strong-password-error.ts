export class StrongPasswordError extends Error {
  constructor() {
    super('Must have special characters and length of 8.')
  }
}
