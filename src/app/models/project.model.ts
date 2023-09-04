

export class Project {
  constructor(
    public _id : string,
    public type: string[],
    public name: string,
    public url : string,
    public technologies: string[],
    public description: string,
    public img: string,
  ){}

}

