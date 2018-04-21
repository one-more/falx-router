# falx-router
router lib using [falx](https://github.com/one-more/falx) to store params

## installation
````
npm i falx-router
````

## usage
````es6
import createRouter from 'falx-router'

const routerConfig = {
    '/page/:pageNo': /* on route callback fn */ console.log
}
const startOnInit = true;
createRouter(routerConfig, startOnInit);

// router params will be accessible via store.router
````

falx-router use [history](https://www.npmjs.com/package/history) to work
with HTML5 history API and 
[route-parser](https://www.npmjs.com/package/route-parser) to
parse config routes
