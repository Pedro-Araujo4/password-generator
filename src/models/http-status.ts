export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_ERROR = 500
}

// No controller:
//return res.status(HttpStatus.BAD_REQUEST).json({ ... });