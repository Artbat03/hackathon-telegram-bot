import api from "../utils/apiWrapper"

const GetMenu = async () =>{
    return api.get(`menu`)
    .then((res)=>res.data)
    .catch((e)=>console.log(e))
}