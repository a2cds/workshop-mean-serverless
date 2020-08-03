// @ts-nocheck

const { ObjectID } = require('mongodb')
const createMongoClient = require('../shared/mongo')

module.exports = async function(context, req) {
    const { id } = req.params

    if (!id) {
        context.res = {
            status: 400,
            body: 'Os campos são obrigatórios'
        }

        return
    }

    const { db, connection } = await createMongoClient()
    const Funcionarios = db.collection('funcionarios')

    try {
        await Funcionarios.findOneAndDelete({ _id: ObjectID(id)})
        connection.close()

        context.res = {
            status: 204,
            body: 'Funcionário excluído com sucesso'
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Erro ao excluir funcionário ' + id
        }
        
    }
}