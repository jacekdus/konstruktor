import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl = 'http://localhost:80/konstruktor-backend/public'
  token = 'aacdc0a72e0ff8aa7c5b17e92e0b82a2';

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private http: HttpClient) {}

  createProject(projectName: string): Observable<Project> {
    return this.http.post<Project>(
      `${this.apiUrl}/project/create`, { 
        name: projectName
      },
      this.httpOptions
    ).pipe(catchError(this.handleError<any>('createProject')))
  }

  getProjects(): Observable<Project[]> {
    const url = `${this.apiUrl}/projects`

    return this.http.get<Project[]>(`${this.apiUrl}/projects`, this.httpOptions);
  }

  getProject(id: number): Observable<Project> {
    const url = `${this.apiUrl}/project/${id}`

    return this.http.get<Project>(url, this.httpOptions);
  }

  copyProject(id: number): Observable<Project> {
    const url = `${this.apiUrl}/project/copy`;

    return this.http.post<Project>(url, {id: id}, this.httpOptions).pipe(
      catchError(this.handleError<any>('copyProject'))
    )
  }

  deleteProject(id: number) {    
    const url = `${this.apiUrl}/project/delete/${id}`

    return this.http.delete<number>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteProject'))
    )
  }

  saveProject(project: Project) {
    const url = `${this.apiUrl}/project/update`

    return this.http.post<Project>(url, { 
      projectId: project.id, 
      data: project.data 
    }, this.httpOptions).pipe(catchError(this.handleError<any>('updateProject')))
  }

  renameProject(projectId: number, projectName: string) {
    const url = `${this.apiUrl}/project/rename/${projectId}`
    return this.http.post<Project>(url, { name: projectName }, this.httpOptions).pipe(catchError(this.handleError<any>('renameProject')))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
