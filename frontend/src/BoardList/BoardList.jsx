import React, {useState, useEffect} from'react';
import Board from "../Board/Board";
import './BoardList.css';
import {useNavigate} from 'react-router-dom';


function BoardList(props){
    const navigate = useNavigate();

    function handleBoardClick(id){
        navigate(`/boards/${id}/cards`)
    }
    function displayBoard(board){
        return(
            <Board
                key={board.id}
                deleteBoard={()=> props.deleteBoard(board.id)}
                displayBoard = {() => handleBoardClick(board.id)}
                image_url={board.image_url}
                title={board.title}
                category={board.category}
                handleSetBoardId={() => props.handleSetBoardId(board.id)}
                />
        )
    }

    return(
        <div className='board-list'>
            {props.boards.map(displayBoard)}

        </div>
    )
}

export default BoardList;
