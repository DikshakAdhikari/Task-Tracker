import axios from 'axios'
import { useState } from 'react'
import { useGetTodos } from '../hook/useGetTodos';
import { useNavigate } from 'react-router-dom';
import { UpdateTodo } from './UpdateTodo';


export const Todos= ()=> {
    const [title, setTitle]= useState('');
    const [description, setDescription]= useState('');
    return(
        <>
        <div className="flex flex-col gap-10 ml-5 mt-10">
            <div className="flex gap-5">
                <div className="  text-[30px]">Title:</div>
                <input type="text" onChange={(e)=> setTitle(e.target.value)} className=" w-[50%] rounded-md p-2" />
            </div>
            <div className="flex gap-5">
                <div className="  text-[30px]">Description:</div>
                <textarea onChange={(e)=> setDescription(e.target.value)} className="p-2 rounded-md" cols={60} rows={5}></textarea>
            </div>
            <button className="w-[200px]" onClick={async ()=> {
                await axios.post('http://localhost:3000/todos/todo',{title,description});
             
                
            }}>Save Todo</button>
    
        </div>
        <hr className="my-10" />


        <div>
            <TodoList />
        </div>
        </>
    )
}
interface Todo{
    id: number;
    title: string;
    description: string;
}


const TodoList = ()=> {
    
    const {loading, todos}= useGetTodos();

    const navigate= useNavigate();
    
    if(loading){
        return(<div>Loading....</div>)
    }
    
    
    return (
        <div>
            {
            todos.map((todo:Todo)=> (
                <div className='m-5 shadow-lg p-5 flex flex-col gap-3' key={todo.id}>
                    <div className='font-bold text-[25px]'>{todo.title}</div>
                    <div>{todo.description}</div>
                    <div className='flex gap-3'>
                    <button onClick={()=>{
                        <UpdateTodo todoID:number= {todo.id} />
                         navigate('/updateTodo')}} >Edit</button>
                    <button onClick={async()=> {
                        try{
                            await axios.delete(`http://localhost:3000/todos/${todo.id}`)
                            
                        }catch(err){
                            console.log(err);
                            
                        }
                       
                    }}>Delete</button>
                    </div>
                </div>
            ))}
        </div>

    )
}