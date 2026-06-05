import { useEffect, useState } from "react"

import MatchCard from "../../components/MatchCard/MatchCard"
import Suggestions from "../../components/Suggestions/Suggestions"

import type { User } from '../../types/index'
import { mapSeedProfileToUser } from "../../lib/profileUtils"
import { useSeedProfiles } from "../../hooks/useSeedProfiles"

import "./MatchScreen.css"

const MatchScreen = () => {
  const { profiles: seedProfiles } = useSeedProfiles();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(seedProfiles.map((profile, index) => mapSeedProfileToUser(profile, index)));
  }, [seedProfiles]);

  const handleSwipe = (direction: "left" | "right") => {
    console.log(direction)
    setUsers((prev) => prev.slice(1))
  }

  return (
    <div className="match-screen__mobile-suggestions">
      <Suggestions />

      {users.length > 0 ? (
        <MatchCard
          user={users[0]}
          onSwipe={handleSwipe}
          isTopCard={true}
        />
      ) : (
        <div className="match-screen__empty">
          <h2>No more matches</h2>
        </div>
      )}
    </div>
  )
}

export default MatchScreen
