import type {NextApiRequest, NextApiResponse} from "next";
import * as z from "zod";

type ResponseData = {
  message: string;
};

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {method} = req;

  switch (method) {
    case "GET":
      // Handle GET request
      res.status(200).json({message: "Hello from Next.js!"});
      break;
    case "POST":
      // Handle POST request

      res.status(200).json({message: "PATCH request received!"});
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export async function POST(req: Request) {
  const json = await req.json();
  const body = postCreateSchema.parse(json);
}
