const MarcaEquipo = require('../models/marcaEquipo')
const {request, response} = require('express')


//Crear una marca

const createMarcaEquipo = async (req = request, res = response) => {
    console.log(req.body)
    
    try{
        const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ''
        console.log(nombre)
        const marcaEquipoBD = await MarcaEquipo.findOne({nombre})
        if(marcaEquipoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const marcaEquipo = new MarcaEquipo(data)
        console.log(marcaEquipo)
        await marcaEquipo.save()
        return res.status(201).json(marcaEquipo)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Consultar todas las marcas

const getMarcaEquipo = async (req = request, res = response) => {
    try{
        const {estado} = req.query;
        
        const marcaEquiposDB = await MarcaEquipo.find({estado})
        return res.json(marcaEquiposDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Consultar marca por ID

const getMarcaID = async (req = request, res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const query = {_id: id}
        const marcaDB = await MarcaEquipo.findOne(query)
        return res.json(marcaDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

//Editar marca por su ID

const editMarcaID = async (req = request, res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaactualizacion = new Date()
        const marcaedit = await MarcaEquipo.findByIdAndUpdate(id, data, {new: true})
        console.log(marcaedit)
        return res.json(marcaedit)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

//Eliminar marca por su ID

const deleteMarca = async (req = request, res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const marcaDB = await MarcaEquipo.findById(id)
        if(!marcaDB){
            return res.status(404).json({msg: 'La marca indicada no existe'})
        }
        await MarcaEquipo.findByIdAndDelete(id)
        return res.status(204).json({msg: 'La marca ha sido eliminada: ', id})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

module.exports = {
    createMarcaEquipo, 
    getMarcaEquipo,
    getMarcaID,
    editMarcaID,
    deleteMarca
}