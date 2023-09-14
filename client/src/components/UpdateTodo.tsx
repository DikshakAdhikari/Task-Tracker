import axios from "axios";
import {useState,FC} from 'react'
import { useParams } from "react-router-dom";


export const UpdateTodo:FC = () => {
  const {id}= useParams();
   const [title, setTitle]=useState('')
   const [description, setDescription]=useState('')
    
   
 
    return(
        <>
        <div className="flex flex-col gap-10 ml-5 mt-10">
            <h1 className="font-bold">Update Todo</h1>
            <div className="flex gap-5">
                <div className="  text-[30px]">Title:</div>
                <input  type="text" onChange={(e)=> setTitle(e.target.value)} className=" w-[50%] rounded-md p-2" />
            </div>
            <div className="flex gap-5">
                <div className="  text-[30px]">Description:</div>
                <textarea onChange={(e)=> setDescription(e.target.value)} className="p-2 rounded-md" cols={60} rows={5}></textarea>
            </div>
            <button className="w-[200px]" onClick={async ()=> {
                await axios.patch(`http://localhost:3000/todos/${id}`,{title,description});
             
                
            }}>Update Todo</button>
    
        </div>
        </>
)
        
}