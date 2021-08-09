import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CustomValidators } from "ngx-custom-validators";
import { JwtAuthService } from "../../../shared/services/auth/jwt-auth.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-signin2",
  templateUrl: "./signin2.component.html",
  styleUrls: ["./signin2.component.scss"],
})
export class Signin2Component implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: JwtAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const password = new FormControl("", Validators.required);
    const confirmPassword = new FormControl(
      "",
      CustomValidators.equalTo(password)
    );

    this.signupForm = this.fb.group({
      usuario: ["", [Validators.required]],
      password: password,
      agreed: [false, Validators.required],
    });
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      // do what you wnat with your data
      /* console.log(this.signupForm.value); */
      this.authService.signin(this.signupForm.value).subscribe((resp) => {
        // console.log(`resp`, resp);

        this.router.navigateByUrl(this.authService.return);
      });
    }
  }
}
