import path from 'object-path'
import {connect} from 'react-redux'
import uuid from 'uuid/v1'

import { receive } from '../messaging'
import map from '../utils/object-map'
import hasValue from '../utils/has-value'

import self from './self'

export const Context = arr => {
	const namespace = uuid()
	
	const createdContext = {
		self: namespace,
		stateToPropsMap: {},
		actions: {}
	}

	for(let i = 0; i < arr.length; ++i)
		arr[i](createdContext)

	const mapStateToProps = (state, ownProps) =>
		map(func => func(state, ownProps, createdContext), createdContext.stateToPropsMap)

	const mapDispatchToProps = (dispatch) => createdContext.actions
	return connect(mapStateToProps, mapDispatchToProps)
}

export const namespace = name => context => {
	context.self = name
}

export const selector = (name, func) => context => {
	context.stateToPropsMap[name] = func
}

export const variable = (name, defaultVal) => context => {
	const _self = {...self, self: context.self}
	
	const selector = (_state, props) => { 
		const stored = _self.get(name)
		
		if(stored === undefined && defaultVal !== undefined)
			_self.update(name, defaultVal)

		 return stored || _self.get(name)
	}
	const setter = (data) => _self.update(name, hasValue(data.target) ? data.target.value : data)

	const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
	context.stateToPropsMap[name] = selector
	context.actions[`set${capitalizedName}`] = setter
}

export const action = (name, func) => context => {
	context.actions[name] = (data, ...args) => func(data, {...self, self: context.self})
}

export const on = (eventName, func) => context => {
	receive(eventName, (data) => func(data, {...self, self: context.self}))
}

export const mount = (view, context) => context(view)