import { useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [userId, setUserId] = useState("");
const [nameToUpdate, setNameToUpdate] = useState("");
const [emailToUpdate, setEmailToUpdate] = useState("");
const [userIdToUpdate, setUserIdToUpadate] = useState("");
const [userIdToDelete, setUserIdToDelete] = useState("");

const fetchAllUser = api.example.getAll.useQuery();
const fetchOneUser = api.example.getOne.useQuery({id: userId});

const createUserMutation = api.example.createUser.useMutation();
const updateUserMutation = api.example.updateUser.useMutation();
const deleteUserMutation = api.example.deleteUser.useMutation();

//handle

const handleCreateUser = async () => {
  try {
    await createUserMutation.mutateAsync({
      name: name,
      email: email,
    });
    setName("");
    setEmail("");
    fetchAllUser.refetch();
  } catch (error) {
  console.log(error)
    
  }
}


const handleDeleteUser = async () => {
  try {
    await deleteUserMutation.mutateAsync({
      id: userIdToDelete
    });
    setUserIdToDelete("");
    fetchAllUser.refetch();
  } catch (error) {
    console.log(error);
  }
}

const handleUpdateUser = async () => {
  try {
    await updateUserMutation.mutateAsync({
      id: userIdToUpdate,
      name: nameToUpdate,
      email: emailToUpdate,
    });
    setUserIdToUpadate("");
    setNameToUpdate("");
    setEmailToUpdate("");
    fetchAllUser.refetch();
  } catch (error) {
    console.log(error)
  }
}


  return (
    <>
     <div className="mx-auto p-14 ">
      {/* Ver todos */}
        <div className="mb-4 shadow-xl border w-64 p-8">
          <h2>Ver todos los usuarios </h2>
          <button className="py-2 px-4 text-white rounded bg-blue-500" onClick={() => fetchAllUser.refetch()}>Ver</button>
        </div>
        <div className="grid grid-cols-3  gap-4 mb-4 text-black mt-8">
          <p>Id</p>
          <p>Nombre</p>
          <p>Email</p>
        </div>
        {fetchAllUser.data && fetchAllUser.data.map((user) => (
          <div key={user.id} className="grid  grid-cols-3 mt-8 gap-4 mb-4">
         <p>{user.id}</p>
         <p>{user.name}</p>
         <p>{user.email}</p>

          </div>
        ))}

{/* Buscar usuario */}
        <div className="mt-24  w-72 border m-auto shadow-xl p-8">
          <h2>Buscar usuario por Id</h2>
<input type="text" className="border bg-zinc-300 ronuded px-4 py-2 border-black mt-4" placeholder="Busca un usuario" value={ userId || ""} onChange={(e) => setUserId(String(e.target.value))} />
<button className="rounded bg-blue-500 py-2 px-4 text-white  mt-5" onClick={() => fetchOneUser.refetch()}>Buscar</button>
        </div>
        {
          fetchOneUser.data && (
            <div className="mt-4">
              <p> Nombre: {fetchOneUser.data.name}</p>
              <p> Email: {fetchOneUser.data.email}</p>
            </div>
          )
        }

{/* Crear Usuario */}
<div className="grid grid-cols-3 gap-5 w-7/12 m-auto mt-24">
        <div className="p-8 shadow-xl w-80 m-auto border rounded">
<h2 className="font-bold text-2xl mb-4">Crear usuario</h2>
<div className="form-control mb-4 ">
<label htmlFor="" className="mr-4 font-bold">Nombre</label>
<input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} className="border bg-zinc-300 rounded px-4 py-2 border-black mt-4" />
</div>
<div className="form-control mb-4  ">
<label htmlFor="" className="mr-4 font-bold ">Email</label>
<input type="email" placeholder="Email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="border bg-zinc-300 rounded px-4 py-2 border-black mt-4" />
</div>
<button className="px-4 py-2 rounded bg-blue-500 text-white " onClick={handleCreateUser}>Crear</button>
        </div>


        {/* Actualizar usuario */}

          <div className="p-8 shadow-xl w-80 m-auto border rounded ">
<h2 className="font-bold text-2xl mb-4">Modificar un usuario</h2>
<div className="form-control mb-4  ">
<label htmlFor="" className="mr-4 font-bold ">Id</label>
<input type="text" placeholder="Id" value={userIdToUpdate} onChange={(e) => setUserIdToUpadate(e.target.value)} className="border bg-zinc-300 rounded px-4 py-2 border-black mt-4" />
</div>
<div className="form-control mb-4 ">
<label htmlFor="" className="mr-4 font-bold">Nombre</label>
<input type="text" placeholder="Nombre" value={nameToUpdate} onChange={(e) => setNameToUpdate(e.target.value)} className="border bg-zinc-300 rounded px-4 py-2 border-black mt-4" />
</div>
<div className="form-control mb-4  ">
<label htmlFor="" className="mr-4 font-bold ">Email</label>
<input type="email" placeholder="Email@email.com" value={emailToUpdate} onChange={(e) => setEmailToUpdate(e.target.value)} className="border bg-zinc-300 rounded px-4 py-2 border-black mt-4" />
</div>
<button className="px-4 py-2 rounded bg-blue-500 text-white " onClick={handleUpdateUser}>Actualizar</button>
        </div>
       


        {/* Borrar usuario  */}

           <div className="mt-24  w-72 border m-auto shadow-xl p-8">
          <h2>Borrar usuario </h2>
<input type="text" className="border bg-zinc-300 ronuded px-4 py-2 border-black mt-4" placeholder="Ingrese el usuario" value={ userIdToDelete || ""} onChange={(e) => setUserIdToDelete(String(e.target.value))} />
<button className="rounded bg-red-500 py-2 px-4 text-white  mt-5" onClick={handleDeleteUser}>Borrar</button>
        </div>
         </div>
     </div>
    </>
  );
}
