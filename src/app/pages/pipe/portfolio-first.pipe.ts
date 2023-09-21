import { Pipe, PipeTransform } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Pipe({
  name: 'portfolioFirst'
})
export class PortfolioFirstPipe implements PipeTransform {

  transform(projects: Project[]) {

    const portafolio = projects.find( project => project.name === "App Portafolio Personal");

    projects = projects.filter( project => project.name !== "App Portafolio Personal")
    
    projects.unshift(portafolio!);
    return projects
  }

}
