import type { NextApiRequest, NextApiResponse } from "next";

// type Metric = {
//   name: string;
//   value: number;
// };

const metrics: { [key: string]: { [key: string]: number } } = {};

type ResponseData = {
  status: string;
  metrics?: { [key: string]: { [key: string]: number } };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): void {
  console.log("metrics", metrics);
  if (req.method === "POST") {
    console.log("data", req.body);
    if (req.body) {
      const { name, value, path } = req.body;
      if (!metrics[path]) {
        metrics[path] = {};
      }
      metrics[path][name] = value;
    }
    res.status(200).json({ status: "ok" });
  } else if (req.method === "GET") {
    res.status(200).json({ status: "ok", metrics });
  }
}
