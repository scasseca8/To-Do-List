import React from 'react'
import ListItem from './ListItem';

function List(props) {

    return (<ul>
        {props.items.map(item => <ListItem key={item.id} onItemDeleted={props.onItemDeleted} OnDone={props.OnDone} item={item}></ListItem>)}
    </ul>)
}

export default List;