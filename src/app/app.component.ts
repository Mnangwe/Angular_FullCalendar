import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  Events: any[] = []
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  }
  title = 'calendar';
  
  constructor (private http: HttpClient ) { }

  onDateClick(res: any) {
    alert('Clicked on date: ' + res.dateStr)
  }

  ngOnInit() {
    setTimeout(() => {
      return this.http.get('http://localhost:8888/event.php')
        .subscribe((res: any) => {
          this.Events.push(res)
          console.log(this.Events)
        })
    }, 2200);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.Events
      }
    }, 2500)
  }
}
