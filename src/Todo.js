import React, { useState, useEffect } from 'react';
import Item from './components/Item';
import List from './components/List'
import TodoForm from './components/TodoForm';
import './Todo.css'
import Modal from './components/Modal';

const SAVED_ITEMS = "savedItems";

function Todo() {

    const [items, setItems] = useState([])

    const [showModal, setShowModal] = useState(true)

    useEffect(() => {
        let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS))
        if (savedItems) {
            setItems(savedItems);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items))
    }, [items])


    function onAddItems(text) {

        let item = new Item(text);
        setItems([...items, item])
        onHideModal();
    }

    function onItemDeleted(item) {
        let filteredItems = items.filter(it => it.id !== item.id)
        setItems(filteredItems)
    }

    function OnDone(item) {
        let updatedItems = items.map(it => {
            if (it.id === item.id) {
                it.done = !it.done;
            }
            return it;
        })
        setItems(updatedItems);
    }

    function onHideModal(){
        setShowModal(false)
    }  

    return (<div className="container">
       <header className='header'> <h1>To-do-List</h1> <button onClick={()=>{setShowModal(true)}} className='addButton'>+</button></header>

        <List OnDone={OnDone} onItemDeleted={onItemDeleted} items={items}></List>

        <Modal show={showModal} onHideModal={onHideModal}><TodoForm onAddItems={onAddItems}></TodoForm></Modal>
    </div>)
}

export default Todo;