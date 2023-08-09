import { AfterViewInit, Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Documents } from '../../interfaces/allDocuments';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { FailDocuments } from '../../interfaces/failDocuments';


@Component({
  selector: 'document-table',
  templateUrl: 'document-table.component.html',

})
export class DocumentTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  public allDocuments!: Documents[];

  @Input()
  public failDocuments!: FailDocuments[];


  //First table, table of all documents sent!
  displayedColumns: string[] = ['select', 'id', 'documento', 'documentoTN', 'numero', 'numetoTN', 'fechaCreacion', 'fechaActualizacion'];
  dataSource = new MatTableDataSource<Documents>([])
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Documents>(this.allowMultiSelect, this.initialSelection);

  //Table of fail documents
  displayedColumsByFail: string[] = ['select', 'documento', 'numero', 'nombre', 'tercero', 'fechaCreacion']
  secondDataSource = new MatTableDataSource<FailDocuments>([])

  @Input()
  selectionFailsDocuments = new SelectionModel<FailDocuments>();

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginatorF!: MatPaginator;




  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  isAllSelectedFail() {
    const numSelected = this.selectionFailsDocuments.selected.length;
    const numRows = this.secondDataSource.data.length;
    return numSelected == numRows;
  }


  toggleAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  toggleAllRowsFail() {
    this.isAllSelectedFail() ?
      this.selectionFailsDocuments.clear() :
      this.secondDataSource.data.forEach(row => this.selectionFailsDocuments.select(row));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allDocuments'] && changes['allDocuments'].currentValue) {
      this.dataSource.data = changes['allDocuments'].currentValue;
    }
    if (changes['failDocuments'] && changes['failDocuments'].currentValue) {
      this.secondDataSource.data = changes['failDocuments'].currentValue;
    }
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    else if(this.secondDataSource){
      this.secondDataSource.sort = this.sort;
      this.secondDataSource.paginator = this.paginatorF;
    }
  }

  ngOnInit(): void {
    console.log(this.allDocuments)
    this.dataSource.data = this.allDocuments;
    this.secondDataSource.data = this.failDocuments;

  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    if(this.secondDataSource){
      this.secondDataSource.sort = this.sort;
      this.secondDataSource.paginator = this.paginatorF;
    }
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
