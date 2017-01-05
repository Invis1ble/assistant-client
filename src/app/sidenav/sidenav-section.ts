import { SidenavItem } from './sidenav-item';

export interface SidenavSection {
    title?: string;
    items: SidenavItem[];
}

export interface SidenavSectionMap {
    account?: SidenavSection;
    categories?: SidenavSection;
}
