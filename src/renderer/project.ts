namespace Project{
    export interface Color{
        red: number;
        green: number;
        blue: number;
        alpha: number;
    }
    export class Led{
        index: number = 0;
        color: Color = {red:0,green:0,blue:0,alpha:0};
        Led(index:number,color:Color){
            this.index = index;
            this.color = color;

        }
    
    }
    export class ProjectInput{
        name: string = "";
        ProjectInput(name:string){
            this.name = name;
        }
        


    }
    export class Effect{
        nodes: EffectNode[] = [];


    }
    export class EffectNode{
        leds: Led[] = [];

    }
    
    export class Project{
        input: Record<string, Effect> = {};
        title: string = "";
        Project(title: string){
            this.title = title;
        }
    }


}

