import {test, runIfMain} from "https://deno.land/std/testing/mod.ts";
import {assertEquals} from "https://deno.land/std/testing/asserts.ts";
import {Compose} from "./../src/Compose.ts";

class A {
  protected name;

  constructor(name) {
    this.name = name;
  }

  methodA() {
    return 'a';
  }
}

class B {

  public foo;

  constructor(foo) {
    this.foo = foo;
  }

  methodB() {
    return 'b';
  }
}

class B2 extends B {

  protected label;

  constructor(label) {
    super(label + 'foo');
    this.label = label;
  }

  methodB() {
    return 'b2'
  }

  methodB2() {
    return '2'
  }
}

test(function classNameIsComposed() {
  let testClass = Compose(A, B);
  assertEquals(testClass.constructor.name, 'AB');
});

test(function composedContainsBothMethodsFromClasses() {
  let testClass = Compose(A, B);
  let testInstance = new testClass();
  let testString = testInstance.methodA() + testInstance.methodB();
  assertEquals(testString, 'ab');
});

test(function prototypeChainIsFlattenedAndOrderIsCorrect() {
  let testClass = Compose(A, B2);
  let testInstance = new testClass();
  let testString = testInstance.methodA() + testInstance.methodB() + testInstance.methodB2();
  assertEquals(testString, 'ab22');
});

test(function isComposedWith() {
  let testClass = Compose(A, B);
  let testInstance = new testClass();
  assertEquals(testInstance.isComposedWith('A'), true);
  assertEquals(testInstance.isComposedWith('B'), true);
  assertEquals(testInstance.isComposedWith('C'), false);
});

test(function constructorIsExecutedAndResultsAreMerged() {
  let testClass = Compose(A, B2);
  let testInstance = new testClass({
    A: 'John',
    B2: 'woop'
  });

  assertEquals(testInstance.name, 'John');
  assertEquals(testInstance.label, 'woop');
});

runIfMain(import.meta);
