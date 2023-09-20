import { useState } from "react";
function Form(){
    const [content,setContent]=useState("");
    const handleclick=async (e) => {
        
        const todo = { content };
        const response = await fetch("/add", {
        method: "POST",
        headers: {
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify(todo)
        })
        if (response.ok){
        console.log("it worked")
        }}
    
    return(
    <form>
        <input type="text" value={content} onChange={e => setContent(e.target.value)} />
        <button 
        type="submit" 
        value="Add Todo"
        onClick={handleclick}>
            Send
        </button>
</form>
        );
    }


export default Form;