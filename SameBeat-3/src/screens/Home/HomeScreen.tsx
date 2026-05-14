import { useState } from 'react'
import PostFeed from '../../components/PostFeed/PostFeed'
import PostModal from '../../components/PostModal/PostModal'
import TopBar from '../../components/TopBar/TopBar'
import Suggestions from '../../components/Suggestions/Suggestions'
import type { Post } from '../../types'
import { posts as initialPosts } from '../../data'
import './SHomeScreen.css'

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [modalOpen, setModalOpen] = useState(false)

  function handleNewPost(newPost: Post) {
    setPosts([newPost, ...posts])
  }

  return (
    <div className="home-screen">
      <TopBar title="Home" />

      <Suggestions />
      <PostFeed posts={posts} />

      <PostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleNewPost}
        currentPosts={posts}
      />
    </div>
  )
}
