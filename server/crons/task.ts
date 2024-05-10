import { GenezioDeploy, GenezioMethod } from "@genezio/types";
import { TaskModel as TaskMongo } from "../db/mongoose/task";
import { TaskModel as TaskPostgres } from "../db/sequelize/task";
import { connectMongo } from "../db/mongoose/connect";
import { connectPostgres } from "../db/sequelize/connect";
import { initTables } from "../db/sequelize/migration";

@GenezioDeploy()
export class TaskCrons {
  constructor() {
    connectMongo();
    connectPostgres();

    // This function should not be used in production
    initTables();
  }

  @GenezioMethod({ type: "cron", cronString: "0 0 * * *" })
  async logTasksMongo(): Promise<void> {
    // Implementation for reading tasks

    const tasks = await TaskMongo.find().catch((error) => {
      console.log("An error occurred while reading tasks: ", error);
    });

    console.log("Tasks: ", tasks);
  }

  @GenezioMethod({ type: "cron", cronString: "0 0 * * *" })
  async logTasksPostgres(): Promise<void> {
    // Implementation for reading tasks

    const tasks = await TaskPostgres.findAll().catch((error) => {
      console.log("An error occurred while reading tasks: ", error);
    });

    console.log("Tasks: ", tasks);
  }
}
