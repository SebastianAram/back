const {Router} = require('express')
const router = Router()
const {
    createTipoEquipo, 
    getTipoEquipo,
    getTipoID,
    editTipoID,
    deleteTipo
} = require('../controllers/tipoEquipo')


router.post('/', createTipoEquipo)

router.get('/', getTipoEquipo)

router.get('/:id', getTipoID)

router.put('/:id', editTipoID)

router.delete('/:id', deleteTipo)



module.exports = router