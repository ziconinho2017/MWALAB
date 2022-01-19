import { Component } from '@angular/core';
import studentsData from './students.json';
interface Student {
  name: String;
  gpa: Number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-app';
  students : Student[] = studentsData;
}
