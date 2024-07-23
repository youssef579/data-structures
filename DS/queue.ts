import { SinglyListNode } from "./linked-list";

class Queue<T> {
    private head: SinglyListNode<T> | null = null;
    private tail: SinglyListNode<T> | null = null;
    constructor(arr?: T[]) {
        if (!arr || !arr.length) return;

        this.tail = this.head = new SinglyListNode(arr[0]);
        for (let i = 1; i < arr.length; i++)
            this.tail = this.tail.next = new SinglyListNode(arr[i]);
    }

    peek(): T {
        if (this.isEmpty()) throw Error("No elements left");
        return this.head!.val;
    }

    enqueue(val: T) {
        if (this.isEmpty()) this.head = this.tail = new SinglyListNode(val);
        else this.tail = this.tail!.next = new SinglyListNode(val);
    }

    dequeue(): T {
        if (this.isEmpty()) throw Error("No elements left");

        const val = this.head!.val;
        this.head = this.head!.next ?? null;

        return val;
    }

    isEmpty() {
        return !this.head;
    }
}

export { Queue };
