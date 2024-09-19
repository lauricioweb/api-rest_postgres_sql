import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { subjectRepository } from "../repositories/subjectRepositories";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    try {
      const newRoom = roomRepository.create({ name });
      await roomRepository.save(newRoom);
      return res.status(201).json(newRoom);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { idRoom } = req.params;

    try {
      const room = await roomRepository.findOneBy({ id: Number(idRoom) });
      if (!room) {
        return res.status(404).json({ message: "aula não encontrada" });
      }

      const newVideo = videoRepository.create({
        title,
        url,
        room,
      });

      await videoRepository.save(newVideo);
      return res.status(201).json(newVideo);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async roomSubject(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { idRoom } = req.params;

    try {
      const room = await roomRepository.findOneBy({ id: Number(idRoom) });

      if (!room) {
        return res.status(404).json({ message: "aula não encontrada" });
      }

      const subject = await subjectRepository.findOneBy({
        id: Number(subject_id),
      });

      if (!subject) {
        return res.status(404).json({ message: "aula não encontrada" });
      }

      const roomUpdated = {
        ...room,
        subjects: [subject],
      };

      await roomRepository.save(roomUpdated);

      return res.status(200).json(room);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const rooms = await roomRepository.find({
        relations: {
          subjects: true,
          videos: true,
        },
      });

      return res.json(rooms);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "erro ao buscar" });
    }
  }
}
