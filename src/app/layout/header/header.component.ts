import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();
  }

  public logout() {
    this.authService.logout();
  }

}
