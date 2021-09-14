import express from "express";
import path from "path";

const main = () => {
  const app = express();

  app.use(express.static(path.join(__dirname, "./public")));

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });
};

main();
