import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks'; // URL of the backend
    
  constructor(private http: HttpClient) {}
  
  getTasks(): Observable<any[]> {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const params = new HttpParams().set('userId', user.userId);

    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
    );
  }
  
  createTask(task: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, task);
  }
  
  updateTask(id: number, task: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}`, task);
  }
  
  deleteTask(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
