import { BadRequestError } from "../util/Errors";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class ValidatorMonad {
    private value: any;
    constructor(v: any) {
        this.value = v;
    }

    // Required Check
    required(error: string) {
        if (this.value) return this;
        throw new BadRequestError(error);
    }

    nonRequired() {
        if (typeof this.value === "undefined") return null;
        return this;
    }

    // Type Check
    number(error: string) {
        if (typeof this.value === "number") return this;
        throw new BadRequestError(error);
    }

    string(error: string) {
        if (typeof this.value === "string") return this;
        throw new BadRequestError(error);
    }

    bool(error: string) {
        if (typeof this.value === "boolean") return this;
        throw new BadRequestError(error);
    }

    regex(ex: RegExp, error: string) {
        if (ex.test(this.value)) return this;
        throw new BadRequestError(error);
    }

    date(error: string) {
        if (new Date(this.value).toDateString() != "Invalid Date") return this;
        throw new BadRequestError(error);
    }

    email(error: string) {
        if (emailRegex.test(this.value)) return this;
        throw new BadRequestError(error);
    }

    image(error: string) {
        if (this.value.headers["content-type"].startsWith("image")) return this;
        throw new BadRequestError(error);
    }

    // Value Check
    lengthBetween(min: number, max: number, error: string) {
        if (this.value.length >= min && max >= this.value.length) return this;
        throw new BadRequestError(error);
    }

    valueBetween(min: number, max: number, error: string) {
        if (this.value >= min && max >= this.value) return this;
        throw new BadRequestError(error);
    }

    notEmpty(error: string) {
        if (this.value.trim() !== "") return this;
        throw new BadRequestError(error);
    }

    min(min: number, error: string) {
        if (this.value >= min) return this;
        throw new BadRequestError(error);
    }

    max(max: number, error: string) {
        if (max < this.value) return this;
        throw new BadRequestError(error);
    }

    fileSizeMax(byte: number, error: string) {
        if (this.value.size <= byte) return this;
        throw new BadRequestError(error);
    }
}


export const Validate = (v: any) => {
    return new ValidatorMonad(v);
} 