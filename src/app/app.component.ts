import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from './service/api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  title = 'ims';
  currentLang = 'ar';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    // اللغات المتاحة
    this.translate.setDefaultLang('ar');
    // استخدم العربية عند بدء التشغيل
    this.translate.use('ar');
    this.currentLang = 'ar';

    // تحويل اتجاه الصفحة إلى RTL عند العربية
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }

  // دالة للتحقق مما إذا كان الاتجاه RTL
  isRTL(): boolean {
    return this.currentLang === 'ar' || document.documentElement.dir === 'rtl';
  }

  // تغيير اللغة والاتجاه
  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;

    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
    
    // إعادة تحميل المكونات لتطبيق التغييرات
    this.cdr.detectChanges();
  }

  isAuth(): boolean {
    return this.apiService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.apiService.isAdmin();
  }

  logOut(): void {
    this.apiService.logout();
    this.router.navigate(['/login']);
    this.cdr.detectChanges();
  }
}