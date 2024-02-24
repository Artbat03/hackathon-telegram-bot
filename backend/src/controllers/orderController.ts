import {OrderEntity} from "../entities/order"

const createOrder = async (req,res) =>{
    try{
    const data = req.body;
    const{chatUser,menu,completed}=data;

    const newOrder = new OrderEntity({
        ChatUser:chatUser,
        Menu:menu,
        completed:completed,
    })
    const createdOrder = await newOrder.save()
    if (createdOrder) {
        return res.status(201).json({
            message: "Orden creada correctamente",
        })
    }
    }
    catch(error){
        return res.status(500).json({ error: "Ha habido un error" })
    }
};


const getOrder = async(req,res) =>{
    try{
        const queryStrings = req.strings || {};
        const allOrder = await OrderEntity.find(queryStrings);
        if (allOrder) {
            return res.status(201).json(allOrder)
        }
    }
    catch (error){
        return res.status(500).json({error:"Ha habido un error"})
    }
}

module.exports ={
    createOrder,
    getOrder
}


