
 // traz o express p/ o nosso codigo
import express from "express";

// cria nossa aplicação
const app = express();

// permite receber os dados em json
app.use(express.json());

// array com as músicas cadastradas
let musicas = [
    {
        id: 1,
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        genero: "Rock",
        anoLancamento: 1975,
        duracao: 354,
        situacao: "Ativa"
    },
    {
        id: 2,
        titulo: "Billie Jean",
        artista: "Michael Jackson",
        genero: "Pop",
        anoLancamento: 1982,
        duracao: 294,
        situacao: "Ativa"
    },
    {
        id: 3,
        titulo: "Garota de Ipanema",
        artista: "Tom Jobim",
        genero: "Bossa Nova",
        anoLancamento: 1962,
        duracao: 170,
        situacao: "Ativa"
    },
    {
        id: 4,
        titulo: "Lose Yourself",
        artista: "Eminem",
        genero: "Rap",
        anoLancamento: 2002,
        duracao: 326,
        situacao: "Inativa"
    }
];

// rota GET para listar todas as músicas
// app.get("/musicas", (req, res) => {
//     return res.status(200).json(musicas);
// });
app.get("/musicas", (req,res)=>{
    // pega os filtros enviados pela URL
    const{genero,situacao}=req.query;
    // cria uma lista com todas as musicas
    let resultado=musicas;
    // filtra pelo genero, se ele for informado
    if(genero){
        resultado=resultado.filter(musica=>musica.genero===genero);
    }
    // filtra pela situação, se ela for informada
    if(situacao){
        resultado=resultado.filter(musica=>musica.situacao===situacao);
    }
    // retorna as musicas encontradas
    return res.status(200).json(resultado);
})
// rota GET para buscar uma musica pelo ID
app.get("/musicas/:id", (req, res)=>{
    // pega o ID na URL  e converte para numero
    const id = Number(req.params.id);
    // procura no array uma musica com esse ID
    const musica=musicas.find(item=>item.id===id);
    // se não encontrar a musica retorna o erro 404
    if(!musica){
        return res.status(404).json({
            mensagem: "Musica não encontrada."
        });
    }
    // se encotrar, retornaa musica
    return res.status(200).json(musica);
});

// rota POST para cadastrar uma nova musica
app.post("/musicas",(req,res)=>{
    // recebe os dados enviados pelo usuario
    const{titulo, artista, genero, anoLancamento, duracao}=req.body;
    // verifica se todos os campos obrigatorios foram preenchidos
    if(!titulo || !artista || !genero || !anoLancamento || !duracao){
        return res.status(400).json({
            mensagem:"Título, artista, gênero, ano de lancamento e duração são obrigatórios"
        });
    }
    // gera um novo ID para a nova música
    const novoId = Math.max(0, ...musicas.map(m=>m.id))+1;
    // cria a nova música
    const NovaMusica={
        id: novoId,
        titulo,
        artista,
        genero,
        anoLancamento,
        duracao,
        situacao:"Ativa"
};
// adiciona a música no array
musicas.push(NovaMusica);
// retora a musica cadastrada
return res.status(201).json(NovaMusica);
});
// rota PUT para atualizar uma música pelo ID
app.put("/musicas/:id", (req,res)=>{
    // pega o ID informado na URL
    const id=Number(req.params.id);
    // procura a musica pelo ID
    const musica=musicas.find(item=>item.id===id);
    // verifica se a musica existe
    if(!musica){
        return res.status(404).json({
            mensagem: "Música não encontrada"
        });
    }
    // recebe os novos dados
    const{titulo, artista, genero, anoLancamento, duracao, situacao}=req.body;
    // verifica os campos obrigatorios
    if(!titulo||!artista||!genero||!anoLancamento||!duracao||!situacao){
        return res.status(400).json({
            mensagem:"Título, artista, gênero, ano de lançamento e duração são obrigatórios"
        });
    }
    // atualiza os dados da música
    musica.titulo=titulo;
    musica.artista=artista;
    musica.genero=genero;
    musica.anoLancamento=anoLancamento;
    musica.duracao=duracao;
    if(situacao!==undefined){
        musica.situacao=situacao
    }
    // retorna a musica atualizada
    return res.status(200).json(musica);
});
// rota DELETE para inativar uma musica pelo ID
app.delete("/musicas/:id", (req, res)=>{
    // pega o ID informado na URL 
    const id = Number(req.params.id);
    // prourar a musica pelo ID
    const musica=musicas.find(item=>item.id===id);
    // verifica se a musica existe
    if(!musica){
        return res.status(404).json({
            mensagem:"musica não encontrada"
        });
    }
    // altera a situação da musica para inativa
    musica.situacao="inativa";
    // retorna uma mensagem e a musica atualizada
    return res.status(200).json({
        mensagem:"Musica inativada com sucesso",
        musica:musica
    });
});
// liga o servidor na porta 3000
app.listen(3000, () => {
    // print pra mostrar que ta funcionando
    console.log("Musicoteca funcionando!");
});
