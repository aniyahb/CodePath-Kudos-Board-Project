import {useState} from 'react';
import './Card.css'
import CommentForm from '../CommentForm/CommentForm';

function Card(props){
    const [upVote, setUpVote] = useState(props.upVote)
    const [voteName, setVoteName] = useState("UpVote")

    const [displayCommentForm, setdisplayCommentForm] = useState(false);

    function handleCommentForm(){

        setdisplayCommentForm(!displayCommentForm)
    }

    function handleUpVote(){
        if(voteName === "UpVote"){
            setUpVote(upVote +1)
            setVoteName('DownVote')
        } else{
            setUpVote(upVote - 1)
            setVoteName('UpVote')
        }
    }
    return(
        <div className='card'>

            <p>{props.message}</p>
            <img src={props.img_url} alt='' />
            <p> Card By:{props.author}</p>
            <div className='card-buttons'>
                <button className='Vote' onClick={handleUpVote}>{voteName}</button>
                <p>{upVote}</p>
                <button className="DeleteCard" onClick={props.deleteCard}> Delete </button>

            </div>
            <button className='Comment' onClick={handleCommentForm}>Comment</button>
            {displayCommentForm && <CommentForm displayForm={handleCommentForm}/> }
        </div>


    )

}

export default Card;
