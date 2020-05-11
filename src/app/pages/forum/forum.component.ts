import { Component, OnInit } from '@angular/core';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  // FONT AWESOME ICON VARIABLES
  faBars = faBars;
  faSearch = faSearch;
  faPlus = faPlus;
  faHome = faHome;
  faNewspaper = faNewspaper;
  faComment = faComment;
  faCalendar = faCalendar;
  faThumbsUp = faThumbsUp;
  
  constructor() { }

  ngOnInit(): void {
  }

}
