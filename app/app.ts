import {Component, ViewChild, NgZone} from '@angular/core';
import {ionicBootstrap, Events, Platform, Nav, MenuController, Alert} from 'ionic-angular';
import {StatusBar, Splashscreen, TouchID} from 'ionic-native';

// Intro and Login pages
import {TutorialPage} from './pages/tutorial/tutorial';
import {LoginPage} from './pages/login/login';
import {LoginAutoPage} from './pages/loginauto/loginauto';
import {SignupPage} from './pages/signup/signup';
import {LogoutPage} from './pages/logout/logout';

// App pages
import {AccountListPage} from './pages/listPages/account-list';
import {CompanyListPage} from './pages/listPages/company-list';
import {CategoryListPage} from './pages/mymoney/category-list/category-list';
import {BudgetListPage} from './pages/mymoney/budget-list/budget-list';
import {RecurringListPage} from './pages/mymoney/recurring-list/recurring-list';
import {PayeeListPage} from './pages/mymoney/payee-list/payee-list';
import {ReportListPage} from './pages/mymoney/report-list/report-list';
import {DetailsListPage} from './pages/listPages/string-list/details-list';
import {LocationsListPage} from './pages/listPages/string-list/locations-list';
import {CategoriesListPage} from './pages/listPages/string-list/categories-list';
import {ExpenseTypeListPage} from './pages/listPages/string-list/expenseType-list';

// Settings pages
import {SettingsPage} from './pages/mysettings/settings/settings';

// Services
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, firebaseAuthConfig, FirebaseAuth, AuthProviders, AuthMethods} from 'angularfire2';
import {UserData} from './providers/user-data';
import {DataService} from './providers/data-service';
import {CompanyService} from './providers/company-provider';
import {AccountService} from './providers/account-provider';
import {ReportService} from './providers/report-provider';


declare var touchid: any;

const COMMON_CONFIG = {
    apiKey: "AIzaSyBqt4-ti_YvOQp7JN4tza1E36wuZOGkOQ8",
    authDomain: "expenses-638e5.firebaseapp.com",
    databaseURL: "https://expenses-638e5.firebaseio.com",
    storageBucket: "expenses-638e5.appspot.com",
    messagingSenderId: "664656497876"
};

@Component({
    templateUrl: 'build/app.html',
    providers: [
        UserData,
        DataService,
        CompanyService,
        AccountService,
        ReportService,
        FIREBASE_PROVIDERS,
        defaultFirebase(COMMON_CONFIG),
        firebaseAuthConfig({
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
            remember: 'default',
            scope: ['email']
        })
    ]
})

class MoneyLeashApp {

    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    @ViewChild(Nav) nav: Nav;

    // Default root page
    rootPage: any = TutorialPage;

    // Local variables
    loggedIn = false;
    enabletouchid = '';
    pages: Array<{ title: string, component: any, icon: string, color: string }>;
    logoutPage: Array<{ title: string, component: any, icon: string, color: string }>;

    constructor(
        public ngZone: NgZone,
        public events: Events,
        public userData: UserData,
        public menu: MenuController,
        public platform: Platform,
        public auth: FirebaseAuth) {

        this.initializeApp();

        // List of pages that can be navigated to from the left menu
        // the left menu only works after login
        // the login page disables the left menu
        this.pages = [
            
            { title: 'Companies', component: CompanyListPage, icon: 'ios-browsers-outline', color: '', },
            { title: 'Accounts', component: AccountListPage, icon: 'ios-browsers-outline', color: '', },
            { title: 'Details', component: DetailsListPage, icon: 'ios-browsers-outline', color: '', },
            { title: 'Categories', component: CategoriesListPage, icon: 'ios-browsers-outline', color: '', },
            { title: 'Locations', component: LocationsListPage, icon: 'ios-browsers-outline', color: '', },
            { title: 'Expense Types', component: ExpenseTypeListPage, icon: 'ios-browsers-outline', color: '', },
            { title: 'Reports', component: ReportListPage, icon: 'ios-color-wand-outline', color: '', },
            { title: 'Budgets', component: BudgetListPage, icon: 'ios-color-wand-outline', color: '', },
            { title: 'Categories', component: CategoryListPage, icon: 'ios-attach-outline', color: '', },
            { title: 'Payees', component: PayeeListPage, icon: 'ios-contacts-outline', color: '', },
            { title: 'Recurring', component: RecurringListPage, icon: 'ios-sync-outline', color: '', },
            { title: 'Reports', component: ReportListPage, icon: 'ios-trending-up-outline', color: '', },
            { title: 'Settings', component: SettingsPage, icon: 'ios-settings-outline', color: '', },
        ];
        this.logoutPage = [
            { title: 'Logout', component: LogoutPage, icon: 'md-log-out', color: '#f53d3d', }
        ];
    }

    initializeApp() {
        // Call any initial plugins when ready
        this.platform.ready().then(() => {
            StatusBar.styleLightContent();
            Splashscreen.hide();
            //
            // Check if TouchID has been selected
            if (this.userData.enabletouchid === 'true') {
                //
                // Check if TouchID is supported
                TouchID.isAvailable()
                    .then(
                    res => {
                        TouchID.verifyFingerprint('Scan your fingerprint please')
                            .then(
                            res => {
                                this.nav.setRoot(LoginAutoPage);
                            },
                            err => { console.error('Error', err) }
                            );
                    },
                    err => {
                        console.error('TouchID is not available', err)
                    }
                    );
            } else {
                console.log('TouchID setting is NOT enabled!');
            }
        });
    }

    openPage(page) {
        // the nav component was found using @ViewChild(Nav)
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            this.nav.setRoot(page.component, { tabIndex: page.index });
        } else {
            this.nav.setRoot(page.component);
        }

        if (page.title === 'Logout') {
            // Give the menu time to close before changing to logged out
            setTimeout(() => {
                this.signOut();
            }, 1000);
        }
    }

    signOut(): void {
        this.auth.logout();
        this.nav.setRoot(LogoutPage);
    }
}

// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/

ionicBootstrap(MoneyLeashApp);
