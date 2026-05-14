import { useState } from 'react'
import PostFeed from '../../components/PostFeed/PostFeed'
import PostModal from '../../components/PostModal/PostModal'
import SearchBar from '../../components/SearchBar/SearchBar'
import Suggestions from '../../components/Suggestions/Suggestions'
import type { Post } from '../../types'
import { posts as initialPosts } from '../../data'
import './SHomeScreen.css'

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredPosts = posts.filter(post =>
    post.text.toLowerCase().includes(search.toLowerCase()) ||
    post.user.toLowerCase().includes(search.toLowerCase())
  )

  function handleNewPost(newPost: Post) {
    setPosts([newPost, ...posts])
  }

  return (
    <div className="home-screen">
      {/* HEADER */}
      <div className="home-screen__header">
        <h1 className="home-screen__title">Home</h1>
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search posts..."
        />
      </div>

      {/* CONTENIDO CENTRAL */}
      <Suggestions />
      <PostFeed posts={filteredPosts} />

      {/* MODAL DE NUEVO POST */}
      <PostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleNewPost}
        currentPosts={posts}
      />
    </div>
  )
}
