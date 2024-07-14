import RankData from '../models/RankData.js';

class ranksControllers {

  static listRank = (req, res) => {
    RankData.find()
      .exec((err, ranks) => {
        if (err) {
          res.status(500).send({ message: `falha ao listar ranks, log: ${err.message}` })
        } else {
          res.status(200).json(ranks)
        }
      })
  }

  static saveRank = (req, res) => {
    let rank = new RankData(req.body);

    rank.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar o rank, ;(` });
      } else {
        res.status(201).send(rank.toJSON());
      }
    });
  }

  static excluirRank = (req, res) => {
    let id = req.params.id;
    RankData.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).send({ message: `O rank ${id} nao foi deletado` });
      } else {
        res.status(200).send({ message: 'rank deletado com sucesso' });
      }
    });
  }

}

export default ranksControllers;
