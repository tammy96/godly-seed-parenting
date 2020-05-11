import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/interface/iUser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersArray: IUser[];
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(value => {
      this.usersArray = value;
    })
  }

}
