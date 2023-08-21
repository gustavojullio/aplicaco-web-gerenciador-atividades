const mongodb = require('mongodb')

const ClienteMongo = mongodb.MongoClient;
var cliente;

const conexao_bd = async () => {
    if(!cliente)
        cliente = await ClienteMongo.connect('mongodb://127.0.0.1:27017');
}

const bd = () => { 
    return cliente.db('atividades'); 
}


class AtividadeMongo {

    async close() {
        if (cliente) 
            cliente.close()
        cliente = undefined
    }

    async atualiza(atividade) {
        await conexao_bd();
        const colecao = bd().collection("atividades")
        await colecao.updateOne(
        { _id: new mongodb.ObjectId(atividade._id) },
        { $set: { prioridade: atividade.prioridade, titulo: atividade.titulo, texto: atividade.texto, data: atividade.data, executada: atividade.executada } }
        )
    }

    async cria(atividade) {
        await conexao_bd()
        const colecao = bd().collection("atividades")
        await colecao.insertOne(atividade)
    }


    async consulta(_id) {
        await conexao_bd()
        const colecao = bd().collection("atividades")
        const atividade = await colecao.findOne({ _id: new mongodb.ObjectId(_id) })

        return atividade
    }

    async deleta(_id) {
        await conexao_bd()
        const colecao = bd().collection("atividades")
        const doc = await colecao.findOne({ _id: new mongodb.ObjectId(_id) })
        if (!doc) {
            throw new Error(`Não existe a atividade com chave: ${_id}`)
        } else {
            await colecao.findOneAndDelete({ _id: new mongodb.ObjectId(_id) })
        }
    }

    async lista() {
        await conexao_bd()
        const colecao = bd().collection("atividades")
        var atividade = await colecao.find({}).toArray()
        return atividade
    }

    async qtd() {
        await conexao_bd()
        const colecao = bd().collection("atividades")
        const qtd = await colecao.count({})
        return qtd
    }

}

module.exports = new AtividadeMongo()











