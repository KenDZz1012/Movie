import multer from "multer";

const pathFile = "src/public"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req)
        switch (file.fieldname) {
            case "ClientAvatar":
                cb(null, `${pathFile}/ClientAvatar`);
                break;
            case "MoviePoster":
                cb(null, `${pathFile}/MoviePoster`);
                break;
            case "MovieVideo":
                file.originalname = `${req.body.MovieName}-${req.body.YearProduce}.mp4`
                cb(null, `${pathFile}/MovieVideo`);
                break;
            case "TVVideo":
                file.originalname = `${req.body.Movie}-${req.body.Episode}.mp4`
                cb(null, `${pathFile}/TVVideo`);
                break;
            case "CelebrityAvatar":
                cb(null, `${pathFile}/CelebrityAvatar`);
                break;
            case "TVPoster":
                cb(null, `${pathFile}/TVPoster`);
                break;
            case "MovieCoverPoster":
                cb(null, `${pathFile}/MovieCoverPoster`);
                break;
            case "TVCoverPoster":
                cb(null, `${pathFile}/TVCoverPoster`);
                break;
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname == "MovieVideo")
            cb(null, `${req.body.MovieName}-${req.body.YearProduce}.mp4`);
        else if (file.fieldname == "TVVideo")
            cb(null, `${req.body.Movie}-${req.body.Episode}.mp4`);
        else
            cb(null, file.originalname);
    },
});

console.log(storage)
const upload = multer({ storage: storage });

export default upload