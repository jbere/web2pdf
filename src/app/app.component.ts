import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as printJS from 'print-js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web2pdf';
  file: any;
  constructor(private http: HttpClient) {
  }

  fileChanged(e: any) {
    this.file = e.target.files[0];
  }

  printImages(urls: any[]) {
    printJS({
      printable: urls,
      type: 'image',
      imageStyle: 'background-size: 100% 100%; margin-top: -2.5rem'
    })
  }

  readFile() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
    fileReader.readAsText(this.file);
  }

  downloadFiles() {
    this.http.get('assets/libro4.txt', { responseType: 'text' })
      .subscribe(data =>
        // console.log(data)
        this.printImages(data.split(/\r?\n/))

      )
    // this.url = data.split(/\r?\n/));
  }
}
