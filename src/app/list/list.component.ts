import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { toDo } from '../toDo';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	toDos: toDo[];
	userId: number = 0;
  newToDo: toDo ={
    id: 0,
    checked: false,
    whatAreYouDoing: "",
    priority: 1,
    userId: 0
  }
    toChange: toDo ={
    id: 0,
    checked: false,
    whatAreYouDoing: "",
    priority: 1,
    userId: 0
  }

  constructor(private listService: ListService, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
  	  this.userId = this.route.snapshot.params['id'];
      this.listToDo();
  }


  listToDo () : void{
      this.listService.gettoDo(this.userId).subscribe((toDos)=>{
      this.toDos = Object.keys(toDos).map(i => toDos[i]).sort((objA, objB) => objB.priority - objA.priority)
      this.newToDo.id = toDos[toDos.length-1].id;
    });
  }

   addItem() : void{
   this.newToDo.id++;
   this.newToDo.userId = this.userId;
   this.listService.addItem(this.newToDo)
      .subscribe(toDo => {
           this.toDos.push(toDo);
           this.listToDo();
           this.newToDo;
      })
    }

    deleteItem(): void {
    this.listService.deleteItem(this.toChange).subscribe();
    this.listToDo();
  }

   updateItem(think: toDo): void {
   this.listService.updateItem(think)
     .subscribe();
     this.listToDo();
 }
   logOut(){
     this.router.navigate(['/']);
      localStorage.clear();
     
   }

    useModal(think){
      this.toChange = think;
  }
}
