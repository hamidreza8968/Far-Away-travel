import React, {useState} from "react";
import Item from "./Item";

function PackingList({items, onDeleteItems, onToggleItems, onClearList}) {

    const [sortBy, setSortBy] = useState("input");
    let sortedItems;

    if (sortBy === "input") sortedItems = items;
    if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

    const renderedItems = sortedItems.map((item) => <Item item={item} onDeleteItems={onDeleteItems}
                                                          onToggleItems={onToggleItems} key={item.id}/>);

    return (
        <div className="list">
            <ul>{renderedItems}</ul>

            <div className="actions">
                <select name="" id="" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button disabled={items.length===0} onClick={onClearList}>Clear List</button>
            </div>
        </div>

    )
}

export default PackingList;