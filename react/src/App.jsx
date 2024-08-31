import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const res = await axios.get('https://localhost:5000/items');
        setItems(res.data);
    };

    const addItem = async () => {
        if (input) {
            await axios.post('https://localhost:5000/items', { name: input });
            setInput("");
            fetchItems();
        }
    };

    const deleteItem = async (id) => {
        await axios.delete(`https://localhost:5000/items/${id}`);
        fetchItems();
    };

    const updateItem = async (id) => {
        const newName = prompt("Enter new name:");
        if (newName) {
            await axios.put(`https://localhost:5000/items/${id}`, { name: newName });
            fetchItems();
        }
    };

    return (
        <div>
            <h1>CRUD App</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add an item"
            />
            <button onClick={addItem}>Add</button>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        {item.name}
                        <button onClick={() => updateItem(item._id)}>Update</button>
                        <button onClick={() => deleteItem(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
