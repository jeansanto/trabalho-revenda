exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('manutencao').del()
  await knex('manutencao').insert([
    {servico: "troca de óleo e filtro", mecanico: "Miguel", custo: 30.00, carro_id: 1 },
    {servico: "troca de pastilha de freio", mecanico: "Pedro", custo: 40.00, carro_id: 2 },
    {servico: "troca de disco de freio", mecanico: "Vini", custo: 70.00, carro_id: 3 },
    {servico: "troca de pneu", mecanico: "Felipe", custo: 100.00, carro_id: 4 }
  ]);
};
