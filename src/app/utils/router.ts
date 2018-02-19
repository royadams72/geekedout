import { Router, ActivatedRoute, Params, NavigationEnd, UrlSegment } from '@angular/router';

export function getRoutes(activatedRoute: ActivatedRoute) {
  let segments: UrlSegment[];
  return segments = activatedRoute.snapshot.url;

}
