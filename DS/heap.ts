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

        // Get the path from the root to the nearest empty place and set new node
        const path = this.getPath(val);

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
        // Swap the value of last node with the root's value
        this.swapRootAndLastNode();

        // Check the heap sort
        this.heapifyDown();

        this.size--;
        return val;
    }

    *nodeGenerator() {
        const treeHeight = Math.ceil(Math.log2(this.size + 1));
        let a = 1,
            b = 2 ** (treeHeight - 1);
        const nodeIndex = this.size - b + 1;
        let lastNode = this.root!;

        while (b - a > 1) {
            const half = (b - a + 1) / 2;
            if (half >= nodeIndex) {
                lastNode = lastNode.left!;
                b = half;
            } else {
                lastNode = lastNode.right!;
                a = half + 1;
            }
            yield lastNode;
        }
    }

    getPath(val: number) {
        const path = new Stack([this.root!]);
        const generator = this.nodeGenerator();

        for (const node of generator) path.push(node);

        const newNode = new BinaryTreeNode(val);
        const lastNode = path.top();
        if (!lastNode.left) lastNode.left = newNode;
        else lastNode.right = newNode;

        path.push(newNode);
        return path;
    }

    swapRootAndLastNode() {
        const generator = this.nodeGenerator();
        let lastNode = this.root!;
        
        for (const node of generator) lastNode = node;

        if (lastNode.left) {
            this.root!.val = lastNode.left.val;
            lastNode.left = null;
        } else {
            this.root!.val = lastNode.right!.val;
            lastNode.right = null;
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
