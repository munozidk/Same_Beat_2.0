import type { Post } from '../../types';
import PostCard from '../PostCard/PostCard';
import './SPostFeed.css';

interface Props {
    posts: Post[];
}
export default function PostFeed({ posts}: Props) {
    return (
        <main className='post-feed'>
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </main>
    )
}

