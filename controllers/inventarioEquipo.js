const InventarioEquipo = require('../models/inventarioEquipo')
const {request, response} = require('express')
const UsuarioEquipo = require('../models/usuarioEquipo')
const MarcaEquipo = require('../models/marcaEquipo')
const EstadoEquipo = require('../models/estadoEquipo')
const TipoEquipo = require('../models/tipoEquipo')


//Crear Objeto en el inventario

const createInventarioEquipo = async (req = request, res = response) => {
    console.log(req.body)
    
    try{
        const data = req.body
        console.log(data)
        const {usuarioEquipo, marcaEquipo, estadoEquipo, tipoEquipo} = data;
        const usuarioEquipoDB = UsuarioEquipo.findOne({
            _id: usuarioEquipo._id,
            estado: true
        })
        if(!usuarioEquipoDB){
            return res.status(400).json({msg: 'Usuario Invalido'})
        }
        const marcaEquipoDB = MarcaEquipo.findOne({
            _id: marcaEquipo._id,
            estado: true
        })
        if(!marcaEquipoDB){
            return res.status(400).json({msg: 'Marca Invalida'})
        }
        const estadoEquipoDB = EstadoEquipo.findOne({
            _id: estadoEquipo._id,
            estado: true
        })
        if(!estadoEquipoDB){
            return res.status(400).json({msg: 'Estado Invalido'})
        }
        const tipoEquipoDB = TipoEquipo.findOne({
            _id: tipoEquipo._id,
            estado: true
        })
        if(!tipoEquipoDB){
            return res.status(400).json({msg: 'Tipo Invalido'})
        }
        const inventarioEquiposDB = new InventarioEquipo(data)
        
        await inventarioEquiposDB.save()
        
        return res.status(201).json(inventarioEquiposDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Consultar todo el inventario

const getInventarioEquipo = async (req = request, 
    res = response) => {
        try{
            const inventariosDB = await InventarioEquipo.find()
                .populate({
                    path: 'usuarioEquipo',
                    match: { estado: true }
                })
                .populate({
                    path: 'marcaEquipo',
                    match: { estado: true }
                })
                .populate({
                    path: 'estadoEquipo',
                    match: { estado: true }
                })
                .populate({
                    path: 'tipoEquipo',
                    match: { estado: true }
                })
            return res.json(inventariosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

//Consultar inventario por ID

const getInventarioID = async (req = request, res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const query = {_id: id}
        const inventarioDB = await InventarioEquipo.findOne(query)
        return res.json(inventarioDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

//Editar inventario

const editInventario = async (req = request, res = response) => {
    try{
        const {id} = req.params
        const data = req.body
        const inventario = await InventarioEquipo.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(inventario)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

//Eliminar inventario

const deleteInventario = async (req = request, res = response) =>{
    try{
        const {id} = req.params
        await InventarioEquipo.findByIdAndDelete(id, {new: true})
        return res.status(204).json({})
    }catch(e){
        console.log(e)
        return res.status(500).json ({msj: e})
    }
}

module.exports = {
    createInventarioEquipo,
    getInventarioEquipo,
    getInventarioID,
    editInventario,
    deleteInventario
}