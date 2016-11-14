import React,{ Component } from 'react'
import ClassNames from 'classnames'
import SimpleFinger from '../src/SimpleFinger'
import './app.css'

export default class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      pinch: 1,
      angle: 0,
      left: 0,
      top: 0,
      animating: false
    }
    this.pinch = 1
    this.left = 0
    this.top = 0
    this.angle = 0
    this.doubleTapped = false
    this.onPinch = this.onPinch.bind(this)
    this.onRotate = this.onRotate.bind(this)
    this.onPressMove = this.onPressMove.bind(this)
    this.onDoubleTap = this.onDoubleTap.bind(this)
    this.onLongTap = this.onLongTap.bind(this)
  }

  onPinch(e){
    this.pinch += e.scale
    this.setState({
      pinch : this.pinch
    })
  }

  onRotate(e){
    this.angle += e.angle
    this.setState({
      angle : this.angle
    })
  }

  onPressMove(e){
    this.left += e.deltaX
    this.top += e.deltaY
    this.setState({
      left: this.left,
      top: this.top
    })
  }

  onDoubleTap(e){
    if(this.doubleTapped){
      this.pinch = 1
      this.setState({
        pinch: this.pinch
      })
    }else{
      this.pinch = 2.5
      this.setState({
        pinch : this.pinch
      })
    }
    this.doubleTapped = !this.doubleTapped
  }

  onLongTap(e){
    alert('Long Tap')
    this.setState({
      animating : true
    })
    setTimeout(() => {
      this.setState({
        animating : false
      })
    },1000)
  }
  render(){
    const { pinch,angle,left,top,animating } = this.state
    const imgStyle = {
      transform: `scale(${pinch}) rotateZ(${angle}deg)`,
      WebkitTransform: `scale(${pinch}) rotateZ(${angle}deg)`,
      left: `${left}px`,
      top: `${top}px`
    }
    const imgName = ClassNames('flash','lena',{ animated: animating})

    return (
      <div>
        <SimpleFinger onPinch={this.onPinch} onRotate={this.onRotate} onPressMove={this.onPressMove} onDoubleTap={this.onDoubleTap} onLongTap={this.onLongTap}>
          <div className="wrapper">
            <img className={imgName} style={imgStyle} src="http://7xl0rs.com1.z0.glb.clouddn.com/avatar.png"></img>
          </div>
        </SimpleFinger>
        <div className="appear">
          <label>Pinch</label> <span>{pinch}</span><br/>
          <label>Rotate</label> <span>{angle}</span>
        </div>
      </div>
    )
  }
}
