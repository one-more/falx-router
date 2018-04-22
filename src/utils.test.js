import {curry} from './utils'

describe('utils', () => {
    it('curry', () => {
        const fn = curry((a,b,c,) => a + b + c);
        const curried1 = fn(1);
        const curried2 = curried1(2);
        const result = curried2(3);
        expect(typeof curried1).toEqual('function');
        expect(typeof curried2).toEqual('function');
        expect(result).toEqual(6);
        expect(fn(1)(2)(3)).toEqual(6);
        expect(fn(1,2)(3)).toEqual(6);
        expect(fn(1,2,3)).toEqual(6)
    })
});