import {
  Output,
  EventEmitter,
  NgZone,
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { NgForOfContext } from '@angular/common';

class RecordViewTuple<T> {
  constructor(public record: any, public view: EmbeddedViewRef<NgForOfContext<T>>) { }
}

@Directive({ selector: '[infFor][infForOf]' })
export class InfForOf<T> implements DoCheck, OnChanges {

  @Output() load = new EventEmitter<void>();

  @Input() infForOf: NgIterable<T>;
  @Input() threshold = 0.1;
  @Input() shouldEmit = true;

  @Input()
  set infForTrackBy(fn: TrackByFunction<T>) {
    this._trackByFn = fn;
  }

  @Input()
  set itemOffset(value: number) {
    if (value < 1) {
      throw new Error('You must pass a itemOffset of 1 of greater');
    } else {
      this._itemOffset = value;
    }
  }

  @Input()
  set ngForTemplate(value: TemplateRef<NgForOfContext<T>>) {
    if (value) {
      this._template = value;
    }
  }

  get infForTrackBy(): TrackByFunction<T> { return this._trackByFn; }

  private _differ: IterableDiffer<T> | null = null;
  private _trackByFn: TrackByFunction<T>;
  private _observer: IntersectionObserver;
  private _itemOffset: number;

  constructor(
    private _viewContainer: ViewContainerRef,
    private _template: TemplateRef<NgForOfContext<T>>,
    private _differs: IterableDiffers,
    private ngZone: NgZone
  ) {
    const options = {
      root: <any>null,
      rootMargin: '0px',
      threshold: this.threshold
    };
    this._observer = new IntersectionObserver(this._observerEmit.bind(this), options);
  }

  private _clearObservers(items?: IntersectionObserverEntry[]) {
    items = items ? items : this._observer.takeRecords();
    items.forEach(item => {
      this._observer.unobserve(item.target);
    });
  }

  private _observeItem(view: EmbeddedViewRef<NgForOfContext<T>>) {
    view.rootNodes
      .filter(node => node instanceof HTMLElement)
      .forEach(el => {
        this._observer.observe(el);
      });
  }

  private _observerEmit(changes: IntersectionObserverEntry[]) {
    // since the IntersectionObserver emits when you call this.observer.observe(item) we check
    // to make sure it's actually intersecting
    if (this.shouldEmit && (<any>changes[0]).isIntersecting) {
      this._clearObservers(changes);

      // IntersectionObserver isn't patched by zone
      this.ngZone.run(() => this.load.emit());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('infForOf' in changes) {
      const value = changes['infForOf'].currentValue;
      if (!this._differ && value) {
        this._differ = this._differs.find(value).create(this.infForTrackBy);
      }
    }
  }

  ngDoCheck(): void {
    if (this._differ) {
      const changes = this._differ.diff(this.infForOf);
      if (changes) {
        this._applyChanges(changes);
      }
    }
  }

  private _applyChanges(changes: IterableChanges<T>) {
    const insertTuples: RecordViewTuple<T>[] = [];
    changes.forEachOperation(
      (item: IterableChangeRecord<any>, adjustedPreviousIndex: number, currentIndex: number) => {
        if (item.previousIndex == null) {
          this._applyInsert(item, currentIndex);
        } else if (currentIndex == null) {
          this._applyRemove(adjustedPreviousIndex);
        } else {
          this._applyMove(adjustedPreviousIndex, currentIndex, item);
        }
      });

    for (let i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
      const viewRef = <EmbeddedViewRef<NgForOfContext<T>>>this._viewContainer.get(i);
      viewRef.context.index = i;
      viewRef.context.count = ilen;
    }

    changes.forEachIdentityChange((record: any) => {
      const viewRef =
        <EmbeddedViewRef<NgForOfContext<T>>>this._viewContainer.get(record.currentIndex);
      this._setImplicit(record, viewRef);
    });

    // this dosen't support text nodes
    this._observeItem(<EmbeddedViewRef<NgForOfContext<T>>>this._viewContainer.get(this._viewContainer.length - 1));
  }

  private _applyRemove(index: number) {
    this._viewContainer.remove(index);
  }

  private _applyInsert(item: any, adjustedPreviousIndex: number) {
    const view = this._viewContainer.createEmbeddedView(
      this._template, new NgForOfContext<T>(null!, this.infForOf, -1, -1), adjustedPreviousIndex);
    this._setImplicit(item, view);
  }

  private _applyMove(adjustedPreviousIndex: number, currentIndex: number, item: any) {
    const view = this._viewContainer.get(adjustedPreviousIndex)!;
    this._viewContainer.move(view, currentIndex);
    this._setImplicit(item, <EmbeddedViewRef<NgForOfContext<T>>>view);
  }

  private _setImplicit<T>(record: any, view: EmbeddedViewRef<NgForOfContext<T>>) {
    view.context.$implicit = record.item;
  }
}
