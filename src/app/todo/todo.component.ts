import { Component,OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormBuilder,Validators, ReactiveFormsModule} from '@angular/forms'
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ITask } from '../model/task';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,
            MatIconModule,MatButtonModule,ReactiveFormsModule,
            DragDropModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent  implements OnInit{

  todoForm !: FormGroup;
  tasks: ITask [] = [];
  inprogress: ITask []= []; 
  done: ITask []=[];
  updateIndex!:any;
  isEditEnabled:boolean=false;

  constructor(private fb  : FormBuilder){

  }

  ngOnInit(): void{
    this.todoForm = this.fb.group({
      item : ['',Validators.required]
    });
  }


  deleteTask(i: number){
    this.tasks.splice(i,1)

  }


  deleteInProgress(i: number){
    this.inprogress.splice(i,1)

  }

  deleteDone(i: number){
    this.done.splice(i,1)

  }

  addTask(){
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    });
    this.todoForm.reset();
  }

  editTask(item:ITask, i: number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask(){
    this.tasks[this.updateIndex].description=this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled=false;
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
