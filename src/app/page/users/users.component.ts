import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  dataForm!: FormGroup;
  private users: any[] = []
  dataSource = new MatTableDataSource<any>();
  displayCols = ['ime', 'prezime', 'e-mail', 'pass', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  listaTeh: any;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.dataSource.data = JSON.parse(localStorage.getItem("users") ?? "[]");
    this.dataForm = this.fb.group({
      id: ["0", Validators.required],
      nameField: ["", Validators.minLength(3)],
      surnameField: ["", Validators.minLength(3)],
      emailField: ["", Validators.email],
      passField: ["", Validators.required],
      repassField: ["", Validators.required],
      applications: this.fb.array([this.createAppFormGroup()])
    },
      { validator: this.passwordMatchValidator })
    this.loadListaTeh()
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get("passField");
    const repass = form.get("repassField");
    if (password?.value !== repass?.value) {
      repass?.setErrors({ passwordMismatch: true });
    } else {
      repass?.setErrors(null);
    }
  }
  saveUser() {
    const raw_user = this.dataForm.getRawValue()
    if (this.dataForm.valid) {
      raw_user.id = Math.floor(1000 * Math.random())
      if (localStorage.getItem("users") === null) {
        raw_user.id = Math.floor(1000 * Math.random())
        this.users.push(raw_user)
        localStorage.setItem("users", JSON.stringify(this.users))
      } else {
        this.users = JSON.parse(localStorage.getItem("users") ?? "[]")
        console.log(this.users)
        raw_user.id = Math.floor(1000 * Math.random())
        this.users.push(raw_user);
        localStorage.setItem("users", JSON.stringify(this.users))
      }
      this.dataForm.reset();
      this.dataForm.get('id')?.setValue(0);
      this.dataSource.data = [];
      this.dataSource.data = this.users
    } else {
      console.log(raw_user);
      alert("Form invalid!");
    }
  }
  deleteUser(data: any) {
    var rawData = localStorage.getItem("users");
    var parsedData = rawData ? JSON.parse(rawData) : []
    parsedData = parsedData.filter((item: any) => item.id != data.id)
    localStorage.removeItem("users")
    localStorage.setItem("users", JSON.stringify(parsedData))
    const newRawData = localStorage.getItem("users")
    this.dataSource.data = newRawData ? JSON.parse(newRawData) : []
  }
  createAppFormGroup(): FormGroup {
    return new FormGroup({
      datumApp: new FormControl(null, Validators.required),
      nazivTeh: new FormControl("", Validators.required),
      nazivApp: new FormControl("", Validators.required),
    })
  }

  public addFormGroup() {
    const appItems = this.dataForm.get('applications') as FormArray
    appItems.push(this.createAppFormGroup())
  }

  public deleteFormGroup(i: any) {
    const appItems = this.dataForm.get('applications') as FormArray
    if (appItems.length > 0) {
      appItems.removeAt(i)
    } else appItems.reset()
  }

  public loadListaTeh() {
    this.listaTeh = [
      { id: 1, naziv: "C#" }, { id: 2, naziv: "ReactJS" }, { id: 3, naziv: "Angular" }
    ]
  }

  public get applications(): FormArray {
    return this.dataForm.get('applications') as FormArray
  }
}
