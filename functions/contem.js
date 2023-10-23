export default (dado, lista = []) =>{
    for(let l of lista){
        if(l.id == dado.id){
            return true;
        }
    }
    return false;
}