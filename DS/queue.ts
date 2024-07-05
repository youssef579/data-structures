import { SinglyListNode, type NullableNode } from "./linked-list";

export class Queue<T> {
    private head: NullableNode<SinglyListNode<T>> = null;
    private tail: NullableNode<SinglyListNode<T>> = null;
    constructor(arr?: T[]) {
        if (!arr || !arr.length) return;

        this.tail = this.head = new SinglyListNode(arr[0]);
        for (let i = 1; i < arr.length; i++) {
            this.tail = this.tail.next = new SinglyListNode(arr[i]);
        }
    }

    peek() {
        return this.head?.val;
    }

    enqueue(val: T) {
        if (!this.tail) this.head = this.tail = new SinglyListNode(val);
        else {
            this.tail.next = new SinglyListNode(val);
            this.tail = this.tail.next;
        }
    }

    dequeue() {
        if (!this.head) throw Error("No elements left");

        const val = this.head.val;
        this.head = this.head.next ?? null;

        return val;
    }

    isEmpty() {
        return !this.head;
    }
}
