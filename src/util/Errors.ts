export class HTTPError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'HTTPError';
        this.status = status;
    }
}

export class BadRequestError extends HTTPError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class UnauthorizedError extends HTTPError {
    constructor(message = "This method requires a login") {
        super(message, 401);
    }
}

export class ForbiddenError extends HTTPError {
    constructor(message = "You are not allowed to to do this") {
        super(message, 402);
    }
}

export class UnknowMethodError extends HTTPError {
    constructor(message: string) {
        super(message, 405);
    }
}

export class ConflictError extends HTTPError {
    constructor(message: string) {
        super(message, 409);
    }
}

export class ServerError extends HTTPError {
    constructor(message: string) {
        super(message, 500);
    }
}