const {Router} = require('express')
const router = Router()
const {
    createEstadoEquipo, 
    getEstadoEquipo,
    getEstadoEquipoID,
    editEstadoID,
    deleteEstado
} = require('../controllers/estadoEquipo')

router.post('/', createEstadoEquipo)

router.get('/', getEstadoEquipo)

router.get('/:id', getEstadoEquipoID)

router.put('/:id', editEstadoID)

router.delete('/:id', deleteEstado)

module.exports = router