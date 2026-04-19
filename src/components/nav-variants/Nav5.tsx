import { Menu, MenuItem, MenuContainer } from "@/components/ui/fluid-menu";
export default function Nav5() {
  return (
    <div className="w-full h-full flex items-center justify-center pb-[200px]">
      <MenuContainer>
        <Menu trigger={<span>Menu</span>}>
          <MenuItem>Food</MenuItem>
          <MenuItem>Routines</MenuItem>
        </Menu>
      </MenuContainer>
    </div>
  );
}
