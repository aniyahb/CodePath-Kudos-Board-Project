import {useState, useEffect} from 'react';

function CommentList(props){
    const [comments, setComments] = useState([]);

    useEffect(() =>{
        async function fetchComments(){
            try{
                const response = await fetch (`http://localhost:3000/cards/${props.cardId}/comments`)
                const data = await response.json()
                setComments(data);

            }catch(err){
                console.log(err)
            }
        }
        fetchComments();
    }, [cardId])
return(
    <div>
        {comments.map(comment =>(
            <div key={comment.Id}>
                <p>{comment.content}</p>
                <small>by{comment.author.username}</small>

            </div>
        ))}
    </div>
)

}

export default CommentList;
