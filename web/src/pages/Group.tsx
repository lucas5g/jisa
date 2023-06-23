import { useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { Form } from "../components/Form";

const fields = [
  { key: 'name', value: 'Nome', },
  // { key: 'unity', value: 'Unidade' },
  { key: 'quantity', value: 'Quantidade' }
]

const fieldsForm = [
  { key: 'name', value: 'Nome', },
  { key: 'unity', value: 'Unidade', options:[
    {id: 'bh', name:'Belo Horizonte'},
    {id: 'contagem', name:'Contagem'}
  ]}
]
interface Group {
  id: number
  name: string
  unity: 'bh' | 'contagem' 
}

export function Group() {

  const [group, setGroup] = useState({} as Group)
  const { data: groups, error } = swr('groups')
  localStorage.setItem('uri', 'groups')

  if (error) return <Error error={error} />
  if (!groups) return <Loading />

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={groups}
          item={group}
          setItem={setGroup}
          positionBottom={groups.length * 100}
          deleteItem
        />
        <Form
          fields={fieldsForm}
          item={group}
          setItem={setGroup}
          uri='groups'
        />

      </Main>
    </Layout>
  )
}