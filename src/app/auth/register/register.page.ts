import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RegisterModel } from "src/app/models/register.model";
import { UserMetaData } from "src/app/models/user-meta-data.model";
import { AUTH0_CLIENT_ID, AUTH0_CONNECTION } from "src/app/shared/constants";
import { RegisterService } from "./register.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  constructor(
    private service: RegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  register(data: any) {
    const values = data.form.value;
    const metadata = new UserMetaData(
      values.address,
      values.city,
      values.zip,
      values.country,
      values.phone,
      values.name,
      null
    );
    const model = new RegisterModel(
      AUTH0_CLIENT_ID,
      values.email,
      values.password,
      AUTH0_CONNECTION,
      values.firstName,
      values.lastName,
      metadata
    );
    
    if (this.isFormValid(values)) {
      this.service.register(model).subscribe((res) => {
        console.log(res);
        this.router.navigate(["confirm-email"], { relativeTo: this.route });
      });
    }
  }

  private isFormValid(values: any): boolean {
    if (values.password !== values.confirm) {
      alert("Your passwords do not match.");
      return false;
    }
    return true;
  }
}
