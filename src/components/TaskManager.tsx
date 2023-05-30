"use client";
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import Task from './Task';

function FormTodo({ addTodo }: any) {
    const [value, setValue] = React.useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label><b>Add Task</b></Form.Label>
                <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new task" />
            </Form.Group>
            <Button variant="primary mb-3" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default function TaskManager() {
    const [todos, setTodos]: any = React.useState();

    const fireStore = useFirestore();
    const tasksCollection = collection(useFirestore(), 'tasks');
    const { status, data: tasksLoaded } = useFirestoreCollectionData(tasksCollection);

    console.log(tasksLoaded)

    useEffect(() => {
        setTodos(tasksLoaded);

    }, [tasksLoaded]);


    const addTodo = (text: any) => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
        addDoc(tasksCollection,
            {
                text: text,
                isDone: false,
                id: todos?.length + 1
            }
        )
    };

    const markTodo = (index: any, task: any) => {
        const newTodos = [...todos];
        newTodos[index].isDone = true;
        const ref = doc(fireStore, 'tasks', task?.NO_ID_FIELD);

        setTodos(newTodos);
        updateDoc(ref, {
            isDone: true,
        });
    };

    const removeTodo = (index: any, task: any) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        deleteDoc(doc(tasksCollection, task?.NO_ID_FIELD))
    };

    return (
        <div className="app">
            <div className="container">
                <h1 className="text-center mb-4">Task List</h1>
                <FormTodo addTodo={addTodo} />
                <div>
                    {todos?.map((todo: any, index: any) => (
                        <Card>
                            <Card.Body>
                                <Task
                                    key={index}
                                    index={index}
                                    todo={todo}
                                    markTodo={markTodo}
                                    removeTodo={removeTodo}
                                />
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
};