import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
    todos: Todo[] = [
        {
            id: 1,
            title: "todo 1",
            description: "Lorem ipsum dolor sit amet consectetur",
            done: false,
        },
        {
            id: 2,
            title: "todo 2",
            description: "Lorem ipsum dolor sit amet consectetur",
            done: true,
        },
        {
            id: 3,
            title: "todo 3",
            description: "Lorem ipsum dolor sit amet consectetur",
            done: true,
        }
    ];

    findAll(): Todo[] {
        return this.todos;
    }

    creatTodo(todo: CreateTodoDto){
        this.todos = [...this.todos, todo]
    }

    findOne(id: string){
        return this.todos.find(todo => todo.id === Number(id))
    }

    deleteOne(id: string){
        if(!this.todos.find(t => t.id === +id)){
            return new NotFoundException(`Le todo ayant l'id ${id} n'existe pas.`)
        }        
        return this.todos = this.todos.filter(todo => todo.id !== +id);
    }

    updateOne(id: string, todo: CreateTodoDto){
        const todoToUpdate = this.todos.find(t => t.id === Number(id)) //On peut utiliser +id pur transormer notre id en number
        if(!todoToUpdate){
            return new NotFoundException(`Le todo ayant l'id ${id} n'existe pas.`)
        }
        if(todo.hasOwnProperty("done")){ // ici on utilise hasOwnProperty car 'done' est un boolean, s'il est a false on ne pourrait jamais rentrer dans le if
            todoToUpdate.done = todo.done;
        }
        if(todo.title)todoToUpdate.title = todo.title;
        if(todo.description)todoToUpdate.description = todo.description;

        const updatedTodos = this.todos.map(t => t.id != +id? t : todoToUpdate) // On check, si c'est le même id alors on fait la modif
        this.todos = [...updatedTodos]
        return { updatedTodos: 1, todo: todoToUpdate };
    }
}
