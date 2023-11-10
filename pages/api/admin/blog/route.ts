import type {NextApiRequest, NextApiResponse} from "next";

type ResponseData = {
  message: string;
};

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
      // Handle PATCH request
      res.status(200).json({message: "PATCH request received!"});
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
