const {Schema, model} = require('mongoose')
const MarcaEquipoSchema = Schema(
    {
        nombre: {
            type: String,
            required: [true, 'Nombre requerido']
        },
        estado: {
            type: Boolean,
            default: true,
            required: true
        },
        fechacreacion: {
            type: Date,
            default: new Date()
        },
        fechaactualizacion: {
            type: Date,
            default: new Date() 
        }
    }
)

module.exports = model('MarcaEquipo', MarcaEquipoSchema)