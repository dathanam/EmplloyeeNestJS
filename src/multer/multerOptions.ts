import { HttpException, HttpStatus } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";

export const multerOptions = {
    limits : {
        fileSize : 1024 * 1024 * 50
    },
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
        }
    })
}