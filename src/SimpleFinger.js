import React,{ Component } from 'react'

export default class SimpleFinger extends Component{
  constructor(props){
    super(props)
    this.startX = this.startY = this.moveX = this.moveY = null
    this.prevPinchScale = 1
    this.longTapTimeout = null
  }

  emitEvent(eventType,e){
    if(this.props[eventType]){
      return this.props[eventType](e)
    }else{
      return
    }
  }

  getTime(){
    return new Date().getTime()
  }

  getLength(vector){
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
  }

  getRotateDirection(vector1,vector2){
    return vector1.x * vector2.y - vector2.x * vector1.y
  }

  getRotateAngle(vector1,vector2){
    let direction = this.getRotateDirection(vector1,vector2)
    direction = direction > 0 ? -1 : 1
    let mr = this.getLength(vector1) * this.getLength(vector2)
    if(mr === 0) return 0
    let dot = vector1.x * vector2.x + vector1.y * vector2.y
    let r = dot / mr
    if(r > 1){
      r = 1
    }
    if(r < -1){
      r = -1
    }
    return (direction * Math.acos(r) * 180) / Math.PI
  }

  getSwipeDirection(startX,startY,moveX,moveY){
    return Math.abs(startX - moveX) > Math.abs(startY - moveY) ?
    (startX - moveX > 0 ? 'left' : 'right') : (startY - moveY > 0 ? 'up' : 'down')
  }

  onTouchStart(e){
    let p = e.touches ? e.touches[0] : e
    this.startX = p.pageX
    this.startY = p.pageY
    window.clearTimeout(this.longTapTimeout)

    if(e.touches.length > 1){
      let p2 = e.touches[1]
      let newVector = {
        x : Math.abs(p2.pageX - this.startX),
        y : Math.abs(p2.pageY - this.startY)
      }
      this.touchLength = this.getLength(newVector)
      this.touchVector = {
        x: p2.pageX - this.startX,
        y: p2.pageY - this.startY
      }
    }else{
      this.startTime = this.getTime()
      this.longTapTimeout = setTimeout(() => {
        this.emitEvent('onLongTap')
      }, 750)
      if(this.prevTouch){
        if( Math.abs(this.startX - this.prevTouch.startX) < 10 &&
            Math.abs(this.startY - this.prevTouch.startY) < 10 &&
            Math.abs(this.startTime - this.prevTouchTime) < 350
          ){
            this.emitEvent('onDoubleTap')
          }
      }
      this.prevTouchTime = this.startTime
      this.prevTouch = {
        startX : this.startX,
        startY : this.startY
      }
    }
  }

  onTouchMove(e){
    if(e.touches.length > 1){
      let pinchVector = {
        x :  Math.abs(e.touches[0].pageX - e.touches[1].pageX),
        y :  Math.abs(e.touches[0].pageY - e.touches[1].pageY)
      }
      let _touchLength = this.getLength(pinchVector)
      if(this.touchLength){
        let pinchScale = _touchLength / this.touchLength
        this.emitEvent('onPinch', { scale : pinchScale - this.prevPinchScale})
        this.prevPinchScale = pinchScale
      }
      if(this.touchVector){
        let vector = {
          x: e.touches[1].pageX - e.touches[0].pageX,
          y: e.touches[1].pageY - e.touches[0].pageY
        }
        e.angle = this.getRotateAngle(vector,this.touchVector)
        this.emitEvent('onRotate',e)
        this.touchVector.x = vector.x
        this.touchVector.y = vector.y
      }
    }else{
      window.clearTimeout(this.longTapTimeout)
      let p = e.touches ? e.touches[0] : e
      this.startX = p.pageX
      this.startY = p.pageY
      let deltaX = this.moveX === null ? 0 : this.startX - this.moveX
      let deltaY = this.moveY === null ? 0 : this.startY - this.moveY

      this.emitEvent('onPressMove',{
        deltaX,
        deltaY
      })
      this.moveX = this.startX
      this.moveY = this.startY
    }

    e.preventDefault()
  }

  onTouchEnd(e){
    let timeTemp = this.getTime()
    window.clearTimeout(this.longTapTimeout)

    if((this.moveX && Math.abs(this.startX - this.moveX) > 20) ||
       (this.moveY && Math.abs(this.startY - this.moveY) > 20)){
         if(timeTemp - this.startTime < 500){
           e.direction = this.getSwipeDirection(this.startX,this.startY,this.moveX,this.moveY)
           this.emitEvent('onSwipe',e)
         }
    }else{
      if(timeTemp - this.startTime < 500){
        this.emitEvent('onTap')
      }
    }

    this.startX = this.startY = this.moveX = this.moveY = null
    this.prevPinchScale = 1
  }

  onTouchCancel(e){
    this.onTouchEnd()
  }

  render(){
    return React.cloneElement(React.Children.only(this.props.children),{
      onTouchStart: this.onTouchStart.bind(this),
      onTouchMove: this.onTouchMove.bind(this),
      onTouchEnd: this.onTouchEnd.bind(this),
      onTouchCancel: this.onTouchCancel.bind(this)
    })
  }
}
