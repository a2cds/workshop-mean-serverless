// @ts-nocheck
const { ObjectID } = require('mongodb')
const createMongoClient = require('../shared/mongo')

module.exports = async function (context, req) {
    const { id } = req.params

    if (!id) {
        context.res = {
            status: 400,
            body: 'Por gentileza, informe o número correto de ID do funcionário'
        }

        return
    }

    const { db, connection } = await createMongoClient()

    const Funcionarios = db.collection('funcionarios')

    try {
        const body = await Funcionarios.findOne({ _id: ObjectID(id) })
        connection.close()
        
        context.res = {
            status: 200,
            body
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Erro ao listar o funcionário pelo ID'
        }
    }
}