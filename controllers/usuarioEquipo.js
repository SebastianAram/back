const UsuarioEquipo = require('../models/usuarioEquipo')
const {request, response} = require('express')


//Crear Usuario

const createUsuarioEquipo = async (req = request, res = response) => {
    console.log(req.body)
    
    try{
        const data = req.body
        const email = data.email
        const usuarioEquipoBD = await UsuarioEquipo.findOne({email})
        if(usuarioEquipoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        
        const usuarioEquipo = new UsuarioEquipo(data)
        console.log(usuarioEquipo)
        await usuarioEquipo.save()
        return res.status(201).json(usuarioEquipo)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Consultar todos los usuarios

const getUsuarioEquipo = async (req = request, res = response) => {
    try{
        const {estado} = req.query;
        
        const usuarioEquiposDB = await UsuarioEquipo.find({estado})
        return res.json(usuarioEquiposDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Consultar Usuario por ID

const getUsuarioID = async (req = request, res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const query = {_id: id}
        const usuarioDB = await UsuarioEquipo.findOne(query)
        return res.json(usuarioDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

//Editar Usuario por ID

const editUsuarioID = async (req = request, res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaactualizacion = new Date()
        const usuarioedit = await UsuarioEquipo.findByIdAndUpdate(id, data, {new: true})
        console.log(usuarioedit)
        return res.json(usuarioedit)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

//Eliminar Usuario por ID

const deleteUsuario = async (req = request, res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const usuarioDB = await UsuarioEquipo.findById(id)
        if(!usuarioDB){
            return res.status(404).json({msg: 'El usuario indicado no existe'})
        }
        await UsuarioEquipo.findByIdAndDelete(id)
        return res.status(204).json({msg: 'El usuario ha sido eliminado: ', id})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}



module.exports = {
    createUsuarioEquipo, 
    getUsuarioEquipo,
    getUsuarioID,
    editUsuarioID,
    deleteUsuario
}