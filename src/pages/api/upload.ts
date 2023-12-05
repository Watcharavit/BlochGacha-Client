import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { promises as fsPromises } from "fs";
export const config = {
	api: {
		bodyParser: false
	}
};

const readFile = (req: NextApiRequest, saveLocally: boolean) => {
	const options: formidable.Options = {};
	if (saveLocally) {
		options.uploadDir = path.join(process.cwd(), "public/uploads");
		options.filename = (name, ext, path, form) => {
			return Date.now().toString() + "_" + path.originalFilename;
		};
	}
	const form = formidable(options);
	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) return reject(err);
			resolve({ fields, files });
		});
	});
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	// if public/uploads folder doesn't exist, create it
	const dir = path.join(process.cwd(), "public/uploads");
	try {
		await fsPromises.access(dir);
	} catch (error) {
		await fsPromises.mkdir(dir);
	}
	await readFile(req, true);
	res.status(200).json({ message: "success" });
};

export default handler;
