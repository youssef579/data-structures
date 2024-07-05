import { DoublyListNode, type NullableNode } from "./linked-list";

export class Stack<T> {
    private tail: NullableNode<DoublyListNode<T>> = null;

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

    top() {
        return this.tail?.val;
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

    pop() {
        if (!this.tail) throw Error("There's not elements left");

        const val = this.tail.val;
        this.tail = this.tail.previous!;
        this.tail.next = null;

        return val;
    }

    isEmpty() {
        return !this.tail;
    }
}
