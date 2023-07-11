import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeApiService } from '../services/home-api.service';

@Component({
  selector: 'app-home-site',
  templateUrl: './home-site.component.html',
  styleUrls: ['./home-site.component.css']
})
export class HomeSiteComponent implements OnInit {

  constructor(private service: HomeApiService) { }

  ngOnInit(): void {
    
  }

}
