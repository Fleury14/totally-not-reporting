import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatMenuModule,
    MatDialog, MatDialogModule, MatCheckboxModule, MatRadioModule, MatSelectModule} from '@angular/material';

@NgModule({
    imports: [ CommonModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatToolbarModule, MatMenuModule, MatDialogModule, MatCheckboxModule, MatRadioModule, MatSelectModule ],
    exports: [ CommonModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatToolbarModule, MatMenuModule, MatDialogModule, MatCheckboxModule, MatRadioModule, MatSelectModule ],
    providers: [ MatDialog ],
})

export class AppMaterialModule {}