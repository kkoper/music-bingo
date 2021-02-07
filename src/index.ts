import express from "Express";
import serveStatic from "serve-static";
import {join} from "path";

const app =  express();
app.use(serveStatic(join(__dirname, "client"), {
    index: ["index.html"]
}));

app.listen(8080);
console.log("Express server served at 8080");