class Queue {
  constructor() {
    this.head = null;
    this.rear = null;
    this.count = 0;
  }

  enqueue(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      this.rear.next = node;
    }
    this.rear = node;
    this.count++;

    return this.count;
  }

  dequeue() {
    let data;
    if (!this.head) {
      return console.log(`큐가 비었습니다.`);
    }
    data = this.head.data;
    this.head = this.head.next;
    this.count--;
    return data;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const queue = new Queue();
queue.enqueue(1);
console.log(queue);
queue.enqueue(2);
console.log(queue);

queue.enqueue(3);
console.log(queue);
