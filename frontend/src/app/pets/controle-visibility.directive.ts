import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appControleVisibility]',
})
export class ControleVisibilityDirective {
  @HostBinding('style.height') height: string = '0.5rem';
  @HostBinding('style.opacity') opacity = 0;
  @HostListener('mouseenter')
  mouseenter() {
    this.renderer.setStyle(this.hostElement.nativeElement, 'height', '3rem');
    this.renderer.setStyle(this.hostElement.nativeElement, 'opacity', 1);
    this.renderer.setStyle(
      this.hostElement.nativeElement,
      'border',
      '1px solid grey'
    );
  }
  @HostListener('mouseleave') mouseleave() {
    this.renderer.setStyle(
      this.hostElement.nativeElement,
      'height',
      this.height
    );
    this.renderer.setStyle(this.hostElement.nativeElement, 'opacity', 0);
  }
  constructor(private hostElement: ElementRef, private renderer: Renderer2) {
    // console.log(this.hostElement.nativeElement);
  }
}
