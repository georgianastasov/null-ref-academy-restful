import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeApiService } from '../../services/home-api.service';

@Component({
  selector: 'app-home-privacy',
  templateUrl: './home-privacy.component.html',
  styleUrls: ['./home-privacy.component.css']
})
export class HomePrivacyComponent implements OnInit {

  constructor(private service:HomeApiService) { }

  ngOnInit(): void {
  }

}
