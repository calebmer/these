// @see: https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem

import Assert from 'assert';
import these, {instanceOf} from './lib';

class Animal {
  static evolve() { return 1; }
  isAnimal = true
  constructor() {

    if (this.a === 1) {
      this.a = 2;
    } else {
      this.a = 1;
    }
  }
  speak() { return 5; }
}

class Mammal extends Animal {
  static evolve() { return super.evolve() + 1; }
  isMammal = true
  constructor() {

    super();
    this.b = 2;
  }
  speak() { return super.speak() + 2; }
}

class WingedAnimal extends Animal {
  static evolve() { return super.evolve() + 2; }
  hasWings = true
  constructor() {

    super();
    this.c = 3;
  }
  speak() { return super.speak() + 1; }
}

class Bat extends these (Mammal, WingedAnimal) {
  static evolve() { return super.evolve() + 1; }
  isBat = true
  constructor() {

    super();
    this.d = 4;
  }
}

describe('these', () => {

  it('correctly inherits static methods', () => {

    Assert.equal(Animal.evolve(), 1);
    Assert.equal(Mammal.evolve(), 2);
    Assert.equal(WingedAnimal.evolve(), 3);
    Assert.equal(Bat.evolve(), 4);
  });

  it('correctly inherits prototype methods', () => {

    Assert.equal(new Animal().speak(), 5);
    Assert.equal(new Mammal().speak(), 7);
    Assert.equal(new WingedAnimal().speak(), 6);
    Assert.equal(new Bat().speak(), 6);
  });

  it('has the correct properties', () => {

    let bat = new Bat();

    Assert(bat.isAnimal);
    Assert(bat.isMammal);
    Assert(bat.hasWings);
    Assert(bat.isBat);
  });

  it('runs all the constructors', () => {

    let bat = new Bat();

    Assert.equal(bat.a, 1);
    Assert.equal(bat.b, 2);
    Assert.equal(bat.c, 3);
    Assert.equal(bat.d, 4);
  });
});

describe('instanceOf', () => {

  it('will correctly evaluate', () => {

    let bat = new Bat();

    Assert(instanceOf(bat, Animal));
    Assert(instanceOf(bat, Mammal));
    Assert(instanceOf(bat, WingedAnimal));
    Assert(instanceOf(bat, Bat));
    Assert(!instanceOf(bat, Promise));

    let animal = new Animal();

    Assert(instanceOf(animal, Animal));
    Assert(!instanceOf(animal, Mammal));
    Assert(!instanceOf(animal, WingedAnimal));
    Assert(!instanceOf(animal, Bat));
    Assert(!instanceOf(bat, Promise));

    let winged = new WingedAnimal();

    Assert(instanceOf(winged, Animal));
    Assert(!instanceOf(winged, Mammal));
    Assert(instanceOf(winged, WingedAnimal));
    Assert(!instanceOf(winged, Bat));
    Assert(!instanceOf(bat, Promise));
  });

  it('works when bound', () => {

    let bat = new Bat();

    Assert(bat::instanceOf(Animal));
    Assert(bat::instanceOf(Mammal));
    Assert(bat::instanceOf(WingedAnimal));
    Assert(bat::instanceOf(Bat));
    Assert(!bat::instanceOf(Promise));

    let instanceOf2 = instanceOf.bind(bat);
    let instanceOf3 = instanceOf.bind(null, bat);
    let instanceOf4 = instanceOf.bind({}, bat);

    Assert(instanceOf2(Animal));
    Assert(instanceOf2(Mammal));
    Assert(instanceOf2(WingedAnimal));
    Assert(instanceOf2(Bat));
    Assert(!instanceOf2(Promise));

    Assert(instanceOf2(Animal));
    Assert(instanceOf2(Mammal));
    Assert(instanceOf2(WingedAnimal));
    Assert(instanceOf2(Bat));
    Assert(!instanceOf2(Promise));

    Assert(instanceOf4(Animal));
    Assert(instanceOf4(Mammal));
    Assert(instanceOf4(WingedAnimal));
    Assert(instanceOf4(Bat));
    Assert(!instanceOf2(Promise));
  });
});
