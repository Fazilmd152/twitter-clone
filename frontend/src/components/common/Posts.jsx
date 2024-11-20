import PostSkeleton from "../skeletons/PostSkeleton";
//import { POSTS } from "../../utils/db/dummy";
import Post from "./post";
import { useDispatch, useSelector } from "react-redux";
import { getAllpost, getFollowPost, GetLikedPosts, GetUserPosts } from "../../axios/actions/postActions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { like } from "../../axios/slices/postSlice";

const Posts = ({ feedType }) => {

	const { loading, posts: p, count, feedType: feed, commentadded, postCreated ,deletepost} = useSelector(state => state.postState)

	const posts = structuredClone(p)


	const { user } = useSelector(state => state.authState)
	const { username } = useParams()
	const dispatch = useDispatch();



	useEffect(() => {
		const fetchPosts = async () => {
			switch (feedType) {
				case "following":
					dispatch(getFollowPost())
					break
				default:
					dispatch(getAllpost())
					break
			}

		}

		function userPost() {
			dispatch(GetUserPosts(username))
		}
		function getLikePost() {
			dispatch(GetLikedPosts({ id: user._id }))
		}

		if (username) {
			if (feed == "posts") {
				userPost()
			} else {
				getLikePost()

			}
			return
		}

		fetchPosts()


	}, [feedType, dispatch, username, feed,postCreated,deletepost,commentadded])



	

	return (
		<>
			{loading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{count == 0 && (
				<p className='text-center my-4'>No posts in this tab. Switch 👻</p>
			)}


			{!loading && Array.isArray(posts) && (
				<div>
					{posts?.map((post) => (
						<Post key={post._id} post={post} user={user}  />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;