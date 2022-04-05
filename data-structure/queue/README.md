# Q. 큐

---

### 큐

<br/>

![Untitled](../queue/assets/Untitled.png)

👉 큐는 ‘대기 행렬’이라고 불린다. 말 그대로 줄서 있는 것을 생각하면 된다.즉, 먼저 온 사람이 먼저 나간다고 생각하면 된다.
<br/>
<br/>

![Untitled](../queue/assets/Untitled%201.png)
<br/>

👉 큐에 데이터를 추가하는 것을 enqueue(엔큐)라고 한다. enqueue를 하면 데이터의 가장 뒤에 데이터가 추가된다.
<br/>
<br/>

![Untitled](../queue/assets/Untitled%202.png)
<br/>
<br/>

👉 큐에서 데이터를 꺼내는 것을 dequeue(디큐)라고 한다. dequeue를 하면 큐의 가장 끝(제일 오래된 데이터)에서 데이터를 빼낸다.
<br/>
<br/>

👉 이제 코드로 알아보자! 이번에는 저번과 달리 es6의 클래스를 이용하여 구현해보도록 하겠다.
<br/>
<br/>

```jsx
class Queue {
  constructor() {
    this.head = null;
    this.rear = null;
    this.count = 0;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
```

👉  es6의 클래스를 이용하여 Queue를 구현했다. 이제 메서드를 작성해보자.

```jsx
enqueue(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;   ... 1
    } else {
      this.rear.next = node;   ... 3
    }
    this.rear = node;   ... 2
    this.count++;

    return this.count;
  }
.
.
.

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue);

=========================

Queue {
  head: Node { data: 1, next: Node { data: 2, next: null } },
  rear: Node { data: 2, next: null },
  count: 2
}
```

<br/>
<br/>

👉  queue에 데이터를 넣어주는 enqueue 메서드이다.

1. this.head가 false인 경우는 큐가 비었을 경우이다. 이때는 큐의 맨 처음을 가리키는 this.head에
   생성한 node를 넣어준다.

2. 큐의 맨 뒤를 가리키는 this.rear에 생성한 node를 넣어준다. 그 결과 this.rear는 생성한 노드만 가리키게 된다.

3. 큐에 데이터가 존재하는 경우 큐의 맨 뒤인 this.rear의 next 속성에 생성한 노드를 넣는다. 이때, this.head와 this.rear는 같은 노드를 참조하고 있기 때문에 this.head 또한 갱신이 된다.
   <br/>

```jsx
dequeue() {
    let data;
    if (!this.head) {   ... 1
      return console.log(`큐가 비었습니다.`);
    }
    data = this.head.data;   ... 2
    this.head = this.head.next;   ... 3
    this.count--;
    return data;
  }
.
.
.

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();
console.log(queue);

===================

Queue {
  head: Node { data: 2, next: Node { data: 3, next: null } },
  rear: Node { data: 3, next: null },
  count: 2
}
```

<br/>

👉  큐의 맨 처음에 있는 데이터를 반환해주는 dequeue 메서드이다.

1. this.head가 비었다는 건 큐가 비었다는 뜻이기 때문에 반환할 값이 없다. 바로 return을 하여 종료시키자.

2. 큐의 맨처음에 있는 값을 반환하기 위해 data 값을 변수에 저장했다.

3. 값을 가져왔기 때문에 this.head.next에 있는 node를 this.head가 가리키도록 했다. 그 결과 맨 처음에 있던 노드는 연결이 끊어지고 그 다음 노드가 맨 처음으로 들어오게 된다.
   <br/>
   <br/>

```jsx
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
queue.enqueue(2);
console.log(queue);
```
