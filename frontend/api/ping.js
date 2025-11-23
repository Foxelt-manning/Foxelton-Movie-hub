export default async function keepAlive(req,res) {
    try {
        const request = await fetch("https://foxelton-movie-hub.onrender.com/api/home");
        if (request.ok){
            res.status(200).json({message:"ping succcessfull"});
        }else{
            res.status(500).json({message:"ping unsuccessful"})
        }
    } catch (error) {
        res.status(500).json({message:"Ping failed error pinging",error: error})
    }
    
}