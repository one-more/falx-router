// @flow

import {register, store} from 'falx'
import createHistory from 'history/createBrowserHistory'
import Route from 'route-parser'
import {curry} from "./utils";

type Entry = {
    path: string,
    queryParams: Object,
    hash: string,
    params: Object
}

const reducer = {
    state: {
        path: '',
        queryParams: {},
        hash: '',
        params: {}
    },
    actions: {
        push(prevState: Entry, nextState: Entry) {
            return nextState
        }
    }
}

const getParams = query => {
    if (!query) {
        return { };
    }

    return (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
            let [ key, value ] = param.split('=');
            params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
            return params;
        }, { });
};

function getEventPath(event: MouseEvent) {
    if (event.path) {
        return event.path;
    }
    const path = [];
    let currentElement = event.target;
    while(currentElement) {
        path.push(currentElement);
        currentElement = currentElement.parentElement;
    }
    if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
        path.push(document);
    if (path.indexOf(window) === -1)
        path.push(window);
    return path;
}

function registerLinkHandler(history) {
    document.body.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        const target = getEventPath(event)[0];
        if (target.tagName === 'A') {
            event.preventDefault();
            const href = target.getAttribute('href');
            history.push(href)
        }
    });
}

export function routeConfig(pathName: string, config: Object) {
    for (const template in config) {
        if (template === pathName) {
            return {
                params: {},
                cb: config[template]
            }
        }
        const route = new Route(template);
        const params = route.match(pathName);
        if (params) {
            return {
                params,
                cb: config[template]
            }
        }
    }
    return {
        params: {},
        cb: undefined
    }
}

const runConfiguration = curry((config: Object, location: Location) => {
    const queryParams = getParams(location.search);
    const {params, cb} = routeConfig(location.pathname, config);
    const entry = {
        path: location.pathname,
        queryParams,
        hash: location.hash,
        params,
    };
    store.router.push(entry).then(() => {
        if (typeof cb === 'function') {
            cb(entry)
        }
    })
});

export default function init(config: Object, runInitially: boolean = false) {
    register('router', reducer);

    const history = createHistory();
    registerLinkHandler(history);

    history.listen(runConfiguration(config));

    if (runInitially) {
        runConfiguration(config, location)
    }
}