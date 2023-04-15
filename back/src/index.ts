import express from "express";
import providerRoutes from "./routes/provider.routes";
import userRoutes from "./routes/user.routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/", providerRoutes);
app.use("/", userRoutes);
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
