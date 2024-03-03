import { useState } from 'react';
import classes from './comment-list.module.css';

function CommentList() {
  const [loadComments, setLoadComments] = useState([]);

  fetch('/api/comments')
  .then((response) => response.json())
  .then((data) => {
    setLoadComments(data.comments);
  });
  
  return (
    <ul className={classes.comments}>
      {loadComments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
