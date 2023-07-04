import React, {useState} from "react";


function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }

    function handleDeleteItems(id) {
        setItems((items) => items.filter(item => item.id !== id))
    }

    function handleToggleItems(id) {
        setItems((items) => items.map(item => item.id === id ? {...item , packed:!item.packed} : item))
    }

    return (
        <div className="app">
            <Logo/>
            <Form onAddItems={handleAddItems}/>
            <PackingList items={items} onDeleteItems={handleDeleteItems} onToggleItems={handleToggleItems}/>
            <Stats/>
        </div>
    )
}


function Logo() {
    return <h1>🌴 Far Away 🧳</h1>
}


function Form({onAddItems}) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);


    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = {description, quantity, packed: false, id: Date.now()};

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select name="" id="" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {Array.from({length: 20}, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
            </select>
            <input type="text" placeholder="Item..." value={description}
                   onChange={(e) => setDescription(e.target.value)}/>
            <button>Add</button>
        </form>
    );
}

function PackingList({items , onDeleteItems , onToggleItems}) {
    const renderedItems = items.map((item) => <Item item={item} onDeleteItems={onDeleteItems} onToggleItems={onToggleItems} key={item.id}/>);
    return (
        <div className="list">
            <ul>{renderedItems}</ul>
        </div>

    )
}

function Item({item , onDeleteItems , onToggleItems}) {
    return (
        <li>
            <input type="checkbox" value={item.packed} onChange={() => onToggleItems(item.id)
            }/>
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItems(item.id)}>❌</button>
        </li>
    )
}

function Stats() {
    return (
        <footer className="stats">
            <em>💼 You have X items on your list, and you already packed X (X%)</em>
        </footer>
    );
}

export default App;