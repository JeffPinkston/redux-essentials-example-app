import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PostAuthor } from "./PostAuthor"
import { TimeAgo } from "./TimeAgo"
import { ReactionButtons } from "./ReactionButtons"
import { fetchPosts, getFetchPostsError, getFetchPostsStatus, selectAllPosts } from "./postsSlice"
import { useEffect } from "react"
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ post }) => {
    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    )
}

export const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts)

    const postStatus = useSelector(getFetchPostsStatus)

    useEffect(() => {
        if(postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content

    if (postStatus === 'loading') {
        content = <Spinner text="Loading..." />
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

        content = orderedPosts.map(post => (
            <PostExcerpt key={post.id} post={post} />
        ))
    } else if (postStatus === 'failed') {
        content = <div>{getFetchPostsError}</div>
    }

   

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}