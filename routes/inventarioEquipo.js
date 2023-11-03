const {Router} = require('express')
const router = Router()
const {
    createInventarioEquipo, 
    getInventarioEquipo,
    getInventarioID,
    editInventario,
    deleteInventario
} = require('../controllers/inventarioEquipo')





router.post('/', createInventarioEquipo)

router.get('/', getInventarioEquipo)

router.get('/:id', getInventarioID)

router.put('/:id', editInventario)

router.delete('/:id', deleteInventario)



module.exports = router