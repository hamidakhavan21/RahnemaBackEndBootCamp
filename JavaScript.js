constructor(value, next = null) {
  this.value = value;
  this.next = next;
}

insert(value) {
  return new Node(value, this);
}

append(value) {
  let node = this;
  while (node.next) {
    node = node.next;
  }
  node.next = new Node(value);
}

size() {
  if (!this.next) {
    return 1;
  }
  return 1 + this.next.size();
}

at(n) {
  let node = this;
  for (let i = 0; i < n; i++) {
    if (!node.next) {
      throw new Error('Index out of bounds');
    }
    node = node.next;
  }
  return node;
}

join(separator = ",") {
  return this.toArray().join(separator);
}

map(modifier) {
  let node = this;
  while (node) {
    node.value = modifier(node.value);
    node = node.next;
  }
}

filter(filterFn) {
  let node = this;
  const dummyHead = new Node(null);
  let current = dummyHead;

  while (node) {
    if (filterFn(node.value)) {
      current.next = new Node(node.value);
      current = current.next;
    }
    node = node.next;
  }

  return dummyHead.next;
}

find(findFn) {
  let node = this;
  while (node) {
    if (findFn(node.value)) {
      return node;
    }
    node = node.next;
  }
  return null;
}

toArray() {
  const resultArr = [];
  let node = this;
  while (node) {
    resultArr.push(node.value);
    node = node.next;
  }
  return resultArr;
}
}

// Example usage:
const list = new Node("a", new Node("b"));

//   console.log(list)

const newList = list.insert("first");
console.log("Inserting 'first' to the list: " + newList.join(","));
//   console.log(list)

list.append("c");
console.log("Appending 'c' to the list: " + list.join(","));
//   console.log(list)

console.log(
`Joining the list: ${list.join(",")}\nList size: ${list.size()}\nList item at 1: ${list.at(1).value}`
);

list.map((x) => `${x} prime`);
console.log("Mapping the list: " + list.join(","));

const filteredList = list.filter((x) => x[0] === "a" || x[0] === "c");
console.log("Filtered list: " + filteredList.join(","));

console.log("Finding item: " + list.find((x) => x.includes("a")).value);
