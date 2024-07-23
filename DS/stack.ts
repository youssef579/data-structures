import { DoublyListNode } from "./linked-list";

class Stack<T> {
    private tail: DoublyListNode<T> | null = null;

    constructor(arr?: T[]) {
        if (!arr || !arr.length) return;

        this.tail = new DoublyListNode(arr[0]);
        for (let i = 1; i < arr.length; i++)
            this.tail = this.tail.next = new DoublyListNode(
                arr[i],
                null,
                this.tail
            );
    }

    top(): T {
        if (this.isEmpty()) throw Error("There's not elements left");
        return this.tail!.val;
    }

    push(val: T) {
        if (!this.tail) this.tail = new DoublyListNode(val);
        else {
            this.tail = this.tail.next = new DoublyListNode(
                val,
                null,
                this.tail
            );
        }
    }

    pop(): T {
        if (!this.tail) throw Error("There's not elements left");

        const val = this.tail.val;
        this.tail = this.tail.previous!;
        if (this.tail) this.tail.next = null;

        return val;
    }

    isEmpty() {
        return !this.tail;
    }
}

export { Stack };
