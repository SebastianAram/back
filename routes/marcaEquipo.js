const {Router} = require('express')
const router = Router()

const {
    createMarcaEquipo, 
    getMarcaEquipo,
    getMarcaID,
    editMarcaID,
    deleteMarca
} = require('../controllers/marcaEquipo')



router.post('/', createMarcaEquipo)

router.get('/', getMarcaEquipo)

router.get('/:id', getMarcaID)

router.put('/:id', editMarcaID)

router.delete('/:id', deleteMarca)


module.exports = router