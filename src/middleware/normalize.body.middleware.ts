import type { NextFunction, Request, Response } from "express";

const normalizeValue = (value: unknown): unknown => {
    if (typeof value === "string") {
        return value.trim();
    }

    if (Array.isArray(value)) {
        return value.map(normalizeValue);
    }

    if (value !== null && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value).map(([key, val]) => [
                key,
                normalizeValue(val)
            ])
        );
    }

    return value;
};

export const normalizeBody = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (req.body && typeof req.body === "object") {
        req.body = normalizeValue(req.body);
    }

    next();
};