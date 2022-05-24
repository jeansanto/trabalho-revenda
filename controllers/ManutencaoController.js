const dbKnex = require("../data/db_config");

module.exports = {
    // listagem
    async index(req, res) {
        try {
            const manutencao = await dbKnex("manutencao")
                .select("manutencao.id", "servico", "mecanico", "custo", "carro_id", "modelo")
                .innerJoin('carros as c', 'carro_id', 'c.id')
            res.status(200).json(manutencao);
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    },
    // inclusão
    async store(req, res) {
        const { servico, mecanico, custo, carro_id } = req.body;

        if (!servico || !mecanico || !custo || !carro_id) {
            res.status(400).json({ msg: "Enviar servico, mecanico, custo, carro_id" });
            return;
        }
        try {
            const novo = await dbKnex("manutencao").insert({ servico, mecanico, custo, carro_id });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    },
    // alteração
    async update(req, res) {
        const { servico, mecanico, custo, carro_id } = req.body;
        const id = req.params.id;
        if (!servico || !mecanico || !custo || !carro_id) {
            res.status(400).json({ msg: "Enviar servico, mecanico, custo, carro_id" });
            return;
        }
        try {
            await dbKnex("manutencao")
                .update({ servico, mecanico, custo, carro_id }).where({ id });
            res.status(200).json();
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    },
    // exclusão
    async destroy(req, res) {
        const id = req.params.id;
        try {
            await dbKnex("manutencao").del().where({ id });
            res.status(200).json();
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    },
    //estatisticas
    async dados(req, res) {
        try {
            const estatisticas = await dbKnex("manutencao").select("servico").count({ num: "id" })
                .sum({ total_custo: "custo" }).min({ menor_custo: "custo" }).max({ maior_custo: "custo" })
                .avg({ media: "custo" }).groupBy("servico");
            res.status(200).json({ estatisticas });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }
}