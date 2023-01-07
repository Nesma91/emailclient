import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailResolverService } from './email-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: ':id',
        component: EmailShowComponent,
        resolve: {
          email: EmailResolverService,
        },
      },
      {
        path: '',
        component: PlaceholderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class InboxRoutingModule {}
