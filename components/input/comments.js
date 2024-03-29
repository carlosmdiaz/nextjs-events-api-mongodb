import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [boolComment, setBoolComment] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if(showComments) {
      fetch('/api/comments/' + eventId)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
        setBoolComment(false);
      });
    }
  }, [showComments, boolComment]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    setBoolComment(true);
    const newComment = {
      email: commentData.email,
      name: commentData.name,
      text: commentData.text,
    }
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler} className='commentsButton'>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments}/>}
    </section>
  );
}

export default Comments;
