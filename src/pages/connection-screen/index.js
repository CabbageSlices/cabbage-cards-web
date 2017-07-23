import connect from './context'
import { mount } from '../../rna'
import view from './view'

// similar to mount(view, context)
// export default connect(view)

export default mount(view, connect)
