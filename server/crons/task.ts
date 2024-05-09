import { GenezioDeploy, GenezioMethod } from "@genezio/types";
import { TaskModel as TaskMongo } from "../db/mongoose/task";
import { TaskModel as TaskPostgres } from "../db/sequelize/task";
import { connectMongo } from "../db/mongoose/connect";
import { connectPostgres } from "../db/sequelize/connect";

@GenezioDeploy()
export class TaskCrons {
  constructor() {
    connectMongo();
    connectPostgres();
  }

  @GenezioMethod({ type: "cron", cronString: "0 0 * * *" })
  async logTasksMongo(): Promise<void> {
    // Implementation for reading tasks

    await TaskMongo.find()
      .exec()
      .then((tasks) => {
        console.log("Tasks: ", tasks);
      })
      .catch((error) => {
        console.log("An error occurred while reading tasks: ", error);
      });
  }

  @GenezioMethod({ type: "cron", cronString: "0 0 * * *" })
  async logTasksPostgres(): Promise<void> {
    // Implementation for reading tasks
    await TaskPostgres.findAll()
      .then((tasks) => {
        console.log("Tasks: ", tasks);
      })
      .catch((error) => {
        console.log("An error occurred while reading tasks: ", error);
      });
  }
}
