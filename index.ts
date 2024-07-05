import { Stack } from "./DS/stack";

const stack = new Stack([1, 2, 3, 4, 5]);

stack.push(6);
stack.push(7);
stack.push(8);

while (!stack.isEmpty()) console.log(stack.pop());
