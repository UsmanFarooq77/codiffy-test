import { RecordsListComponent } from './albums/records-list/records-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordComponent } from './albums/record/record.component';


const routes: Routes = [
  { path: '', component: RecordsListComponent },
  { path: 'update-record/:id', component: RecordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
