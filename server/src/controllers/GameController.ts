import { Request, Response } from "express";
import moment from "moment";
import 'moment/locale/pt-br'
import { z } from "zod";
import { Game } from "../models/Game";
import { GameBodyType } from "../utils/schemas";

export class GameController{

  static async index(req:Request, res:Response){

    const games = (await Game.findMany()).map( game => {
      return {
        ...game,
        date: moment(game.date).format('YYYY-MM-DD')
      }
    })

    return res.json(games)
  }

  static async show(req:Request, res:Response){
    const id = Number(req.params.id)

    return res.json(await Game.findUnique(id))
  }

  static async create(req: Request, res:Response){
    
    const data = req.body as GameBodyType
    return res.status(201).json(await Game.create(data))

  }

  static async update(req: Request, res:Response){

    const id = Number(req.params.id)
    const data = req.body as GameBodyType
    
    return res.json(await Game.update(id, data))
  }

  static async delete(req:Request, res: Response){

    const id = Number(req.params.id)

    return res.json(await Game.delete(id))
  }
}