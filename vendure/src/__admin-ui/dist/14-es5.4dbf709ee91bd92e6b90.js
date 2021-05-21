!function(){var e,r;function t(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function o(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function n(e,r){return r||(r=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(r)}}))}(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{lZdz:function(i,c,a){"use strict";a.r(c),a.d(c,"WebhookModule",function(){return k});var u=a("sEIs"),s=a("ixhn"),b=a("D57K"),h=a("nIj0"),l=a("Z4DO"),f=l.a(e||(e=n(["\n  mutation updateWebhook($url: String!) {\n    updateWebhook(url: $url)\n  }\n"]))),d=l.a(r||(r=n(["\n  query webhook {\n    webhook\n  }\n"]))),m=a("EM62"),p=function(){function e(r,o,n,i,c,a,u){t(this,e),this.formBuilder=i,this.dataService=c,this.changeDetector=a,this.notificationService=u,this.webhookForm=this.formBuilder.group({url:["https://example.com",h.C.required]})}var r,n,i;return r=e,(n=[{key:"ngOnInit",value:function(){return Object(b.b)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var r=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.dataService.query(d).mapStream(function(e){return e.webhook}).subscribe(function(e){return r.webhookForm.controls.url.setValue(e)});case 2:case"end":return e.stop()}},e,this)}))}},{key:"save",value:function(){return Object(b.b)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("SAVEDDD",this.webhookForm.value.url),e.prev=1,!this.webhookForm.dirty){e.next=6;break}return r=this.webhookForm.value,e.next=6,this.dataService.mutate(f,{url:r.url}).toPromise();case 6:this.webhookForm.markAsPristine(),this.changeDetector.markForCheck(),this.notificationService.success("common.notify-update-success",{entity:"Webhook"}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),this.notificationService.error("common.notify-update-error",{entity:"Webhook"});case 12:case"end":return e.stop()}},e,this,[[1,9]])}))}}])&&o(r.prototype,n),i&&o(r,i),e}();p.\u0275fac=function(e){return new(e||p)(m.dc(u.a),m.dc(u.e),m.dc(s.Mb),m.dc(h.e),m.dc(s.M),m.dc(m.k),m.dc(s.Eb))},p.\u0275cmp=m.Xb({type:p,selectors:[["greeter"]],decls:8,vars:2,consts:[[1,"clr-row"],[1,"clr-col"],[1,"form",3,"formGroup"],[1,"form-block"],["label","Webhook url","for","url"],["id","url","type","text","formControlName","url"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(e,r){1&e&&(m.jc(0,"div",0),m.jc(1,"div",1),m.jc(2,"form",2),m.jc(3,"section",3),m.jc(4,"vdr-form-field",4),m.ec(5,"input",5),m.ic(),m.jc(6,"button",6),m.qc("click",function(){return r.save()}),m.Vc(7," Save "),m.ic(),m.ic(),m.ic(),m.ic(),m.ic()),2&e&&(m.Sb(2),m.zc("formGroup",r.webhookForm),m.Sb(4),m.zc("disabled",r.webhookForm.invalid||r.webhookForm.pristine))},directives:[h.E,h.q,h.j,s.eb,s.fb,h.b,h.p,h.h],encapsulation:2});var k=function e(){t(this,e)};k.\u0275fac=function(e){return new(e||k)},k.\u0275mod=m.bc({type:k}),k.\u0275inj=m.ac({providers:[Object(s.Xb)({id:"webhook",label:"Webhook",routerLink:["/extensions/webhook"],icon:"cursor-hand-open"},"settings")],imports:[[s.Nb,u.i.forChild([{path:"",pathMatch:"full",component:p,data:{breadcrumb:"Webhook"}}])]]})}}])}();
//# sourceMappingURL=14-es5.4dbf709ee91bd92e6b90.js.map