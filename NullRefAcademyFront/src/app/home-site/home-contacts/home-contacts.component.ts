import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeApiService } from '../../services/home-api.service';

@Component({
  selector: 'app-home-contacts',
  templateUrl: './home-contacts.component.html',
  styleUrls: ['./home-contacts.component.css']
})
export class HomeContactsComponent implements OnInit {

  constructor(private service:HomeApiService) { }

  ngOnInit(): void {
  }

}
