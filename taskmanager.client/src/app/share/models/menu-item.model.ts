export interface MenuItemModel {
  lable: string;
  icon?: string;
  path: string;
  children?: MenuItemModel[];
}
