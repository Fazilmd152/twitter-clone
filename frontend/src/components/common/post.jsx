import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CommentPost, DeleteComment, deletePost, getAllpost, getFollowPost, likeUnlike } from "../../axios/actions/postActions";
import LoadingSpinner from "./LoadingSpinner";
import calculateTimeElapsed from "../../utils/time/calculateTime";

const Post = ({ post, user, deleting, loading }) => {
	const dispatch = useDispatch()
	const [comment, setComment] = useState("");
	const postOwner = post.user;

	const isLiked = post.likes?.includes(user._id);

	const isMyPost = post.user?._id == user._id;

	const formattedDate = calculateTimeElapsed(post.createdAt);

	//const isCommenting = loading;

	const handleDeletePost = () => { dispatch(deletePost(post._id)) };

	const handlePostComment = (e) => {
		e.preventDefault();
		dispatch(CommentPost({ id: post._id, text: comment }))
	};

	const [pressed, setPressed] = useState(isLiked)
	const [pId, setPId] = useState("")


	const handleLikePost = (id) => {
		dispatch(likeUnlike(post._id))
		setPressed(!pressed)
		setPId(id)
	}

	if (post._id === pId) {
		console.log("isLiked :", isLiked);
		console.log("pressed :", pressed);
		console.log("length is :", post.likes?.length);

	}

	const handleCommentDelete = (id) => {
		dispatch(DeleteComment({ id: post._id, commentId: id }))
	}

	return (
		<>
			<div className='flex gap-2 items-start p-4 border-b border-gray-700'>
				<div className='avatar'>
					<Link to={`/profile/${postOwner?.username}`} className='w-8 rounded-full overflow-hidden'>
						<img src={postOwner?.profileImg || "/avatar-placeholder.png"} />
					</Link>
				</div>
				<div className='flex flex-col flex-1'>
					<div className='flex gap-2 items-center'>
						<Link to={`/profile/${postOwner?.username}`} className='font-bold'>
							{postOwner?.fullName}
						</Link>
						<span className='text-gray-700 flex gap-1 text-sm'>
							<Link to={`/profile/${postOwner?.username}`}>@{postOwner?.username}</Link>
							<span>·</span>
							<span>{formattedDate}</span>
						</span>
						{isMyPost && (
							<span className='flex justify-end flex-1'>
								{!deleting && (<FaTrash className='cursor-pointer hover:text-red-500' onClick={handleDeletePost} />)}
								{deleting && (<LoadingSpinner size="sm" />)}

							</span>
						)}
					</div>
					<div className='flex flex-col gap-3 overflow-hidden'>
						<span>{post.text}</span>
						{post.img && (
							<img
								src={post.img}
								className='h-80 object-contain rounded-lg border border-gray-700'
								alt=''
							/>
						)}
					</div>
					<div className='flex justify-between mt-3'>
						<div className='flex gap-4 items-center w-2/3 justify-between'>
							<div
								className='flex gap-1 items-center cursor-pointer group'
								onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
							>
								<FaRegComment className='w-4 h-4  text-slate-500 group-hover:text-sky-400' />
								<span className='text-sm text-slate-500 group-hover:text-sky-400'>
									{post.comment?.length}
								</span>
							</div>
							{/* We're using Modal Component from DaisyUI */}
							<dialog id={`comments_modal${post._id}`} className='modal border-none outline-none'>
								<div className='modal-box rounded border border-gray-600'>
									<h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
									<div className='flex flex-col gap-3 max-h-60 overflow-auto'>
										{post.comment?.length === 0 && (
											<p className='text-sm text-slate-500'>
												No comments yet 🤔 Be the first one 😉
											</p>
										)}
										{post.comment?.map((comment) => (
											<div key={comment._id} className='flex gap-2 items-start'>
												<div className='avatar'>
													<div className='w-8 rounded-full'>
														<img
															src={comment.user.profileImg || "/avatar-placeholder.png"}
														/>
													</div>
												</div>
												<div className='flex flex-col'>
													<div className='flex items-center  gap-1'>
														<span className='font-bold'>{comment.user.fullName}</span>
														<span className='text-gray-700 text-sm'>
															@{comment.user.username}

														</span>
														{
															comment.user._id==user._id&&(<FaTrash className="w-3"
																onClick={() => handleCommentDelete(comment._id)} />)
														}
														
													</div>


													<div className='text-sm'>{comment.text}</div>
												</div>
											</div>
										))}
									</div>
									<form
										className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
										onSubmit={handlePostComment}
									>
										<textarea
											className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800'
											placeholder='Add a comment...'
											value={comment}
											onChange={(e) => setComment(e.target.value)}
										/>
										<button className='btn btn-primary rounded-full btn-sm text-white px-4'>
											{loading ? (
												<span className='loading loading-spinner loading-md'></span>
											) : (
												"Post"
											)}
										</button>
									</form>
								</div>
								<form method='dialog' className='modal-backdrop'>
									<button className='outline-none'>close</button>
								</form>
							</dialog>
							<div className='flex gap-1 items-center group cursor-pointer'>
								<BiRepost className='w-6 h-6  text-slate-500 group-hover:text-green-500' />
								<span className='text-sm text-slate-500 group-hover:text-green-500'>0</span>
							</div>
							<div className='flex gap-1 items-center group cursor-pointer'
								onClick={() => handleLikePost(post._id)}>
								{!pressed && (
									<FaRegHeart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
								)}
								{pressed && <FaRegHeart className='w-4 h-4 cursor-pointer text-pink-500 ' />}

								<span
									className={`text-sm text-slate-500 group-hover:text-pink-500 ${pressed ? "text-pink-500" : ""
										}`}
								>
									{pressed ? (post.likes?.length + (isLiked ? 0 : pressed)) : (!pressed ? post.likes?.length - (pressed ? pressed : (isLiked ? !pressed : pressed)) : post.likes?.length - 1)}

								</span>
							</div>
						</div>
						<div className='flex w-1/3 justify-end gap-2 items-center'>
							<FaRegBookmark className='w-4 h-4 text-slate-500 cursor-pointer' />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Post;