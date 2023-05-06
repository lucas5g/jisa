import { useEffect, useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { Form } from "../components/Form";
import { GameInterface, ModalityInterface, PlaceInterface, UserInterface } from "../interfaces";

const fields = [
  { key: 'date', value: 'Data', type:'date' },
  { key: 'startHours', value: 'Início', type:'time'},
  { key: 'endHours', value: 'Final', type:'time' },
  { key: 'place', value: 'Lugar' },
  { key: 'modality', value: 'Modalidade' },
  { key: 'user', value: 'Juíz'},

]



export function Game() {

  const [game, setGame] = useState({} as GameInterface)
  const uri = 'games'

  const { data, error }: { data: GameInterface[], error: any } = swr(uri)
  const { data: places }:{ data: PlaceInterface[]} = swr('places')
  const { data: modalities }:{ data: ModalityInterface[]} = swr('modalities')
  const { data: users }:{data:UserInterface[]} = swr('users')
   
  if (error) return <Error error={error} />
  if (!data || !places || !modalities || !users) return <Loading />

  const fieldsForm = [
    { key: 'date', value: 'Data', type:'date' },
    { key: 'startHours', value: 'Início', type:'time'},
    { key: 'endHours', value: 'Final', type:'time' },
    { key: 'placeId', value: 'Lugar', options:places },
    { key: 'modalityId', value: 'Modalidade', options: modalities },
    { key: 'userId', value: 'Juíz', options: users.filter(user => user.profile === 'judge') },

  ]

  const games = data.map( game => {
    return {
      ...game,
      place: places.find( place => place.id === game.placeId)?.name,
      modality: modalities.find( modality =>  modality.id === game.modalityId)?.name,
      user: users.find( user => user.id === game.userId )?.name
    }
  })

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={games}
          item={game}
          setItem={setGame}
          positionBottom={games.length * 100}
        />
        <Form 
          fields={fieldsForm}
          item={game}
          setItem={setGame}
          uri={uri}
        />
      </Main>
    </Layout>
  )
}