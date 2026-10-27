import express, { Request, Response } from "express";
const server = express();
const PORT = 5000;

server.use(express.json());

server.post("/questions", async (req: Request, res: Response) => {
  const { userGoal } = req.body;

  if (!userGoal || typeof userGoal !== "string") {
    return res.status(400).json("Goal is required");
  }

  

});

server.listen(PORT, () => {
  console.log("backend live on port ", PORT);
});
