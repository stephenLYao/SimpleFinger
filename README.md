## SimpleFinger

### Events

- onTap
- onDoubleTap
- onLongTap
- onPressMove (e.deltaX,e.deltaY)
- onRotate (e.angle)
- onPinch (e.pinch)
- onSwipe (e.direction)

### Usage

```javascript
npm install simplefinger
```

```javascript
import SimpleFinger from 'simplefinger'

render(){
  return(
    <SimpleFinger
      onTap = {this.onTap}
      onDoubleTap = {this.onDoubleTap}
      onLongTap = {this.onLongTap}
      onPressMove = {this.onPressMove}
      onRotate = {this.onRotate}
      onPinch = {this.onPinch}
      onSwipe = {this.onSwipe}

      <div>The element that you want to bind event</div>
    />
  )
}
```
