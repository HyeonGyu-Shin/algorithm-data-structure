# Q. 리스트

---

### 리스트

![Untitled](Q%20%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20d0bf4/Untitled.png)

👉 리스트는 배열과 달리, 데이터가 메모리상의 떨어진 영역에 흩어져서 저장이 된다.

![Untitled](Q%20%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20d0bf4/Untitled%201.png)

👉 데이터가 흩어져서 저장이 되어있으므로 포인터를 순서대로 따라가야만 원하는 데이터에 접근할 수 있다. 따라서 데이터 조회에 있어서는 비효율적이다.

![Untitled](Q%20%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20d0bf4/Untitled%202.png)

👉 이에 반해 데이터 추가는 추가할 위치의 앞 뒤 포인터를 변경만 하면 되므로 효율적이라고 볼 수 있다.

👉 이제 이를 바탕으로 코드로 알아보자!

```js
const LinkedList = (function () {   ...1

    function LinkedList() {   ...2
        this.length = 0;
        this.head = null;
    }

    return LinkedList;   ...3
})();

const list = new LinkedList();   ...4
console.log(list);

==============================

LinkedList { length: 0, head: null }
```

👉 LinkedList의 인스턴스를 만들면 길이는 0, head는 null로 초기화된다.

👉 코드를 이해하는데 어려움을 겪었다...ㅠㅠ

1. LinkedList는 즉시실행함수이기 때문에 바로 실행이 되고, return 값인 LinkedList 함수가 변수 LinkedList에 할당된다.

2. 인스턴스가 생성될 때, length = 0, head = null로 초기화 시켜준다.

3. LinkedList 함수만 return 되어 사용할 수 있다. 캡슐화 가능...?

4. new 키워드를 사용하여 인스턴스가 생성되고 list에 할당된다.

```jsx
LinkedList.prototype.add = function (value) {
        const node = new Node(value);   ... 1
        let current = this.head;   ...2
        if (!current) {   ...3
            this.head = node;
            this.length++;
            return node;
        } else {
            while (current.next) {   ...4
                current = current.next;
            };
            current.next = node;   ...5
            this.length++;
            return node;
        }
    }
.
.
.
const list = new LinkedList();
list.add(1);
list.add(2);
console.log(list);

==============================

LinkedList {
  length: 2,
  head: Node { value: 1, next: Node { value: 2, next: null } }
}
```

👉 node를 만든 후, 현재 node의 가장 끝에 새로 만든 node를 대입해주는 add 메서드이다.

👉 코드를 뜯어보자

1. 매개변수로 넘어온 value를 data로 받는 node 객체를 생성했다.

2. 연결리스트의 시작점을 나타내는, head가 가리키는 node를 current에 할당한다.

3. current가 false 즉, 아무런 node가 없는 경우에는 head가 node를 가리키게 하고, list의 길이를 최신화 해준다.

4. 만약 연결된 노드들이 있다면 링크를 타고 가면서 마지막 노드 위치를 current에 넣어준다.

5. 마지막 노드의 다음 노드에 노드를 연결해준다.

```jsx
LinkedList.prototype.search = function (position) {
    let current = this.head;
    let count = 0;
    while (count < position) {
      current = current.next;
      count++;
    }

    return current.data;
  };

.
.
.
const list = new LinkedList();
list.add(1);
list.add(2);
console.log(list.search(1));

=============================

// Node { data: 1, next: Node { data: 2, next: null } }
2
```

👉  원하는 값을 가져오기 위한 search 메서드이다.

매개변수로 받은 위치만큼 링크를 타고 이동한 후, 데이터를 출력해준다.

입력값은 0 이상으로 제한하여 받아야 한다!

```jsx
LinkedList.prototype.remove = function (position) {
    let current = this.head;
    let before;
    let count = 0;

    if (position === 0) {   ... 1
      this.head = current.next;
      this.length--;
      return;
    }
    while (count < position) {   ... 2
      before = current;
      current = current.next;
      count++;
    }
    before.next = current.next;   ... 3
    this.length--;
    return;
  };
.
.
.
const list = new LinkedList();
list.add(1);
list.add(2);
list.remove(1);
console.log(list);

==============================

LinkedList { length: 1, head: Node { data: 1, next: null } }

// Node{ data: 2, next: null}이 제거되었다.
```

👉  특정 노드를 제거하기 위한 remove 메서드이다.

1. 첫 번째 노드를 없애려면 LinkedList의 시작노드가 원래 처음 가리키던 노드의 다음 노드를 가리키도록 해야한다. 따라서 this.head가 현재 첫 노드의 다음노드를 가리키도록 했다.

2. 원하는 위치까지 링크를 타면서 이동한다. 이때, 이전 노드의 next가 제거하고자 하는 다음 노드를 가리키도록 해야하기 때문에 before 값과 current 값을 계속해서 최신화 시켜준다.

3. 위에서 말한대로 이전 노드의 next 값에 다음 노드의 값을 넣어주면 제거된 것처럼 리스트가 최신화된다.

```jsx
LinkedList.prototype.add = function (value, position) {
    const node = new Node(value);   ... 1
    let before;
    let count = 0;
    let current = this.head;

    if (position === 0) {   ... 2
      node.next = this.head;
      this.head = node;
      this.length++;
      return node;
    }

    while (count < position) {   ... 3
      before = current;
      current = current.next;
      count++;
    }
    before.next = node;   ... 4
    node.next = current;
    this.length++;
    return node;
  };
.
.
.
const list = new LinkedList();
list.add(1, 0);
list.add(2, list.length);
list.add(0, list.length);
list.add(5, 0);
list.add(4, 1);
console.log(list);

===============================

LinkedList {
  length: 5,
  head: Node { data: 5, next: Node { data: 4, next: [Node] } }
}
```

👉  node를 원하는 위치에 넣어주기 위해서 add 메서드를 리팩토링 하였다. 매개변수에 position을 추가로 받아준다.

1. 연결이 되어있는 list에 node를 추가하기 위해선 이전 node의 next값을 이용해야 한다. 따라서 before 변수를 추가했다. 그리고 원하는 위치까지 이동하기 위해 count 변수도 추가했다.

2. list의 맨 앞에 추가를 하는 경우에는 현재 this.head가 가리키는 원래의 첫 node를 새로 만든 node가 가리키도록 하고, this.head가 새로 만든 node를 가리키게 하면 된다.

3. 원하는 위치까지 링크를 타고 이동한다. 이때 이전 node 와 현재 node의 위치를 최신화 해준다.

4. 2번과 똑같은 원리로 노드를 추가해준다. 이전 node가 현재 node를 가리키고, 새로 추가한 node.next가 원래 위치의 노드를 가리키게 하면 된다.

👉  add 메서드를 리팩토링 하는 과정에서 “[오버로딩](https://www.notion.so/Q-js-76c28c6d4d6345b19ffbd7f248a73f8b)을 사용하면 좋지 않을까?” 라는 생각을 하게 되었다. 그래서 찾아보려고 한다.

```jsx
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
```
