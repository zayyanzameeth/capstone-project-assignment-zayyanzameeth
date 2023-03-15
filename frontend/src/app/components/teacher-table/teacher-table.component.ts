import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';
@Component({
    selector: 'app-teacher-table',
    templateUrl: './teacher-table.component.html',
    styleUrls: ['./teacher-table.component.css']
})

export class TeacherTableComponent implements OnInit {

    faTrash = faTrash;
    faPlus = faPlus;
    faPenSquare = faPenSquare;
    teacherData: any;
    selected: any;

    constructor(private service: AppServiceService, private router: Router) { }

    ngOnInit(): void {
        this.getTeacherData();
    }

    addNewTeacher() {
        this.router.navigate(['addTeacher'])
    }

    editTeacher(id) {
        const navigationExtras: NavigationExtras = {
            state: {
                id: id
            }
        };
        this.router.navigate(['editTeacher'], navigationExtras)
    }

    getTeacherData() {
        this.selected = 'Teachers';
        this.service.getTeacherData().subscribe((response) => {
            this.teacherData = Object.keys(response).map((key) => [response[key]]);
        }, (error) => {
            console.log('ERROR - ', error)
        })
    }

search(value) {
  let foundItems = [];
  if (value.length <= 0) {
    this.getTeacherData();
  } else {
    let searchValue = value.toLowerCase(); // convert the search value to lowercase for case-insensitive search
    let filteredData = this.teacherData.filter((teacher) => {
      if (teacher.name.toLowerCase().indexOf(searchValue) > -1) { // check if the teacher's name contains the search value
        foundItems.push(teacher);
      }
    });
    this.teacherData = foundItems; // update the teacherData array with the filtered results
  }
}

   

  deleteTeacher(itemid) {
    const test = {
        id: itemid
    }
    this.service.deleteTeacher(test).subscribe((response) => {
        this.getTeacherData()
    })
}
}