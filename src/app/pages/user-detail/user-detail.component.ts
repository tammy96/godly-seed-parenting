import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/interface/iUser';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


}
