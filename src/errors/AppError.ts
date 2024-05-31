class AppError extends Error {
  readonly statusCode: number
  
  constructor(message: string, statusCode: number = 400) {
    super(message)
    this.statusCode = statusCode
  }
}

export default AppError