import { Routes, CanActivate } from '@angular/router';
import { GetStartedComponent } from '../get-started/get-started.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { routeGuardService } from './route.guards';
import { LogoutComponent } from '../logout/logout.component';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizDetailComponent } from '../quiz-detail/quiz-detail.component';

export const APP_ROUTES: Routes = [
    {path: 'getStarted', component: GetStartedComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [routeGuardService]},
    {path: 'logout', component: LogoutComponent},
    {path: 'quiz', component: QuizComponent , canActivate: [routeGuardService]},
    {path: 'quiz-detail', component: QuizDetailComponent , canActivate: [routeGuardService]},
    {path: '**', redirectTo: 'getStarted'},
    {path: '', redirectTo: 'getStarted', pathMatch: 'full'}
];
