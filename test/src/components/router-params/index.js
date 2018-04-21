import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'
import {store} from 'falx'

@tag('router-params')
@template(require('./template.html'))
class MyTag extends Slim {
    get params() {
        return JSON.stringify(store.router.router, null, 4)
    }

    showMessage() {
        alert(1)
    }
}