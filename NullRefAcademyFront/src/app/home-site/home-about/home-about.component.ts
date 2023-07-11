import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeApiService } from '../../services/home-api.service';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  styleUrls: ['./home-about.component.css']
})
export class HomeAboutComponent implements OnInit {

  constructor(private service:HomeApiService) { }
  
  ngOnInit(): void {
  }
  
  count:number = 0;
  goLeft()
  {
    let box1 = document.getElementById('box1');
    let box2 = document.getElementById('box2');
    let box3 = document.getElementById('box3');
	  var block = document.getElementById('block');
    this.count++;
    
    if (this.count == 4) {
      this.count = 1;
    }

    if (this.count == 1) {
      box3!.style.display = "none";
	    if (box3!.style.display === 'none') {
		    box3!.style.display = 'block';
		    box2!.style.display = 'none';
		    box1!.style.display = 'none';
		    block!.style.backgroundColor = "#3A8EA2";
	    }
    }
    else if (this.count == 2) {
      box2!.style.display = "none";
	    if (box2!.style.display === 'none') {
		    box2!.style.display = 'block';
		    box1!.style.display = 'none';
		    box3!.style.display = 'none';
		    block!.style.backgroundColor = "#71CFE2";
	    }
    }
    else if (this.count == 3) {
      box1!.style.display = "none";
	    if (box1!.style.display === 'none') {
		    box1!.style.display = 'block';
		    box2!.style.display = 'none';
		    box3!.style.display = 'none';
		    block!.style.backgroundColor = "#54C0A6";
	    }
    }
    
  }

  goRight()
  {
    let box1 = document.getElementById('box1');
    let box2 = document.getElementById('box2');
    let box3 = document.getElementById('box3');
	  var block = document.getElementById('block');
    this.count++;
    
    if (this.count == 4) {
      this.count = 1;
    }

    if (this.count == 1) {
      box2!.style.display = "none";
	    if (box2!.style.display === 'none') {
		    box2!.style.display = 'block';
		    box3!.style.display = 'none';
		    box1!.style.display = 'none';
		    block!.style.backgroundColor = "#3A8EA2";
	    }
    }
    else if (this.count == 2) {
      box3!.style.display = "none";
	    if (box3!.style.display === 'none') {
		    box3!.style.display = 'block';
		    box1!.style.display = 'none';
		    box2!.style.display = 'none';
		    block!.style.backgroundColor = "#71CFE2";
	    }
    }
    else if (this.count == 3) {
      box1!.style.display = "none";
	    if (box1!.style.display === 'none') {
		    box1!.style.display = 'block';
		    box2!.style.display = 'none';
		    box3!.style.display = 'none';
		    block!.style.backgroundColor = "#54C0A6";
	    }
    }
  }

}
