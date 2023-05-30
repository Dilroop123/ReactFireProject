import { Button } from "react-bootstrap";

interface Props {
    todo: any;
    index: any;
    markTodo: any;
    removeTodo: any
}
export default function Task({ todo, index, markTodo, removeTodo }: Props) {
    return (
        <div
            className="todo"

        >
            <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
            <div>
                <Button variant="outline-success" onClick={() => markTodo(index, todo)}>✓</Button>{' '}
                <Button variant="outline-danger" onClick={() => removeTodo(index, todo)}>✕</Button>
            </div>
        </div>
    );
}

