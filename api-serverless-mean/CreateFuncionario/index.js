const createMongoClient = require('../shared/mongo')

module.exports = async function (context, req) {
    const funcionario = req.body || {}

    if (funcionario){
        context.res = {
            status: 400,
            body: 'Os dados do funcionário são obrigatórios'
        }
    }

    const { db, connection } = await createMongoClient()

    const Funcionarios = db.collection('funcionarios')

    try {
        const funcionarios = await Funcionarios.insert(funcionario)
        connection.close()

        context.res = {
            status: 201,
            body: funcionarios.ops[0]
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Erro ao criar funcionário'
        }
    }
}