import { Component } from '@angular/core';
import { Sidebar } from "./sidebar/sidebar";
import { RouterOutlet } from "@angular/router";
import { Header } from "./header/header";

@Component({
  selector: 'app-layout',
  imports: [Sidebar, RouterOutlet, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
