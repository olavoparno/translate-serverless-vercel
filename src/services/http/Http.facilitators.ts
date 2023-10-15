import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { Logger } from "../logging/Logging.logger";
import { TranslateOptions } from "../../interfaces";

export const returnHttpJson = (
  res: NextApiResponse,
  status: number,
  payload: unknown
) => {
  return res.status(status).json(payload);
};

export const returnEndpointPayload = async ({
  req,
}: {
  req: NextApiRequest;
}): Promise<TranslateOptions> => {
  return new Promise((resolve, reject) => {
    if (Object.keys(req.body || {}).length > 0) {
      resolve(req.body as TranslateOptions);
    }

    if (Object.keys(req.query || {}).length > 0) {
      resolve(req.query as unknown as TranslateOptions);
    }

    reject(
      new Error(
        JSON.stringify({
          status: 400,
          data: {
            information:
              "Refer to the documentation https://github.com/olavoparno/translate-serverless-vercel",
            complementary: "Tip: you should review your payload information",
          },
        })
      )
    );
  });
};

export const returnHtmlPage = ({ res }: { res: NextApiResponse }): void => {
  res.writeHead(418, {
    "Content-Type": "text/html",
    "Cache-Control": "max-age=0, s-maxage=2612345",
  });

  return fs.readFile(
    path.join(__dirname, "../../public/index.html"),
    null,
    (fsError, data) => {
      if (fsError) {
        Logger.error("ReadHTMLFailure::");
        Logger.error(JSON.stringify(fsError));

        res.writeHead(404);
        res.write("Whoops! File not found!");
      } else {
        res.write(data);
      }

      return res.end();
    }
  );
};

export const transformRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  method?: string
): Promise<{ req: NextApiRequest; res: NextApiResponse }> => {
  return new Promise((resolve, reject) => {
    req.on("data", () => {
      Logger.info("TransactionOpened::");
    });
    res.on("close", () => {
      Logger.info("TransactionClosed");
    });
    res.on("error", (error) => {
      Logger.error("TransactionError::");
      Logger.error(JSON.stringify(error));
    });

    if (req.method !== (method || "POST")) {
      reject(
        new Error(
          JSON.stringify({
            status: 400,
            data: {
              information:
                "Refer to the documentation https://github.com/olavoparno/translate-serverless-vercel",
            },
          })
        )
      );
    }

    resolve({ req, res });
  });
};

export const handleRejections =
  (res: NextApiResponse) =>
  (error: Error): void => {
    const parsedError = JSON.parse(error.toString().replace("Error: ", ""));

    Logger.info("HandleRejections::");
    Logger.info(JSON.stringify(parsedError));

    returnHttpJson(res, parsedError.status, parsedError.data);
  };

export const allowCors = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return null;
};
