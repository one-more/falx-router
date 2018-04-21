// @flow

import initRouter from '../../src/index'
import './components'
import './directives'

function insertHTML(page: string) {
    document.querySelector('x-app').innerHTML = page;
}

initRouter({
    '/pages/:pageNo': router => {
        document.title = `falx router | ${router.params.pageNo}`;
        return import(/* webpackChunkName: "pages" */ './pages/pages').then(module => {
            insertHTML(module.default)
        });
    },
    '/': () => {
        document.title = 'falx router';
        return import(/* webpackChunkName: "index-page" */ './pages/index').then(module => {
            insertHTML(module.default)
        });
    }
}, true);