import mongoose from 'mongoose';


const Connection = async () => {
    const URI = "mongodb://shrutinauriyal14:naudiyals14@ac-g846cvb-shard-00-00.bsbjwy9.mongodb.net:27017,ac-g846cvb-shard-00-01.bsbjwy9.mongodb.net:27017,ac-g846cvb-shard-00-02.bsbjwy9.mongodb.net:27017/?ssl=true&replicaSet=atlas-189jvl-shard-0&authSource=admin&retryWrites=true&w=majority";
    try {
        await mongoose.connect(URI);
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;