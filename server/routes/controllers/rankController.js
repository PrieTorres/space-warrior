import RankData from '../models/RankData.js';

class RanksControllers {

  static listRank = async (req, res) => {
    try {
      const ranks = await RankData.find().exec();

      res.status(200).json(ranks);
    } catch (err) {
      res.status(500).send({ message: `falha ao listar ranks, log: ${err?.message}` })
    }
  }

  static saveRank = async (req, res) => {
    try {
      let rank = new RankData(req.body);

      await rank.save();
      res.status(201).send(rank?.toJSON());

    } catch (err) {
      res.status(500).send({ message: `${err?.message} - falha ao cadastrar o rank, ;(` });
    }
  }

  static deleteRank = (req, res) => {
    let id = req.params.id;
    RankData.findByIdAndDelete(id);
  }

}

export default RanksControllers;
