import { BinaryTreeNode } from "./tree";
import { Stack } from "./stack";

abstract class HeapStrategy {
    abstract compare(node: BinaryTreeNode, parent: BinaryTreeNode): boolean;
    abstract getPriority(
        node1: BinaryTreeNode | null,
        node2: BinaryTreeNode | null
    ): BinaryTreeNode;
}

class MaxHeap extends HeapStrategy {
    compare(node: BinaryTreeNode, parent: BinaryTreeNode) {
        return node.val <= parent.val;
    }

    getPriority(node1: BinaryTreeNode | null, node2: BinaryTreeNode | null) {
        if (!node1 || !node2) return node1 ?? node2!;

        return node1.val >= node2.val ? node1 : node2;
    }
}

class MinHeap extends HeapStrategy {
    compare(node: BinaryTreeNode, parent: BinaryTreeNode) {
        return node.val >= parent.val;
    }

    getPriority(node1: BinaryTreeNode | null, node2: BinaryTreeNode | null) {
        if (!node1 || !node2) return node1 ?? node2!;

        return node1.val <= node2.val ? node1 : node2;
    }
}

class Heap {
    private root: BinaryTreeNode | null = null;
    private size = 0;
    constructor(private adapter: MaxHeap | MinHeap) {}

    insert(val: number) {
        this.size++;
        if (!this.root) {
            this.root = new BinaryTreeNode(val);
            return;
        }

        // Find the direction from the root to the new node
        const directions = this.getDirections();

        // Get the path using the given directions and set new node
        const path = this.getPath(directions, val);

        // Check the heap sort
        this.heapifyUp(path);
    }

    remove() {
        if (this.isEmpty()) throw Error("No elements left");

        const val = this.root!.val;
        if (this.size === 1) {
            this.root = null;
            this.size = 0;
            return val;
        }

        // Find the direction from the root to the new node
        const directions = this.getDirections();

        // Swap the value of last node with the root's value
        this.swapRootAndLastNode(directions);

        // Check the heap sort
        this.heapifyDown();

        this.size--;
        return val;
    }

    getDirections() {
        const treeHeight = Math.ceil(Math.log2(this.size + 1));
        const directions = new Stack<"left" | "right">();

        for (let currNode = this.size, i = 1; i < treeHeight; i++) {
            const nodeIndexInLevel = currNode - (2 ** (treeHeight - i) - 1);
            if (i !== 1)
                directions.push(nodeIndexInLevel % 2 ? "left" : "right");
            currNode =
                Math.ceil(nodeIndexInLevel / 2) +
                (2 ** (treeHeight - i - 1) - 1);
        }

        return directions;
    }

    getPath(directions: Stack<"right" | "left">, val: number) {
        const path = new Stack([this.root!]);

        while (!directions.isEmpty()) path.push(path.top()![directions.pop()]!);

        const lastPrant = path.top()!;
        const newNode = new BinaryTreeNode(val);

        if (!lastPrant.left) lastPrant.left = newNode;
        else lastPrant.right = newNode;

        path.push(newNode);
        return path;
    }

    swapRootAndLastNode(directions: Stack<"right" | "left">) {
        let curr = this.root!;
        while (!directions.isEmpty()) curr = curr[directions.pop()]!;

        if (curr.left) {
            this.root!.val = curr.left.val;
            curr.left = null;
        } else {
            this.root!.val = curr.right!.val;
            curr.right = null;
        }
    }

    heapifyUp(path: Stack<BinaryTreeNode>) {
        while (path.top() !== this.root) {
            const lastNode = path.pop();
            const lastParent = path.top()!;

            if (this.adapter.compare(lastNode, lastParent)) return;

            const tmp = lastNode.val;
            lastNode.val = lastParent.val;
            lastParent.val = tmp;
        }
    }

    heapifyDown() {
        let curr = this.root!;
        while (true) {
            const priorityNode = this.adapter.getPriority(
                curr.left,
                curr.right
            );
            if (
                (!curr.left && !curr.right) ||
                this.adapter.compare(priorityNode, curr)
            )
                return;

            const tmp = curr.val;
            curr.val = priorityNode.val;
            priorityNode.val = tmp;
            curr = priorityNode;
        }
    }

    isEmpty() {
        return !this.size;
    }
}

export { Heap, MinHeap, MaxHeap };
