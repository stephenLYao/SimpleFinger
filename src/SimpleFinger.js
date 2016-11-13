import React,{ Component } from 'react'

export default class SimpleFinger extends Component{
  constructor(props){
    super(props)
  }

  emitEvent(eventType,e){
    if(this.props[eventType]){
      return this.props[eventType](e)
    }else{
      return
    }
  }

  getLength()
}
