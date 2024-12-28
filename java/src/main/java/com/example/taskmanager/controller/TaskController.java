package com.example.taskmanager.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/tasks")
	public class TaskController {
	
		@Autowired 
		private TaskRepository taskRepository;
		
		@GetMapping
		public ResponseEntity<List<Task>> getAllTasks(@RequestParam(required = false) Integer userId) {
		    if (userId == null) {
		        return ResponseEntity.badRequest().body(Collections.emptyList());
		    }
		    
		    List<Task> tasks = taskRepository.findByUserId(userId);
		    
		    return ResponseEntity.ok(tasks);
		}
		
		@PostMapping
		public Task createTask(@RequestBody Task task) {
		    return taskRepository.save(task);
		}
		
		@PutMapping("/{id}")
		public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
			return taskRepository.findById(id)
					.map(task -> {
						task.setTitle(updatedTask.getTitle());
						task.setDescription(updatedTask.getDescription());                    
						return taskRepository.save(task);
		            })
		            .orElseThrow(() -> new RuntimeException("Task not found with id" + id));
		}
		
		@DeleteMapping("/{id}")
		public void deleteTask(@PathVariable Long id) {
				taskRepository.deleteById(id);
		}
}

