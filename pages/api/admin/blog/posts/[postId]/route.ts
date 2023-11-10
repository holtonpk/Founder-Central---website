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
    case "PATCH":
      // Handle PATCH request
      res.status(200).json({message: "PATCH request received!"});
      break;
    case "DELETE":
      // Handle DELETE request
      res.status(200).json({message: "DELETE request received!"});
      break;
    default:
      res.setHeader("Allow", ["PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
