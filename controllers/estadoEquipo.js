const EstadoEquipo = require('../models/estadoEquipo')
const {request, response} = require('express')
const estadoEquipo = require('../models/estadoEquipo')


//Crear estado

const createEstadoEquipo = async (req = request, res = response) => {
    console.log(req.body)
    
    try{
        const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ''
        console.log(nombre)
        const estadoEquipoBD = await EstadoEquipo.findOne({nombre})
        if(estadoEquipoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const estadoEquipo = new EstadoEquipo(data)
        console.log(estadoEquipo)
        await estadoEquipo.save()
        return res.status(201).json(estadoEquipo)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }   
}

//Consultar todos los estados

const getEstadoEquipo = async (req = request, res = response) => {
    try{
        const {estado} = req.query;
        
        const estadoEquiposDB = await EstadoEquipo.find({estado})
        return res.json(estadoEquiposDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Consultar estado por ID

const getEstadoEquipoID = async (req = request, res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const query = {_id: id}
        const estadoDB = await EstadoEquipo.findOne(query)
        return res.json(estadoDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}


//Editar estado por su ID

const editEstadoID = async (req = request, res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaactualizacion = new Date()
        const estadoedit = await EstadoEquipo.findByIdAndUpdate(id, data, {new: true})
        console.log(estadoedit)
        return res.json(estadoedit)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}


//Borrar estado por ID

const deleteEstado = async (req = request, res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const estadoDB = await EstadoEquipo.findById(id)
        if(!estadoDB){
            return res.status(404).json({msg: 'El estado indicado no existe'})
        }
        await EstadoEquipo.findByIdAndDelete(id)
        return res.status(204).json({msg: 'El estado ha sido eliminado: ', id})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

module.exports = {
    createEstadoEquipo, 
    getEstadoEquipo,
    getEstadoEquipoID,
    editEstadoID,
    deleteEstado
}