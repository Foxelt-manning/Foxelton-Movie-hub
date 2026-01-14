export const saveHomepageCache = (key,data) =>{
    const cacheData ={
        data : data,
        timestamp: Date.now(),
        expiration : 2*60*60*1000
    }
    localStorage.setItem(key,JSON.stringify(cacheData))
};

export const getFromCache=( key )=>{

    const cached = localStorage.getItem(key);
    
    if(!cached) return null

    const {data,timestamp,expiration} = JSON.parse(cached);

    if(Date.now() - timestamp > expiration){
        localStorage.removeItem(key);
        return null;
    }
    return data;
}