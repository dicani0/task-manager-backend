import { NextFunction, Response, Request } from "express";

class CustomApiError extends Error {
    constructor(message: string) {
        super(message);
    }
}

const notFoundMiddleware = (req: Request, res: Response) => {
    return res.status(404).json({ message: "page not found", success: false });
};

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const defaultError = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went wrong',
    };

    if (err instanceof CustomApiError) {
        return res
            .status(defaultError.statusCode)
            .json({message: defaultError.message, success: false});
    }

    if (err.name === 'ValidationError') {
        defaultError.statusCode = 500;
        defaultError.message = Object.values(err.errors)
            .map((item: {message: string }) => item?.message)
            .join(', ');
    }

    if (err.name === 'CastError') {
        defaultError.statusCode = 400;
        defaultError.message = `Invalid ${err.path}: ${err.value}`;
    }

    if (err.code && err.code === 11000) {
        defaultError.statusCode = 400;
        defaultError.message = `Duplicate value entered for ${Object.keys(err.keyValue)}`;
    }

    res
        .status(defaultError.statusCode)
        .json({message: defaultError.message, success: false});
}

export {errorHandlerMiddleware, notFoundMiddleware};