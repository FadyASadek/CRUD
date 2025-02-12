import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from '../types/students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private url = "http://localhost:5270/api/student";
  constructor(private http : HttpClient) { }
  getStudent=():Observable<Students[]>=> this.http.get<Students[]>(this.url);
  addStudent=(data:Students)=>this.http.post(this.url,data);
  oneStudent=(id:number):Observable<Students>=> this.http.get<Students>(this.url+'/id:int?id='+id);
  deleteStudent=(id:number)=> this.http.delete(this.url+'/id:int?id='+id);

  editStudent=(id:number , data:Students)=> this.http.put(this.url+'/id:int?id='+id,data);
}
