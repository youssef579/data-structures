const validateIndex = (index: number, size: number) => {
    if (index < 0 || index >= size) throw Error("Index out of range");
    if (index % 1 !== 0) throw Error("Index must be integer");
};

class SinglyListNode<T> {
    constructor(public val: T, public next: SinglyListNode<T> | null = null) {}
}

class DoublyListNode<T> {
    constructor(
        public val: T,
        public next: DoublyListNode<T> | null = null,
        public previous: DoublyListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: SinglyListNode<T> | null = null;
    private size = 0;

    constructor(arr?: T[]) {
        if (!arr || !arr.length) return;

        this.head = new SinglyListNode(arr[0]);
        this.size = arr.length;

        for (let i = 1, curr = this.head; i < arr.length; i++, curr = curr.next)
            curr.next = new SinglyListNode(arr[i]);
    }

    find(val: T) {
        for (let curr = this.head, i = 0; curr; curr = curr.next, i++)
            if (curr.val === val) return i;
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
}

export { SinglyListNode, DoublyListNode, LinkedList };
