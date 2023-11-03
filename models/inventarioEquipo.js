const {Schema, model} = require('mongoose')
const InventarioEquipoSchema = Schema(
    {
        serial: {
            type: String,
            required: [true, 'Serial Requerido'],
            unique: [true, 'Equipo ya existe']
        },
        modelo: {
            type: String,
            required: [true, 'Modelo Requerido'],
            unique: [true, 'El modelo debe ser unico']
        },
        descripcion: {
            type: String
        },
        foto: {
            type: String
        },
        color: {
            type: String
        },
        fechaCompra: {
            type: Date
        },
        precio: {
            type: Number
        },
        usuarioEquipo: {
            type: Schema.Types.ObjectId,
            ref: 'UsuarioEquipo',
            required: true
        },
        marcaEquipo: {
            type: Schema.Types.ObjectId,
            ref: 'MarcaEquipo',
            required: true
        },
        estadoEquipo: {
            type: Schema.Types.ObjectId,
            ref: 'EstadoEquipo',
            required: true
        },
        tipoEquipo: {
            type: Schema.Types.ObjectId,
            ref: 'TipoEquipo',
            required: true
        }
    }
)

module.exports = model('InventarioEquipo', InventarioEquipoSchema)