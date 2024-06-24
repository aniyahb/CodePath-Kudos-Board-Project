import React, {useState} from 'react';
import './Board.css';

function Board(props){
    return(
        <div className='board'>
            <img src={props.image_url} alt=''/>
            <h3>{props.title}</h3>
            <p>{props.category}</p>
            <div className='delete-and-view-button'>
                <button className='view-button' onClick={() =>{
                    props.displayBoard()
                    props.handleSetBoardId()
                }}> View Board</button>
                <button className='delete-button' onClick={props.deleteBoard}>Delete Board</button>
            </div>

        </div>

        // <div className='board'>
        //     <img src="./public/vite.svg" alt=''/>
        //     <h3>Title</h3>
        //     <p>Category</p>
        //     <div className='delete-and-view-button'>
        //         <button className='view-button' onClick={props.displayBoard}> View Board</button>
        //         <button className='delete-button'>Delete Board</button>
        //     </div>

        // </div>
    )
}

export default Board;
