import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from '../../interfaces/user/user';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  $user!: Observable<User | undefined>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserLogged();
  }

  getUserLogged() {
    this.$user = this.userService.getUser();
  }

}
