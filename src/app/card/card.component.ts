import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() project!: Project;

  type: string = 'Truss';
  desc: string = 'Simple truss bridge';

  @Output() copyProjectEvent = new EventEmitter<number>();
  @Output() deleteProjectEvent = new EventEmitter<number>();
  @Output() renameProjectEvent = new EventEmitter<Project>();

  constructor() {}

  ngOnInit(): void {
  }

  copyProject() {
    this.copyProjectEvent.emit(this.project.id);
  }

  renameProject() {
    const newName: string | null = prompt('Enter new project name:')
    if (newName) {
      this.project.name = newName;
      this.renameProjectEvent.emit(this.project);
    }
  }

  deleteProject() {
    this.deleteProjectEvent.emit(this.project.id);
  }
}
