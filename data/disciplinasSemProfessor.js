import disciplinas from "./disciplinas"
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import professores from "./professores";

const disciplinasSemProf = get();

async function get() {
  const disciplinasTemp = await disciplinas;
  const professoresTemp = await professores;
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

export default disciplinasSemProf;