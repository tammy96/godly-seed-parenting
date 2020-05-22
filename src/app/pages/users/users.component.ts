import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/interface/iUser';
import { faUser } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})



export class UsersComponent implements OnInit {

  faUser = faUser;
  dataSource;
  displayedColumns: string[] = ['id','name', 'email', 'gender'];
  usersArray: IUser[] = [];
  constructor(private usersService: UsersService) { 
  }
  
  ngOnInit(): void {
    
    this.usersService.getUsers().subscribe(value => {
      this.usersArray = value;
      this.dataSource = value;
    })
  }
  
  
    // applyFilter(event: Event) {
    //   const filterValue = (event.target as HTMLInputElement).value;
    //   this.dataSource.filter = filterValue.trim().toLowerCase();
    // }
}
