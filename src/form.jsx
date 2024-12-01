import {useState, useEffect} from "react";
import axios from "axios";

export function Form (){
    const [form, setForm] = useState({
        title: "",
        description:"", 
        completed: false
    });

    const [todoList, setToDoList] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const taskCompleted = (index) => {
        const updatedList = todoList.filter((_, i) => i !== index);
        setToDoList(updatedList);
    }

    const getTodos = async () => {
        try{
            const res = await axios.get("https://fake-api-kf7b.onrender.com/todos");    
            setToDoList(res.data);
        }
        catch(error){
            console.error("Error: ", error);
        }
    }

    const postTodos = async () => {
        try{
            const res = await axios.post("https://fake-api-kf7b.onrender.com/todos", form);
            if(res.status == 201){
                getTodos();
            }
        }
        catch(error){
            console.error("Error: ", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postTodos();
        // alert(JSON.stringify(form));
        setToDoList([...todoList, form]);
        setForm({
            title: "",
            description: ""
        });
    }

    useEffect(() => {
        getTodos();
    }, []);

    return(
        <div>
            <h1>TodoList</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" value={form.title} name="title" onChange={handleChange}/>
                <input type="text" placeholder="description" value={form.description} name="description" onChange={handleChange}/>
                <button type="submit">add todo task</button>
            </form>
            <div>
                {todoList.map((task, index) => {
                    return(                    
                    <div key={index}>
                        <p key={index}>title: {task.title}</p>
                        <p key={index}>description: {task.description}</p>
                        <input type="button" onClick={() => taskCompleted(index)} value="Done"/>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}