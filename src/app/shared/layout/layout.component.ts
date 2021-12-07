import { Component, OnInit, OnChanges, SimpleChanges , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { MOODLE_CURRENT_USE } from '@features/service/authentication-service/constants';
import { menuAdmin, menuItems } from './menu';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss','../style/shareStyle.scss']
})
export class LayoutComponent implements OnInit, OnChanges{
  user: any;
  public selected = false;
  public href: any;
  public menuItems;
  public title: any;
  public currentDate;
  show = true;
  constructor(

    private router: Router,
    private AuthService: AuthenticationService,
  ) {
    this.user = this.AuthService.User;
    this.getMenu();
    this.menuItems = this.AuthService.Menu;
    this.currentDate = 'Ngày ' + new Date().getDate() + ' Tháng ' + (new Date().getMonth() + 1) + ' Năm ' + new Date().getFullYear();
  }
  onClickbtn(){
    console.log('click')
  }
  ngOnChanges(): void {
    console.log('layout change');
  }
  Toggle(){
    this.show = !this.show;
  }
  ngOnInit(): void {
    console.log('layout init');
    this.title = this.AuthService.User.rolename;
    if(this.AuthService.User?.ten_phong) this.title += ' - ' + this.AuthService.User.ten_phong
    this.href = this.router.url.split('?')[0];
    this.checkURL(this.href);
  }
  onClick() {
    this.selected = !this.selected;
  }

  logout() {
    this.AuthService.logout();
  }
  toggleMenu(menu : any, selected : any) {
    console.log(menu, selected);
    for (let item of this.menuItems) {
      if (item.mainMenu == menu) {
        item.selected = !selected;
        continue;
      } else {
        item.selected = false;
      }
    }
    console.log(this.menuItems);
  }
  checkURL(url: any) {
    this.menuItems.forEach((item:any) => {
      if (item?.subMenu) {
        for (let i of item?.subMenu) {
          if (i.url == url) {
            item.selected = true;
            break;
          } else {
            item.selected = false;
          }
        }
      } else {
        if (item.url == url) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      }
    });
  }
  ClickedOut(event:any) {
    if (event.target.className === 'dropdown-menu') {
      this.selected = false;
    }
  }
  getMenu() {
    let menu : any = [];
    if (this.AuthService.User) {
      let resourcesUser = JSON.parse(localStorage.getItem(MOODLE_CURRENT_USE|| null));
      if (this.AuthService.User.rolename != 'Quản trị viên') {
        resourcesUser['quyen_tai_nguyen'].forEach((item:any) => {
          if (menuItems[item]) {
            menu.push(menuItems[item]);
          } else {
            if (item.includes('Tài nguyên Cấu hình')) {
              let index = menu.findIndex((m:any) => m.mainMenu == 'Cấu Hình');
              if (index > 0) {
                menu[index].subMenu.push(
                  menuItems['Tài nguyên Cấu hình'].subMenu[item.split(' - ')[1]]
                );
              } else {
                menu.push({
                  mainMenu: 'Cấu Hình',
                  icon: 'icon-cauhinh',
                  selected: false,
                  subMenu: [
                    menuItems['Tài nguyên Cấu hình'].subMenu[
                      item.split(' - ')[1]
                    ],
                  ],
                });
              }
            }
          }
        });
      } else {
        menu = menuAdmin;
      }
    }
    this.menuItems = menu;
    this.AuthService.Menu = menu;
    console.log(this.AuthService.Menu);
  }

}
