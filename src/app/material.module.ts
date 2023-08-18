import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports:[MatButtonModule,
          MatFormFieldModule,
          MatDialogModule,
          MatInputModule,
          MatSelectModule,
          MatCheckboxModule,
          MatDatepickerModule,
          MatNativeDateModule,
          MatSnackBarModule,
          MatTableModule,
          MatIconModule,
          MatPaginatorModule,
          MatSortModule,
          MatToolbarModule,
          MatCardModule,
          ],

  exports:[MatButtonModule,
     MatFormFieldModule,
     MatDialogModule,
     MatInputModule,
     MatSelectModule,
     MatCheckboxModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatTableModule,
     MatIconModule,
     MatPaginatorModule,
     MatSortModule,
     MatToolbarModule,
     MatCardModule,
   ]
})

export class MaterialModule{

}
