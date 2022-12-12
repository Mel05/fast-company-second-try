import React from 'react'
import PropTypes from 'prop-types'
import Comment from './comment'

const CommentsList = ({ comments, handleRemoveComment }) => {
	return comments.map(comment => (
		<Comment
			key={comment._id}
			{...comment}
			handleRemoveComment={handleRemoveComment}
		/>
	))
}

CommentsList.propTypes = {
	comments: PropTypes.array,
	handleRemove: PropTypes.func,
}

export default CommentsList
