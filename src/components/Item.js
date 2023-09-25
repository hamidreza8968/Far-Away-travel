import React from "react";

function Item({item, onDeleteItems, onToggleItems}) {
    return (
        <li className={`item ${item.packed && "packed"}`}
            onClick={() => onToggleItems(item.id)}>
            <span className="itemText" style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
             <span className={`text-packed ${item.packed ? "green" : "red"}`}>
                 {item.packed ? "✓Packed" : "⛔️Not-Packed" }
             </span>

            <button className="itemClose" onClick={() => onDeleteItems(item.id)}>❌</button>
        </li>
    )
}
export default Item;