import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.checkLogin();
  }
  mode:string='side';

  menu=[
    {
      name:'Dashboard',
      icon:'dashboard',
      url:'/admin/dashboard'
    },
    {
      group:'Menu Group',
      children:[
        {
          name:'Image Gallery',
          icon:'images',
          url:'/admin/gallery'
        }
      ]
    }
  ];
  
  checkLogin()
  {
    this.api.get('bookswithauth/status').subscribe(res=>{
      //is logged in
      return;
    },error=>{
      // not logged in
      this.router.navigate(['/login']);
    })
  }
  logout()
  {
    let conf=confirm('keluar aplikasi?');
    if(conf)
    {
      localStorage.removeItem('appToken');
      window.location.reload();
    }
  }
}
