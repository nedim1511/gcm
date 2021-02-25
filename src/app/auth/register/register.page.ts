import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    console.log(values);
    this.router.navigate(["confirm-email"], { relativeTo: this.route });
  }
}
