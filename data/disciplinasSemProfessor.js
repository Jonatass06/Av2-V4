import GetAllData from  "@/api/api";

export default async function get() {
  const disciplinasTemp = await GetAllData("disciplina");
  const professoresTemp = await GetAllData("professor");
  const disciplinasNaoProf = [];
    for(let d of disciplinasTemp){
        let tem = false;
        for(let p of professoresTemp){
            if(p.disciplina && p.disciplina.id == d.id){
                tem = true
            }
        }
        !tem && disciplinasNaoProf.push(d)
    }

  return disciplinasNaoProf;
}
