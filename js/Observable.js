export default class Observable {
  constructor(value) {
    this.observers = new Set();
  }

  addObserver(observer) {
    this.observers.add(observer);
    return observer;
  } 

  removeObserver(observer) {
    this.observers.delete(observer);
  }

  setValue(value) {
    
  }

}