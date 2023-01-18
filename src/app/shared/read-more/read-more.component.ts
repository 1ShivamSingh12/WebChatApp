import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnInit {

  constructor() { }

  @Input() content: any;
  @Input() limit: any;
  @Input() completeWords: any;

  isContentToggled: any;
  nonEditedContent: any;

  ngOnInit() {
    console.log(this.content);
    if(this.content.length > 10 ){
      this.nonEditedContent = this.content;
      this.content = this.formatContent(this.content);
    }
  }

  toggleContent() {
    console.log(this.isContentToggled);

    this.isContentToggled = !this.isContentToggled;
    console.log(this.isContentToggled);

    this.content = this.isContentToggled ? this.nonEditedContent : this.formatContent(this.content);
  }

  formatContent(content: string) {
    if (this.completeWords) {
      this.limit = content.substring(0,this.limit).lastIndexOf(' ')
      console.log(this.limit);
    }
    if(content.length > 10){
      console.log(content.length);
      return `${content.substring(0, this.limit)}...`;
    }else{
      console.log('0');
      return `${content}`
    }
  }

}
