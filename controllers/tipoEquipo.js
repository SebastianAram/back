const TipoEquipo = require('../models/tipoEquipo')
const {request, response} = require('express')


//Crear Tipo de Equipo

const createTipoEquipo = async (req = request, res = response) => {
    console.log(req.body)
    
    try{
        const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ''
        console.log(nombre)
        const tipoEquipoBD = await TipoEquipo.findOne({nombre})
        if(tipoEquipoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const tipoEquipo = new TipoEquipo(data)
        console.log(tipoEquipo)
        await tipoEquipo.save()
        return res.status(201).json(tipoEquipo)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Consultar todos los tipos de equipos

const getTipoEquipo = async (req = request, res = response) => {
    try{
        const {estado} = req.query;
        
        const tipoEquiposDB = await TipoEquipo.find({estado})
        return res.json(tipoEquiposDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


//Consultar tipo de equipo por ID

const getTipoID = async (req = request, res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const query = {_id: id}
        const tipoDB = await TipoEquipo.findOne(query)
        return res.json(tipoDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

//Editar Tipo Equipo por ID

const editTipoID = async (req = request, res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaactualizacion = new Date()
        const tipoedit = await TipoEquipo.findByIdAndUpdate(id, data, {new: true})
        console.log(tipoedit)
        return res.json(tipoedit)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

//Eliminar tipo de equipo por ID

const deleteTipo = async (req = request, res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const tipoDB = await TipoEquipo.findById(id)
        if(!tipoDB){
            return res.status(404).json({msg: 'El tipo indicado no existe'})
        }
        await TipoEquipo.findByIdAndDelete(id)
        return res.status(204).json({msg: 'El tipo ha sido eliminado: ', id})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}


module.exports = {
    createTipoEquipo, 
    getTipoEquipo,
    getTipoID,
    editTipoID,
    deleteTipo
}