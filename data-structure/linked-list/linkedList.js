const LinkedList = (function () {
  function LinkedList() {
    this.length = 0;
    this.head = null;
  }

  function Node(value) {
    this.data = value;
    this.next = null;
  }

  LinkedList.prototype.add = function (value, position) {
    const node = new Node(value);
    let before;
    let count = 0;
    let current = this.head;

    if (position === 0) {
      node.next = this.head;
      this.head = node;
      this.length++;
      return node;
    }

    while (count < position) {
      before = current;
      current = current.next;
      count++;
    }
    before.next = node;
    node.next = current;
    this.length++;
    return node;
  };

  LinkedList.prototype.search = function (position) {
    let current = this.head;
    let count = 0;
    while (count < position) {
      current = current.next;
      count++;
    }

    return current.data;
  };

  LinkedList.prototype.remove = function (position) {
    let current = this.head;
    let before;
    let count = 0;

    if (position === 0) {
      this.head = current.next;
      this.length--;
      return;
    }
    while (count < position) {
      before = current;
      current = current.next;
      count++;
    }
    before.next = current.next;
    this.length--;
    return;
  };

  return LinkedList;
})();

const list = new LinkedList();
list.add(1, 0);
list.add(2, list.length);
list.add(0, list.length);
list.add(5, 0);
list.add(4, 1);
console.log(list);
