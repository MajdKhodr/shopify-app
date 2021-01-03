import { Component, OnInit } from '@angular/core';
import { MovieDbService } from '../../firestore/movie-db.service';
import { MovieEntry } from '../../models/movie-entry';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nomiationList: MovieEntry[] = [];
  OMDbApi: 'http://www.omdbapi.com/?i=tt3896198&apikey=53429502';

  constructor(private store: MovieDbService) { }

  ngOnInit(): void {
    this.store.getNominationList().subscribe(data => {
      this.nomiationList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as MovieEntry;
      });
    });
  }

  remove(movie: MovieEntry): void {
    this.store.deleteNominee(movie.id);
    alert(movie.name + ' has been removed!');
  }

  onSubmit(): void {
    alert('Search has been made!');
  }
}
