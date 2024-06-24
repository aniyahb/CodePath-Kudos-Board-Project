import {useState} from 'react';
import { useParams } from 'react-router-dom';
function CommentForm(props){
    const [content, setContent] = useState([]);
    // const {id} = useParams()
    const {commentId} = useParams()




    async function handleSubmit(event){
        event.preventDefault();
        const commentId = event.target.dataset.commentId;
        // console.log(commentId)
        try{
            const response = await fetch(`http://localhost:3000/cards/${commentId}/comments`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content})
            })
            if(response.ok){
                setContent('')
                props.displayForm()
            }
        }catch(err){
            console.log(err)
        }
    }



    return(
        <form onSubmit ={handleSubmit}>
            <textarea value={content}placeholder='Add a comment' onChange={(e) => setContent(e.target.value)} required/>
            <button type="submit" onClick={handleSubmit}> Add Comment </button>
        </form>
    )
}

export default CommentForm;
