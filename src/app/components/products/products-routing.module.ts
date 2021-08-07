import { AssignmentDashboardComponent } from './digital/assignment-dashboard/assignment-dashboard.component';

import { CaseViewComponent } from './digital/case-view/case-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './physical/category/category.component';
import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalSubCategoryComponent } from './digital/digital-sub-category/digital-sub-category.component';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import {CaseEditComponent} from './digital/case-edit/case-edit.component';
import { AuthGuard } from 'src/app/services/auth-guard.service'
import {CaseAssignComponent} from './digital/case-assign/case-assign.component'




const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'physical/category',
        component: CategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category"
        }
      },
      {
        path: 'physical/sub-category',
        component: SubCategoryComponent,
        data: {
          title: "Sub Category",
          breadcrumb: "Sub Category"
        }
      },
      {
        path: 'physical/product-list',
        component: ProductListComponent,
        data: {
          title: "Product List",
          breadcrumb: "Product List"
        }
      },
      {
        path: 'physical/product-detail',
        component: ProductDetailComponent,
        data: {
          title: "Product Detail",
          breadcrumb: "Product Detail"
        }
      },
      {
        path: 'physical/add-product',
        component: AddProductComponent,

        data: {
          title: "Add Products",
          breadcrumb: "Add Product"
        }
      },
      {
        path: 'digital/digital-category',
        component: DigitalCategoryComponent,
        // canActivate: [AuthGuard],

        data: {
          title: "Case Creation",
          breadcrumb: "Category"
        }
      },
      {
        path: 'digital/digital-sub-category',
        component: DigitalSubCategoryComponent,
        // canActivate: [AuthGuard],

        data: {
          title: "Case Verification",
          breadcrumb: "Sub Category"
        }
      },
      {
        path: 'digital/digital-product-list',
        component: DigitalListComponent,
        // canActivate: [AuthGuard],

        data: {
          title: "Case List",
          breadcrumb: "Product List"
        }
      },
      {
        path: 'digital/digital-add-product',
        component: DigitalAddComponent,
        data: {
          title: "Add Products",
          breadcrumb: "Add Product"
        }
      },
      {
        path: 'digital/case-edit',
        component: CaseEditComponent,
        data:{
          title:"Case Edit",
          breadcrump: "Case Edit"
        }
      },
      {
        path: 'digital/case-view',
        component: CaseViewComponent,
        data:{
          title:"Case View",
          breadcrump: "Case View"
        }
      },
      {
        path: 'digital/case-assign',
        component: CaseAssignComponent,
        data:{
          title:"Case Assign",
          breadcrump: "Case Assign"
        }
      },
      {
        path: 'case/assignmentDash',
        component: AssignmentDashboardComponent,
        data:{
          title: 'Assignment Dashboard'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
