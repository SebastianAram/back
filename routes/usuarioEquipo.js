const {Router} = require('express')
const router = Router()

const {
    createUsuarioEquipo, 
    getUsuarioEquipo,
    getUsuarioID,
    editUsuarioID,
    deleteUsuario
} = require('../controllers/usuarioEquipo')

router.post('/', createUsuarioEquipo)

router.get('/', getUsuarioEquipo)

router.get('/:id', getUsuarioID)

router.put('/:id', editUsuarioID)

router.delete('/:id', deleteUsuario)

module.exports = router