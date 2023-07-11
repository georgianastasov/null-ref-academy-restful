import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeApiService } from '../../services/home-api.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  constructor(private service:HomeApiService) { }

  ngOnInit(): void {
  }

}
