import PostFeed from '../../components/PostFeed/PostFeed'
import TopBar from '../../components/TopBar/TopBar'
import Suggestions from '../../components/Suggestions/Suggestions'
import { usePostContext } from '../../contexts/PostContext'
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

  return (

    <div className="home-screen">

      {/* TOP BAR */}

      <TopBar title="Home" />

      {/* SUGERENCIAS */}

      <Suggestions />

      {/* FEED */}

      <PostFeed posts={posts} />

    </div>
  );
}