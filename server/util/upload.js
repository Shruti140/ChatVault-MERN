import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: "mongodb://shrutinauriyal14:naudiyals14@ac-g846cvb-shard-00-00.bsbjwy9.mongodb.net:27017,ac-g846cvb-shard-00-01.bsbjwy9.mongodb.net:27017,ac-g846cvb-shard-00-02.bsbjwy9.mongodb.net:27017/?ssl=true&replicaSet=atlas-189jvl-shard-0&authSource=admin&retryWrites=true&w=majority",
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimeType) === -1) 
            return `${Date.now()}-file-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }
});

export default multer({storage}); 