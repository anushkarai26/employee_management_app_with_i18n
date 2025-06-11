import { Routes } from '@angular/router';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './component/update-employee/update-employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { RegisterComponent } from './register/register.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [

    {
        path:'emp-list',
        component: EmployeeListComponent,
        canActivate:[authGuard],
            data:{
                role:'admin'

            }
        
    },
    
    {
        path:'add-emp',
        component: AddEmployeeComponent,
        canActivate:[authGuard],
        data:{
            role:'admin'

        }
    },
    {
        path:'update-emp',
        component: UpdateEmployeeComponent,
        canActivate:[authGuard],
        data:{
            role:'admin'

        }
    },
    {
        path:'register',
        component: RegisterComponent,

    },
    {
        path:'login',
        component: LoginUserComponent,
    }, {
        path:'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
        data: {
            role: ['admin', 'user'] 
        }
    },
   { path: 'employees',
        component: EmployeesComponent
     },
     { path: '', 
        redirectTo: '/employees', pathMatch: 'full' 
    }
];

