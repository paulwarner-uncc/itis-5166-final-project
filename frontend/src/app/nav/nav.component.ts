import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NgFor, NgIf } from '@angular/common';

type RouteInfo = {
  route: string,            // The path associated with the route
  displayName: string,      // The name to show in the nav bar
  requiresAuth: boolean,    // If a page requires that the user be signed in
  requiresNoAuth: boolean,  // If a page requires that the user *not* be signed in
  redirectPath: string      // Where to redirect to in case the auth/no auth requirements aren't met
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgFor],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isAuthed = false;

  // Maps routes (ex. "/") to information about it (ex. display name, requires auth, etc.)
  navLinks: RouteInfo[] = [
    {
      route: "/",
      displayName: "Home",
      requiresAuth: false,
      requiresNoAuth: false,
      redirectPath: "/dashboard"
    },
    {
      route: "/login",
      displayName: "Log In",
      requiresAuth: false,
      requiresNoAuth: true,
      redirectPath: "/dashboard"
    },
    {
      route: "/signup",
      displayName: "Sign Up",
      requiresAuth: false,
      requiresNoAuth: true,
      redirectPath: "/dashboard"
    },
    {
      route: "/dashboard",
      displayName: "Dashboard",
      requiresAuth: true,
      requiresNoAuth: false,
      redirectPath: "/"
    },
    {
      route: "/configure",
      displayName: "Configure",
      requiresAuth: true,
      requiresNoAuth: false,
      redirectPath: "/"
    },
    {
      route: "/update",
      displayName: "Expenses",
      requiresAuth: true,
      requiresNoAuth: false,
      redirectPath: "/"
    },
    {
      route: "/logout",
      displayName: "Log Out",
      requiresAuth: true,
      requiresNoAuth: false,
      redirectPath: "/"
    }
  ];

  constructor (
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.isAuthenticated.subscribe((val) => {
      this.isAuthed = val;
      this.redirectAuthenticatedPages();
    });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.redirectAuthenticatedPages();

        // Focus on content at end of navigation
        const mainElem = document.getElementById("#main");
        if (mainElem) {
          mainElem.focus();
        }
      }
    });
  }

  // Determines if the current page should be accessible given the current authentication status
  private redirectAuthenticatedPages() {
    let routeInfo = this.navLinks.find((val) => {
      return val.route === this.router.url;
    });

    // If at an invalid URL, do nothing
    if (routeInfo === undefined) {
      return;
    }

    // Determine if the current URL should be access based on the authentication status
    // If not, navigate away to the set redirection page
    if ((routeInfo.requiresAuth && !this.isAuthed) || (routeInfo.requiresNoAuth && this.isAuthed)) {
      this.router.navigate([routeInfo.redirectPath]);
    }
  }
}
