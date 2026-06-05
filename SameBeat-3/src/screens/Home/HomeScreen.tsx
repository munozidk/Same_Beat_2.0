import PostFeed from '../../components/PostFeed/PostFeed'
import TopBar from '../../components/TopBar/TopBar'
import Suggestions from '../../components/Suggestions/Suggestions'
import { usePostContext } from '../../contexts/PostContext'
import { useFilter } from '../../contexts/FilterContext'
import './SHomeScreen.css'

/* 
  COMPONENTE HOMESCREEN

  Este componente maneja:

  - feed de posts via PostContext
  - el modal vive en MainLayout
*/

export default function HomeScreen() {

  // =========================
  // CONTEXT
  // =========================

  const { posts } = usePostContext();
  const { searchQuery } = useFilter();

  // Filtramos las publicaciones según el texto de búsqueda ingresado en el TopBar.
  const filteredPosts = posts.filter(post => 
    post.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    <div className="home-screen">

      {/* TOP BAR */}

      <TopBar title="Home" />

      {/* SUGERENCIAS */}

      <Suggestions />

      {/* FEED */}

      <PostFeed posts={filteredPosts} />

    </div>
  );
}