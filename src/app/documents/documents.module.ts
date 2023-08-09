import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchEquivalentsComponent } from './pages/search-equivalents/search-page-equivalents.component';
import { SearchBoxDocumentComponent } from './components/search-box-document/search-box-document.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DocumentTableComponent } from './components/document-table/document-table.component';
import { LoadingComponent } from './components/loading/loading.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { DataDetailComponent } from './components/data-detail/data-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule
  ],
  exports: [
    SearchEquivalentsComponent,
    SearchBoxDocumentComponent,
    LoadingComponent,
    EmptyDataComponent,
    DataDetailComponent,
    DocumentTableComponent

  ],
  declarations: [
    SearchEquivalentsComponent,
    SearchBoxDocumentComponent,
    LoadingComponent,
    EmptyDataComponent,
    DataDetailComponent,
    DocumentTableComponent
  ],


})
export class DocumentsModule { }
