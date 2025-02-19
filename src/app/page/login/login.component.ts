import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private router:Router) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userField: ["", [Validators.required, Validators.email]],
      passField: ["", Validators.required]
    })

  }

  login() {
    const userField = document.getElementById("userField") as HTMLInputElement;
    const passField = document.getElementById("passField") as HTMLInputElement;
    if (this.loginForm.valid) {
      const user = userField.value;
      const pass = passField.value;
      if (user == "office@angular.com" && pass == "admin") {
        this.router.navigate(["/home"]);
      } else console.log("Authorization failed!");
    } else console.log("Form invalid!")
  }
  }
  
