import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // testArray: any[];

  // FONT AWESOME ICON VARIABLES
  faBars = faBars;
  faLightbulb = faLightbulb;
  faGraduationCap = faGraduationCap;
  faUniversity = faUniversity;
  faBook = faBook;
  faUsers = faUsers;
  faBullhorn = faBullhorn;

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    // this.afs.collection('test').valueChanges().subscribe(value => {
    //   console.log(value)
    //   this.testArray = value;
    // })
  }

}
