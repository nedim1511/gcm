import { Component, OnInit, Input } from '@angular/core';
import { AUTH_API_URL, BACKEND_API_URL } from '../shared/constants';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  backendApi = BACKEND_API_URL;
  authApi = AUTH_API_URL;

  constructor() { }

  ngOnInit() {}

}
