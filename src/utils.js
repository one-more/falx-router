// @flow

export function curry(fn: Function) {
    return (...args: Array<any>) => {
        if (args.length < fn.length) {
            return fn.bind(null, ...args)
        }
        return fn(...args)
    }
}