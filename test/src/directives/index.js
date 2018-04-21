// @flow

import {Slim} from 'slim-js'

Slim.customDirective(
    function matcherFn(attribute: string) {
        return attribute.nodeName.includes('delegate')
    },
    function enterKeyResponder(source, target, attribute) {
        const [event] = attribute.nodeName.split('.');
        const handler = attribute.value;
        target.addEventListener(event, source[handler])
    }
);