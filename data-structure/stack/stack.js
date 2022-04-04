const Stack = (function () {
  function Stack() {
    this.top = null;
    this.count = 0;
  }

  function Node(data) {
    this.data = data;
    this.next = null;
  }

  Stack.prototype.push = function (data) {
    const node = new Node(data);
    node.next = this.top;
    this.top = node;
    this.count++;
    return this.count;
  };

  Stack.prototype.pop = function () {
    if (!this.top) {
      return console.log(`스택이 비었습니다!!`);
    }
    this.top = this.top.next;
    this.count--;

    return this.count;
  };

  return Stack;
})();

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.pop();
stack.pop();
stack.pop();
console.log(stack);
