
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { StatisticalService } from '@features/service/statistical-service/statistical.service';
import {
  DialogEditEventArgs,
  GridComponent,
  SaveEventArgs,
  DataStateChangeEventArgs,
} from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-statistic-table',
  templateUrl: './statistic-table.component.html',
  styleUrls: ['./statistic-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatisticTableComponent implements OnInit {
  @ViewChild('backgroundgrid', { static: true }) backgroundgrid: ElementRef;
  public widthTable;
  // @ViewChild('role')
  // public roleObj: DropDownListComponent;
  // @ViewChild('district')
  // public districtObj: DropDownListComponent;
  // @ViewChild('position')
  // public positionObj: DropDownListComponent;
  public userList: Observable<DataStateChangeEventArgs>;
  public editSettings;
  public toolbar;
  public pageSettings;
  public roleList = [];
  public positionList;
  public position;
  public userForm: FormGroup;
  public width = 250;
  public alert = '';
  public commands;
  public selectedUser;
  public DialogType;
  public type = false;
  public newData: IUserModel = {
    ten_bien_so: '',
    thoi_gian_vao: [],
    thoi_gian_ra: [],
    url_img: '',
    trang_thai: '',
  };
  public hideIcon = 'fas fa-eye-slash';
  public showIcon = 'fas fa-eye';
  public showPass = false;
  public submitClicked = false;
  @ViewChild('grid') grid: GridComponent;
  districtList: any;
  DistrictEnabled: any;
  PositionEnabled: boolean;

  constructor(
    private statisticalService: StatisticalService,
    // private roleService: RoleService,
    // private positionService: PositionService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.statisticalService.refresh$.subscribe(() => {
      this.get();
    });
    this.get();
    // this.getRole();
    this.editSettings = {
      showDeleteConfirmDialog: true,
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
    };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Search'];
   
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
    this.position = { X: (screenWidth - this.width) / 2, Y: 100 };
    window.addEventListener('resize', () => {
      this.widthTable = this.backgroundgrid.nativeElement.offsetWidth;
    });
  }
 
  get() {
    this.statisticalService.getStatisticals(1000, 1).subscribe((result) => {
      
      console.log("hihi ",result.data[0].users_info)
      this.userList = result.data[0].users_info;
      
    });
  }
 
  created(e) {
    // console.log(this.grid.element);
    // var gridElement = this.grid.element;
    // gridElement.element('e-search-icon')[0].remove()
  }
  actionBegin(args: SaveEventArgs): void {
    console.log(args);
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.submitClicked = false;
      this.DialogType = args.requestType;
      let data = args.requestType === 'add' ? this.newData : args.rowData;
      if (args.requestType === 'add') {
        this.DistrictEnabled = false;
        this.PositionEnabled = false;
      }
      // this.getRole();
      // this.getDistrict(args.rowData['ma_quyen_nguoi_dung']);
      // this.getPosition(args.rowData['ma_quyen_nguoi_dung']);
      // this.userForm = this.createFormGroup(data);
    }
    if (args.requestType === 'beginEdit') {
      console.log(args.rowData);
      if (args.rowData['ma_quyen_nguoi_dung']) {
        this.DistrictEnabled = true;
        // this.getDistrict(args.rowData['ma_quyen_nguoi_dung']);
        this.PositionEnabled = true;
        // this.getPosition(
        //   args.rowData['ma_quyen_nguoi_dung'],
        //   args.rowData['ma_phong']
        // );
      } else {
        this.DistrictEnabled = false;
        this.districtList = [];
        this.PositionEnabled = false;
        this.positionList = [];
      }
      console.log(this.DistrictEnabled, this.PositionEnabled);
    }

    switch (args.requestType) {
      case 'save':
        console.log(this.userForm);
        this.submitClicked = true;
        let control = this.userForm.controls;
        if (this.userForm.valid && args.action == 'add') {
          let user = this.userForm.value;
          user.so_dien_thoai = user.so_dien_thoai || '0388888888';
          // this.insert(user);
        } else if (
          control['ten_day_du'].valid &&
          control['so_dien_thoai'].valid &&
          control['email'].valid &&
          args.action == 'edit'
        ) {
          console.log(control);
          console.log('edit');
          let id = args.data['id'];
          let user = this.userForm.value;
          delete user.mat_khau;
          // this.update(id, user);
        } else {
          args.cancel = true;
        }
        break;
      case 'delete':
        // this.delete(args.data[0].id);
        break;
    }
  }

  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      args.dialog.header =
        args.requestType === 'add'
          ? 'Thêm mới người dùng'
          : 'Cập nhật người dùng';
    }
  }

  // insert(user) {
  //   console.log(user);
  //   this.statisticalService.insert(user).subscribe(
  //     (result) => {
  //       if (result.code == 201) {
  //         this.alert = 'Thêm thành công!';
  //       } else {
  //         if (result.code == 422) {
  //           this.alert = 'Tên đăng nhập đã tồn tại!';
  //         }
  //       }
  //       this.get();
  //       setTimeout(() => {
  //         this.alert = '';
  //       }, 2250);
  //     },
  //     (error) => {
  //       this.alert = 'Thêm không thành công!';
  //       setTimeout(() => {
  //         this.alert = '';
  //       }, 2250);
  //       this.get();
  //     }
  //   );
  // }

  // update(id, user) {
  //   console.log(id, user);
  //   this.statisticalService.update(id, user).subscribe(
  //     (result) => {
  //       if (result.code == 200) {
  //         this.alert = 'Cập nhật thành công!';
  //         setTimeout(() => {
  //           this.alert = '';
  //         }, 2250);
  //       }
  //       this.get();
  //     },
  //     (error) => {
  //       this.alert = 'Cập nhật không thành công!';
  //       setTimeout(() => {
  //         this.alert = '';
  //       }, 2250);
  //       this.get();
  //     }
  //   );
  // }
  // delete(id) {
  //   this.statisticalService.delete(id).subscribe(
  //     (result) => {
  //       if (result.code == 200) {
  //         this.alert = 'Xóa thành công!';
  //         setTimeout(() => {
  //           this.alert = '';
  //         }, 2250);
  //       }
  //       this.get();
  //     },
  //     (error) => {
  //       this.alert = 'Xóa không thành công!';
  //       setTimeout(() => {
  //         this.alert = '';
  //       }, 2250);
  //       this.get();
  //     }
  //   );
  // }
  // public roleChange(e): void {
  //   this.districtObj.enabled = true;
  //   this.districtObj.text = null;
  //   this.userForm.patchValue({ ma_phong: null });
  //   this.getDistrict(e.value);
  //   this.positionObj.enabled = true;
  //   this.positionObj.text = null;
  //   this.getPosition(e.value, undefined);
  // }
  // public districtChange(e): void {
  //   this.getPosition(this.roleObj.value, e.value);
  // }
  InputConfig(data) {
    this.selectedUser = data.ten_nguoi_dung;
  }
  // ResetPassword(data) {
  //   this.statisticalService.resetPassword(data.id).subscribe((result) => {
  //     if (result.code == 200) {
  //       this.alert = 'Đặt lại mật khẩu thành công!';
  //     } else {
  //       this.alert = 'Đặt lại mật khẩu không thành công!';
  //     }
  //     setTimeout(() => {
  //       this.alert = '';
  //     }, 2250);
  //   });
  // }
  // Active(data) {
  //   this.statisticalService.active(data.id, !data.trang_thai).subscribe((result) => {
  //     if (data.trang_thai) {
  //       this.alert = 'Khoá thành công!';
  //     } else {
  //       this.alert = 'Kích hoạt thành công!';
  //     }
  //     setTimeout(() => {
  //       this.alert = '';
  //     }, 2250);
  //   });
  // }
  closeDialog(e) {
    this.selectedUser = undefined;
  }
  public onLoad() {
    this.grid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (e.target.getAttribute('id').indexOf('_searchbar') !== -1) {
          this.grid.search((e.target as HTMLInputElement).value);
        }
      }, 0)
    );
  }
  public debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  dataBound(args) {
    let toolbar;
    this.grid.toolbarModule.getToolbar().childNodes[0].childNodes.forEach(item => {
      if(item['classList'].contains("e-toolbar-left")){
        toolbar = item.childNodes;
      }else if(item['classList'].contains("e-hscroll-bar")){
        toolbar = item.childNodes[0].childNodes[0].childNodes;
      }
    })
    console.log(toolbar)
    toolbar.forEach((item) => {
      let element = item.childNodes[0];
      console.log(element, element['innerText'])
      switch (element['innerText']) {
        case 'Thêm mới':
          element['classList'].add('add-toolbar-btn');
          break;
        case 'Sửa':
          element['classList'].add('edit-toolbar-btn');
          break;
        case 'Xóa':
          element['classList'].add('delete-toolbar-btn');
          break;
        case 'Lưu':
          element['classList'].add('save-toolbar-btn');
          break;
        case 'Hủy':
          element  ['classList'].add('cancel-toolbar-btn');
          break;
      }
    });   if ((this.grid.dataSource as any)?.length === 0) {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'none';
    } else {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'block';
    }
  }
  get UserName(): AbstractControl {
    return this.userForm.get('ten_nguoi_dung');
  }
  get Password(): AbstractControl {
    return this.userForm.get('mat_khau');
  }
  get Tel(): AbstractControl {
    return this.userForm.get('so_dien_thoai');
  }
  get FullName(): AbstractControl {
    return this.userForm.get('ten_day_du');
  }
  get Indicator(): AbstractControl {
    return this.userForm.get('ma_quyen_nguoi_dung');
  }
  get District(): AbstractControl {
    return this.userForm.get('ma_phong');
  }
  get Position(): AbstractControl {
    return this.userForm.get('ma_chuc_vu');
  }
  get Email(): AbstractControl {
    return this.userForm.get('email');
  }
  UsernameValidator() {
    let regex = /^[a-z0-9_]{4,}$/;
    return (control: FormControl): null | Object => {
      return regex.test(control.value)
        ? null
        : {
            UsernameError: true,
          };
    };
  }
  TelValidator() {
    let regex = /^((^(0|84)[35789])[0-9]{8,8})$/;
    return (control: FormControl): null | Object => {
      return regex.test(control.value) || control.value == ''
        ? null
        : {
            TelError: true,
          };
    };
  }
  PassValidator() {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,20}$/;
    return (control: FormControl): null | Object => {
      return regex.test(control.value)
        ? null
        : {
            PassError: true,
          };
    };
  }
}

export interface IUserModel {
  ten_bien_so?: string;
  thoi_gian_vao?: [];
  thoi_gian_ra?: [];
  url_img?: string;
  trang_thai?: string;
}