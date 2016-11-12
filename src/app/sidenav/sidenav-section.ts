import { SidenavItem } from './sidenav-item';

export interface SidenavSection {
    title?: string;
    items: SidenavItem[];
}