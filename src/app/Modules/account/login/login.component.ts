import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CHAT_USERS_DATA } from 'src/app/constant/user_detail';
import { COMMON_VALIDATION, PASSWORD_MIN_LENGTH, PATTERN_SPACE, USERNAME_MAX_LENGTH } from 'src/app/constant/validation';
import { ChatServiceService } from 'src/app/service/chat-service.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private chatService: ChatServiceService, private route: Router, private snackbar: SnackbarService) { }
  loginForm!: FormGroup;

  allUsers: any[] = CHAT_USERS_DATA


  ngOnInit(): void {
    this.createForm()

    let userID = this.chatService.getID()
    this.chatService.details['userId'] = userID
    // console.log(this.chatService.details,'loginuserid');


  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [COMMON_VALIDATION, PATTERN_SPACE , USERNAME_MAX_LENGTH]],
      password: ['', [COMMON_VALIDATION, PASSWORD_MIN_LENGTH , PATTERN_SPACE]],
    });
  }

  submit() {

    // if(this.loginForm.valid){
    //   if (localStorage.getItem(this.loginForm.value.username) == this.loginForm.value.username) {
    //     this.snackbar.openSnackBarErr('User already Exist' , 'red-snackbar')
    //   } else {
    //     localStorage.setItem(this.loginForm.value.username, this.loginForm.value.username)
    //     this.chatService.connection()
    //     let user_data = {
    //       username: this.loginForm.value.username,  user_id: Date.now()
    //     }
    //     sessionStorage.setItem('user', JSON.stringify(user_data))

    //     this.chatService.onlineUser(user_data)
    //     // localStorage.setItem('login','True')
    //     this.chatService.details = this.loginForm
    //     this.chatService.details['username'] = this.loginForm.value.username
    //     this.chatService.details['password'] = this.loginForm.value.password

    //     this.route.navigate(['/dashboard'])
    //   }
    // }else{
    //   this.snackbar.openSnackBarErr('Fields are empty' , 'red-snackbar')
    // }

    this.allUsers.map((user: any) => {
      // console.log(user.user_name,'pppp'

      if (user.user_name == this.loginForm.value.username && user.user_password == this.loginForm.value.password) {
        if (localStorage.getItem(this.loginForm.value.username) == this.loginForm.value.username) {
          this.snackbar.openSnackBarErr('User already Exist' , 'red-snackbar')
        } else {
          localStorage.setItem(this.loginForm.value.username, this.loginForm.value.username)
          this.chatService.connection()
          let user_data = {
            username: user.user_name, user_id: Date.now()
          }
          sessionStorage.setItem('user', JSON.stringify(user_data))

          this.chatService.onlineUser(user_data)
          // localStorage.setItem('login','True')
          this.chatService.details = this.loginForm
          this.chatService.details['username'] = this.loginForm.value.username
          this.chatService.details['password'] = this.loginForm.value.password

          this.route.navigate(['/dashboard'])
        }
      }else if (user.user_name != this.loginForm.value.username && user.user_password != this.loginForm.value.password) {
        this.snackbar.openSnackBarErr('Login Credentials are invalid' , 'red-snackbar')
      }else if (this.loginForm.value.username.trim() == '' || this.loginForm.value.password.trim() == '') {
        this.snackbar.openSnackBarErr('Fields cannot be empty', 'red-snackbar')
      }
    })
  }
}
