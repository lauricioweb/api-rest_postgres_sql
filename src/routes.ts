import { Router } from "express";
import { SubjectController } from "./controllers/SubjectControllers";
import { RoomController } from "./controllers/RoomController";

const routes = Router();

// subjects
routes.post("/subject", new SubjectController().create);

// room
routes.post("/room", new RoomController().create);
routes.post("/room/:idRoom/create", new RoomController().createVideo);
routes.post("/room/:idRoom/subject", new RoomController().roomSubject);
//listage,
routes.get("/room", new RoomController().index);

export default routes;
