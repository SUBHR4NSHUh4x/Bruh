import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";

// Your GitHub identity
const AUTHOR_NAME = "SUBHR4NSHUh4x";
const AUTHOR_EMAIL = "subhr4nshuh4x@gmail.com";

const commitOnce = async (x, y) => {
  const date = moment()
    .subtract(1, "year")
    .add(x, "weeks")
    .add(y, "days")
    .format();

  const data = { date };

  await jsonfile.writeFile(path, data);
  await git.add(path);

  await git.commit(`Commit on ${date}`, {
    "--date": date,
    "--author": `"${AUTHOR_NAME} <${AUTHOR_EMAIL}>"`
  });
};

const makeCommits = async (n) => {
  for (let i = 0; i < n; i++) {
    const x = random.int(0, 54); // random week
    const y = random.int(0, 6);  // random day
    await commitOnce(x, y);
    console.log(`✅ Commit #${i + 1}`);
  }
  await git.push();
  console.log("🚀 All commits pushed!");
};

makeCommits(90); // number of commits
