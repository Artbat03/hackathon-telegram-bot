
import {MenuEntity} from "../entities/menu";

const createMenu = async (req,res) =>{

    try{
    const dataMenu = req.body;
    const{name,plates,price}=dataMenu;

    const newMenu = new MenuEntity({
        name:name,
        plates:plates,
        price:price,
    })
    const createdMenu = await newMenu.save()
    if (createdMenu) {
        return res.status(201).json({
            message: "Menu creado correctamente",
        })
    }
    }
    catch (error){
        console.log(error);
        return res.status(500).json({ error: "Ha habido un error" })
    }
};


const getMenu = async (req,res) => {
    try{
        const queryStrings = req.strings || {};
        const allMenu = await MenuEntity.find(queryStrings);
        if (allMenu) {
            return res.status(201).json(allMenu)
        }
    }
    catch (error){
        return res.status(500).json({error:"Ha habido un error"})
    }
}

module.exports = {
    createMenu,
    getMenu
}
