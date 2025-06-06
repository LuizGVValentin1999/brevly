import { env } from "@/env";
import { FastifyCorsOptions } from "@fastify/cors";

const allowedOrigins = env.CORS_ORIGINS.split(",");

export const corsOptions: FastifyCorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  credentials: true,
};
