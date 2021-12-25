import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project';
import { ProjectService } from '../project.service';
declare const fem: any

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  id!: number
  project!: Project;
  femComponent: any;
  // thumbnail: any

  elements: any;

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  ngAfterViewInit(): void {
    this.elements = {
      plusBtn: document.getElementById('plus-btn'),
      minusBtn: document.getElementById('minus-btn'),
      scene: document.getElementById('scene'),
      calcBtn: document.getElementById('calc-btn'),
      saveBtn: document.getElementById('save-btn'),
      sceneVisibility: document.getElementById('scene-visibility'),
      modes: document.getElementById('mode'),
      two: {
        nodes: undefined
      },
      toolbox: {
        element: document.getElementById('element-toolbox'),
        support: document.getElementById('support-toolbox'),
        load: document.getElementById('load-toolbox'),
        fx: document.getElementById('fx-input') as HTMLInputElement,
        fy: document.getElementById('fy-input') as HTMLInputElement,
        xFixed: document.getElementById('support-xFixed-cb') as HTMLInputElement,
        yFixed: document.getElementById('support-yFixed-cb') as HTMLInputElement
      },
    }

    this.getProject();
  }

  getProject() {
    this.projectService.getProject(this.id).subscribe(project => {
      this.project = project
      this.femComponent = new fem.FemComponent(this.elements, this.project.data);
      this.femComponent.init();
      // this.thumbnail = this.femComponent.getThumbnail();
      console.log(this.femComponent.getThumbnail());
    });
  }

  saveModel() {
    this.project.data = this.femComponent.getJsonModel();
    this.projectService.saveProject(this.project).subscribe(() => alert('Project saved'));
  }
}
