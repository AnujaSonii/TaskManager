import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  title = 'taskManager';
  user=JSON.parse(localStorage.getItem('userInfo'));
  tasks: any[] = [];
  newTask:any;
  constructor(private taskService: TaskService, private router: Router) {}
  ngOnInit() {
    this.newTask = { title: '', description: '', completed: false, userId: this.user.userId };
    this.loadTasks();
  }
  
  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }
  
  addTask() {
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.loadTasks();
      this.newTask = { title: '', description: '', completed: false, userId:this.user.userId};
    });
  }
  
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
