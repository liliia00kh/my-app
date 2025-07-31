import { Component, signal, Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})

export class HighlightDirective {
  private el = inject(ElementRef);
  appHighlight = input('');
   @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight() || 'red');
  }

   @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}