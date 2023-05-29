import moment from "moment";
import { GameInterface, ModalityInterface, PlaceInterface, TeamInterface, UserInterface } from "../../interfaces";
import { Card } from "../Card";
import { Input } from "../Input";
import { FormEvent, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Button } from "../Button";
import { api } from "../../utils/axios";
import { mutate } from "swr";
import { MultiSelect } from "../MultiSelect";

interface Props {
  places: PlaceInterface[]
  modalities: ModalityInterface[]
  users: UserInterface[]
  teams: TeamInterface[]
  game: GameInterface
  setGame: (game: GameInterface) => void
}

export function Form({ places, modalities, users, teams: teamsWithoutFilter, game, setGame }: Props) {

  const [loading, setLoading] = useState(false)
  // const [teams, setTeams] = useState([] as TeamInterface[])
  const [selectedTeams, setSelectedTeams] = useState([] as number[])

  useEffect(() => {
    if(!game.teams) {
      setSelectedTeams([])
      return 
    }
    setSelectedTeams(game.teams)
  },[game.id])

  const teams = teamsWithoutFilter.filter(team => team.modalityId === game.modalityId)

  return (
    <Card width={80}>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit}
      >

        <Input
          type="date"
          name="date"
          label="Date"
          value={game.date ? moment(game.date).format('YYYY-MM-DD') : ''}
          onChange={event => setGame({ ...game, date: event.target.value })}
          inputLabelOpen
          error={game.errors?.date}
        />

        <div className="flex gap-3">
          <Input
            type='time'
            name="startHours"
            label='Início'
            onChange={event => setGame({ ...game, startHours: event.target.value })}
            value={game.startHours ?? ''}
            inputLabelOpen
            error={game.errors?.startHours}

          />
          <Input
            type='time'
            name="endHours"
            label='Fim'
            onChange={event => setGame({ ...game, endHours: event.target.value })}
            value={game.endHours ?? ''}
            inputLabelOpen
            error={game.errors?.endHours}

          />
        </div>
        <Input
          name='userId'
          label="Juíz"
          value={game.userId ?? ''}
          onChange={event => setGame({ ...game, userId: event.target.value })}
          options={users}
          error={game.errors?.userId}

        />
        <Input
          name='placeId'
          label="Local"
          value={game.placeId ?? ''}
          onChange={event => setGame({ ...game, placeId: event.target.value })}
          options={places}
          error={game.errors?.placeId}

        />
        <Input
          name='modalityId'
          label="Modalidade"
          value={game.modalityId ?? ''}
          onChange={event => setGame({ ...game, modalityId: event.target.value })}
          options={modalities}
          error={game.errors?.modalityId}

        />

        <MultiSelect
          label="Equipes"
          items={teams}
          selected={selectedTeams}
          setSelected={setSelectedTeams}
          columns={2}
          limit={modalities.find(modality => modality.id === game.modalityId)?.teamsQuantity}
        />

        <div className="flex justify-end gap-3 ">
          <Button
            value={game.id ? 'Atualizar' : 'Cadastrar'}
            disabled={loading}
          />
          <Button
            value={'Cancelar'}
            secondary
            type="reset"
            onClick={() => setGame({} as GameInterface)}
          />
        </div>
      </form>
    </Card>
  )

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    // return console.log(selectedTeams)
    setLoading(true)
    try {
      const body = {
        ...game,
        date: game.date ? new Date(game.date).toISOString() : undefined,
        teams: selectedTeams
        // teams: 
      }

      if (game.id) {
        await api.put(`games/${game.id}`, body)
      } else {
        const { data } = await api.post('games', body)
        setGame(data)
      }
      mutate('games')

    } catch (error: any) {
 
      if (error.response.data.errors === 400) {
        return setGame({ ...game, errors: error.response.data.errors })
      }
      alert('Erro no servidor.')
    } finally {
      setLoading(false)
    }
  }
}