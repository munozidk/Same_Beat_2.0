import { useState } from "react"

import MatchCard from "../../components/MatchCard/MatchCard"
import Suggestions from "../../components/Suggestions/Suggestions"

import usersData from '../../data/users/users.json'

import type { User } from '../../types/index'

import "./MatchScreen.css"

// Componente que muestra las tarjetas de match (swipe)
const MatchScreen = () => {

  // Estado: lista de usuarios disponibles para hacer match
  // Al inicio carga todos los usuarios del JSON
  const [users, setUsers] =
    useState<User[]>(usersData as User[])

  // Función que se ejecuta cuando el usuario hace swipe
  const handleSwipe = (
    direction: "left" | "right"
  ) => {

    // Muestra en consola si fue left o right
    console.log(direction)

    // Elimina el primer usuario de la lista
    // prev.slice(1) devuelve todos MENOS el primero
    setUsers((prev) => prev.slice(1))
  }

  return (

    <div className="match-screen__mobile-suggestions">

      {/* SUGERENCIAS DE USUARIOS */}
      <Suggestions />

      {/* Si hay usuarios, muestra la tarjeta de match */}
      {users.length > 0 ? (

        <MatchCard
          user={users[0]}
          onSwipe={handleSwipe}
          isTopCard={true}
        />

      ) : (

        // Si NO hay más usuarios, muestra mensaje
        <div className="match-screen__empty">

          <h2>No more matches</h2>

        </div>

      )}

    </div>
  )
}

export default MatchScreen