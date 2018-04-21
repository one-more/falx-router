import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'

@tag('x-app')
@template(require('./template.html'))
class MyTag extends Slim {
    get useShadow() { return true }
}
