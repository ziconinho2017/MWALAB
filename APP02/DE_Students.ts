import { Student } from "./Student";
import { Token } from "./MyDecorator";
@Token({course : "CS572", canProgram : false})
export class DE_Students extends Student{

}