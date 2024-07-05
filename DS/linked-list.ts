type NullableNode<T> = T | null;

const validateIndex = (index: number, size: number) => {
    if (index < 0 || index >= size) throw Error("Index out of range");
    if (index % 1 !== 0) throw Error("Index must be integer");
};

class SinglyListNode<T> {
    constructor(
        public val: T,
        public next: NullableNode<SinglyListNode<T>> = null
    ) {}
}

class DoublyListNode<T> {
    constructor(
        public val: T,
        public next: NullableNode<DoublyListNode<T>> = null,
        public previous: NullableNode<DoublyListNode<T>> = null
    ) {}
}

class LinkedList<T> {
    private head: NullableNode<SinglyListNode<T>> = null;
    private size = 0;

    constructor(arr?: T[]) {
        if (arr) Object.assign(this, LinkedList.fromArray(arr));
    }

    find(val: T) {
        for (let curr = this.head, i = 0; curr; curr = curr.next, i++) {
            if (curr.val === val) return i;
        }
        return -1;
    }

    at(index: number) {
        if (index < 0) index += this.size;
        validateIndex(index, this.size);

        if (!index) return this.head!.val;

        let curr = this.head!;
        for (let i = 0; index !== i; curr = curr.next!, i++);
        return curr.val;
    }

    insert(val: T, index: number) {
        if (!index) {
            this.head = new SinglyListNode(val, this.head);
            this.size++;
            return;
        }
        if (index < 0) index += this.size;
        validateIndex(index, this.size);

        let curr = this.head!;
        for (let i = 1; i !== index; curr = curr!.next!, i++);

        curr.next = new SinglyListNode(val, curr.next);
        this.size++;
    }

    append(val: T) {
        if (!this.head) {
            this.head = new SinglyListNode(val);
            this.size++;
            return;
        }

        let curr: SinglyListNode<T>;
        for (curr = this.head; curr.next; curr = curr.next);

        curr.next = new SinglyListNode(val);
        this.size++;
    }

    remove(index: number) {
        if (index < 0) index += this.size;
        validateIndex(index, this.size);

        if (!index) {
            this.head = this.head!.next!;
            this.size--;
            return;
        }

        let curr = this.head!;
        for (let i = 1; i !== index; i++, curr = curr!.next!);

        curr.next = curr.next?.next ?? null;
        this.size--;
    }

    getSize() {
        return this.size;
    }

    static fromArray<T>(arr: T[]) {
        const list = new LinkedList<T>();
        list.head = new SinglyListNode(arr[0]);
        list.size = arr.length;

        for (let i = 1, curr = list.head; i < arr.length; i++, curr = curr.next)
            curr.next = new SinglyListNode(arr[i]);

        return list;
    }
}

export { type NullableNode, SinglyListNode, DoublyListNode, LinkedList };
