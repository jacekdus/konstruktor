import { Component, OnInit } from '@angular/core';

import { Project } from '../project';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  createProject() {
    const projectName: string | null = prompt('Enter new project name: ')
    if (projectName !== null) {
      this.projectService.createProject(projectName!)
        .subscribe(project => this.projects.push(project));
    }
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  copyProject(id: number) {
    this.projectService.copyProject(id)
      .subscribe(project => this.projects.push(project));
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id)
      .subscribe(id => {
        const index = this.projects.findIndex(el => el.id === id);

        this.projects.splice(index, 1);
      })
  }

  renameProject(project: Project) {
    this.projectService.renameProject(project.id, project.name)
      .subscribe(projects => this.projects = projects)
  }
}
