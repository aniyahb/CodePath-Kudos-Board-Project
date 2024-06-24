import { useState,useEffect } from "react";
import Card from '../Card/Card';
import './CardList.css';
import CreateButton from "../CreateButton/CreateButton";
import CreateForm from "../CreateForm/CreateForm";
import { useParams } from "react-router-dom";

function CardList(props){
    const[cards, setCards] = useState([]);
    const {id} = useParams();
    const [displayCreateForm, setDisplayCreateForm] = useState(false)

    async function receivedCardList(){
        try{
            const response = await fetch( `http://localhost:3000/boards/${id}/cards`,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                },

            });
            const data = await response.json();
            setCards(data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=> {
        receivedCardList();
    }, [id])

    function handleDisplayCreateForm(){
        setDisplayCreateForm(!displayCreateForm)
    }

    async function deleteCard(boardId, cardId){
        try{
            const response= await fetch(`http://localhost:3000/boards/${id}/cards/${cardId}`, {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                },
            });
            if(response.ok){
                receivedCardList()
            }

        }catch(err){

        }

    }

    function displayCard(card){
        return(
            <Card
            key={card.id}
            upVote={card.upVote}
            deleteCard={()=> deleteCard(props.boardId, card.id)}
            author = {card.author}
            img_url={card.image_url}
            message={card.message}/>

        )
    }
    return(
        <>
        {displayCreateForm ? <CreateForm refreshCards={receivedCardList} displayForm={handleDisplayCreateForm}  formName={'card'}/>: null}
        <CreateButton name='Create New Card' displayForm={handleDisplayCreateForm}/>
        <div className="card-list">
           {cards.map(displayCard)}
        </div>
        </>
    )

}

export default CardList;
