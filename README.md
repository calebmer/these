# these
A fun experiment on multiple inheritance in JavaScript.

I will be writing a blog post soon on how to use this, for now salivate on the following:

```javascript
import these from 'these';

class Movable {
  move() { /* ... */ }
}

class Solid {
  collide() { /* ... */ }
}

class Visible {
  render() { /* ... */ }
}

class Human extends these (Movable, Solid, Visible) {
  collide() {
    super.collide();
    console.log('ouch!');
  }
}

class Building extends these (Solid, Visible) {
  render() {
    super.render();
    this.size = 'big';
  }
}

class Cloud extends these (Movable, Visible) {
  move() {
    super.move();
    this.startRaining();
  }
}
```
