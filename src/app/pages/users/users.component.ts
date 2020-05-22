import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/interface/iUser';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})



export class UsersComponent implements OnInit {
  // @ViewChild(MatPaginator, {static: true, read: MatPaginator})  paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true, read: MatSort}) sort: MatSort;
  dataSource;
  displayedColumns: string[] = ['name', 'email'];
  usersArray: IUser[];
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
  
    //   if (this.dataSource.paginator) {
    //     this.dataSource.paginator.firstPage();
    //   }
    // }
}
