import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeApiService } from '../../services/home-api.service';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.css']
})
export class HomeFooterComponent implements OnInit {

  constructor(private service:HomeApiService) { }

  ngOnInit(): void {
  }

}
