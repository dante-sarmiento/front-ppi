import ClientDataWidget from '@/components/ClientsManagement/ClientDataWidget'
import Layout from '@/layout'
import React, { useContext, useState } from 'react'
import { Context } from '@/context/ContextProvider';

const Perfil = () => {
    const [modalInfo, setModalInfo] = useState({
    type: 0,
    message: "",
    active: false
  })
  const context = useContext(Context)
  if (!context) console.log("Error de contexto")
  const { user } = context

  console.log("user", user);
  return (
    <Layout>
        <ClientDataWidget 
        userData={user}/>
    </Layout>
  )
}

export default Perfil